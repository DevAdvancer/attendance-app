"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, type Teacher } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  teacher: Teacher | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Don't run on server side

    let componentMounted = true;

    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (componentMounted) {
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    // Get initial session with better error handling
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!componentMounted) return;

        if (error) {
          setLoading(false);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await fetchTeacherProfile(session.user.id);
        }

        if (componentMounted) {
          setLoading(false);
        }
      } catch (error) {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!componentMounted) return;

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchTeacherProfile(session.user.id);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setTeacher(null);
      }

      if (componentMounted) {
        setLoading(false);
      }
    });

    return () => {
      componentMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [mounted]);

  const fetchTeacherProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        return;
      }

      if (data) {
        setTeacher(data);
      }
    } catch (error) {
      // Silent fail for teacher profile fetch
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create teacher profile
      const teacherData = {
        id: data.user.id,
        email: data.user.email!,
        name,
      };

      const { error: profileError } = await supabase
        .from("teachers")
        .insert(teacherData);

      if (profileError) {
        throw profileError;
      }

      // Set the teacher data immediately after creation
      setTeacher({
        id: data.user.id,
        email: data.user.email!,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    teacher,
    loading,
    signIn,
    signUp,
    signOut,
  };

  // Prevent hydration mismatch by not rendering children until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
