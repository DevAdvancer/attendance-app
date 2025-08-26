"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase, handleAuthError, type Teacher } from "@/lib/supabase";
import { dataCache, cacheUtils, TTL } from "@/lib/data-cache";

interface AuthContextType {
  user: User | null;
  teacher: Teacher | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshTeacherProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Handle hydration
  useEffect(() => {
    console.log("AuthProvider: Setting mounted to true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Don't run on server side

    let componentMounted = true;

    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (componentMounted) {
        console.log(
          "AuthProvider: Safety timeout reached, setting loading to false"
        );
        setLoading(false);
        setInitialized(true);
      }
    }, 2000); // 2 second timeout

    // Additional fallback timeout for initialization
    const initTimeoutId = setTimeout(() => {
      if (componentMounted) {
        console.log(
          "AuthProvider: Init timeout reached, forcing initialization"
        );
        setLoading(false);
        setInitialized(true);
      }
    }, 5000); // 5 second timeout

    // Get initial session with better error handling
    const getInitialSession = async () => {
      try {
        console.log("AuthProvider: Getting initial session...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!componentMounted) return;

        if (error) {
          console.warn("Session fetch error:", error);
          // Handle auth errors gracefully
          handleAuthError(error);
          setLoading(false);
          setInitialized(true);
          return;
        }

        if (session?.user) {
          console.log("AuthProvider: Found user session:", session.user.email);
          setUser(session.user);
          await fetchTeacherProfile(session.user.id);
        } else {
          console.log("AuthProvider: No user session found");
        }

        if (componentMounted) {
          setLoading(false);
          setInitialized(true);
          console.log("AuthProvider: Initialization complete");
        }
      } catch (error) {
        console.warn("Session fetch exception:", error);
        if (componentMounted) {
          setLoading(false);
          setInitialized(true);
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
      } else if (event === "USER_UPDATED") {
        // Handle user updates
        if (session?.user) {
          setUser(session.user);
        }
      }

      if (componentMounted) {
        setLoading(false);
        if (!initialized) {
          setInitialized(true);
        }
      }
    });

    return () => {
      componentMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(initTimeoutId);
      subscription.unsubscribe();
    };
  }, [mounted]);

  const fetchTeacherProfile = useCallback(async (userId: string) => {
    try {
      // Check cache first
      const cacheKey = cacheUtils.getTeacherKey(userId);
      const cached = dataCache.get<Teacher>(cacheKey);

      if (cached) {
        setTeacher(cached);
        return;
      }

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
        // Cache teacher profile for longer duration
        dataCache.set(cacheKey, data, TTL.TEACHER_PROFILE);
      }
    } catch (error) {
      // Silent fail for teacher profile fetch
      console.warn("Failed to fetch teacher profile:", error);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      handleAuthError(error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      handleAuthError(error);
      throw error;
    }

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

    // Clear all cached data on sign out
    dataCache.clear();
  };

  const refreshTeacherProfile = useCallback(async () => {
    if (user?.id) {
      // Force refresh by clearing cache first
      const cacheKey = cacheUtils.getTeacherKey(user.id);
      dataCache.delete(cacheKey);
      await fetchTeacherProfile(user.id);
    }
  }, [user?.id, fetchTeacherProfile]);

  // Memoize auth state to prevent unnecessary re-renders
  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(
    () => ({
      user,
      teacher,
      loading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      refreshTeacherProfile,
    }),
    [user, teacher, loading, isAuthenticated, refreshTeacherProfile]
  );

  // Prevent hydration mismatch by not rendering children until mounted and initialized
  if (!mounted) {
    console.log("AuthProvider: Not mounted yet, showing loading");
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Initializing...</p>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  // Only show loading for auth operations, not for general initialization
  if (loading && !initialized && mounted) {
    console.log("AuthProvider: Still initializing auth, showing loading");
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

  console.log("AuthProvider: Rendering children");

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
