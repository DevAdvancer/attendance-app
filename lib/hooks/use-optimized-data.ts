import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { dataCache, cacheUtils, TTL } from '@/lib/data-cache';
import type { Subject, Student, Attendance, Teacher, AttendanceAnalytics } from '@/lib/supabase';

interface UseDataOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  cacheTime?: number;
}

interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Generic hook for cached data fetching
function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseDataOptions = {}
): DataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, cacheTime = TTL.SUBJECTS } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      setError(null);

      // Check cache first
      const cached = dataCache.get<T>(key);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await fetcher();

      // Cache the result
      dataCache.set(key, result, cacheTime);
      setData(result);
    } catch (err) {
      setError(err as Error);
      console.error(`Error fetching data for key ${key}:`, err);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, enabled, cacheTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for fetching teacher's subjects
export function useSubjects(teacherId: string | undefined, options?: UseDataOptions) {
  const key = teacherId ? cacheUtils.getSubjectsKey(teacherId) : '';

  const fetcher = useCallback(async (): Promise<Subject[]> => {
    if (!teacherId) return [];

    const { data, error } = await supabase
      .from('subjects')
      .select('id, teacher_id, name, code, description, academic_year, semester, created_at, updated_at')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false })
      .limit(50); // Reasonable limit

    if (error) throw error;
    return data || [];
  }, [teacherId]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.SUBJECTS });
}

// Hook for fetching students in a subject
export function useStudents(subjectId: string | undefined, options?: UseDataOptions) {
  const key = subjectId ? cacheUtils.getStudentsKey(subjectId) : '';

  const fetcher = useCallback(async (): Promise<Student[]> => {
    if (!subjectId) return [];

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('subject_id', subjectId)
      .order('roll_number', { ascending: true });

    if (error) throw error;
    return data || [];
  }, [subjectId]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.STUDENTS });
}

// Hook for fetching attendance data
export function useAttendance(subjectId: string | undefined, date: string, options?: UseDataOptions) {
  const key = subjectId && date ? cacheUtils.getAttendanceKey(subjectId, date) : '';

  const fetcher = useCallback(async (): Promise<Attendance[]> => {
    if (!subjectId || !date) return [];

    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('subject_id', subjectId)
      .eq('date', date);

    if (error) throw error;
    return data || [];
  }, [subjectId, date]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.ATTENDANCE });
}

// Hook for fetching teacher profile with caching
export function useTeacherProfile(userId: string | undefined, options?: UseDataOptions) {
  const key = userId ? cacheUtils.getTeacherKey(userId) : '';

  const fetcher = useCallback(async (): Promise<Teacher | null> => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || null;
  }, [userId]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.TEACHER_PROFILE });
}

// Hook for fetching subject and students together (optimized with single query)
export function useSubjectWithStudents(subjectId: string | undefined, options?: UseDataOptions) {
  const key = subjectId ? `subject-with-students:${subjectId}` : '';

  const fetcher = useCallback(async (): Promise<{ subject: Subject; students: Student[] }> => {
    if (!subjectId) return { subject: {} as Subject, students: [] };

    console.log("useSubjectWithStudents: Fetching data for subject:", subjectId);

    // Parallel fetch for better performance
    const [subjectResponse, studentsResponse] = await Promise.all([
      supabase
        .from('subjects')
        .select('*')
        .eq('id', subjectId)
        .single(),
      supabase
        .from('students')
        .select('*')
        .eq('subject_id', subjectId)
        .order('roll_number', { ascending: true })
    ]);

    if (subjectResponse.error) throw subjectResponse.error;
    if (studentsResponse.error) throw studentsResponse.error;

    console.log("useSubjectWithStudents: Subject data:", subjectResponse.data);
    console.log("useSubjectWithStudents: Students data:", studentsResponse.data);

    return {
      subject: subjectResponse.data,
      students: studentsResponse.data || []
    };
  }, [subjectId]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.STUDENTS });
}

// Hook for attendance reports with caching
export function useAttendanceReports(subjectId: string | undefined, dateRange: string, options?: UseDataOptions) {
  const key = subjectId && dateRange ? cacheUtils.getReportsKey(subjectId, dateRange) : '';

  const fetcher = useCallback(async (): Promise<AttendanceAnalytics[]> => {
    if (!subjectId) return [];

    // This would need to be implemented based on your specific analytics query
    // For now, returning empty array - you can implement the analytics logic here
    return [];
  }, [subjectId, dateRange]);

  return useCachedData(key, fetcher, { ...options, cacheTime: TTL.REPORTS });
}

// Utility functions for cache management
export const cacheManagement = {
  // Invalidate cache for a specific user
  invalidateUserCache: (userId: string) => {
    dataCache.clearUserData(userId);
  },

  // Invalidate specific cache entries
  invalidateSubjects: (teacherId: string) => {
    dataCache.delete(cacheUtils.getSubjectsKey(teacherId));
  },

  invalidateStudents: (subjectId: string) => {
    const key = cacheUtils.getStudentsKey(subjectId);
    console.log("CacheManagement: Invalidating students cache for key:", key);
    dataCache.delete(key);
  },

  invalidateAttendance: (subjectId: string, date: string) => {
    dataCache.delete(cacheUtils.getAttendanceKey(subjectId, date));
  },

  // Clear all cache
  clearAllCache: () => {
    dataCache.clear();
  }
};
