/**
 * Simple in-memory cache with TTL for Supabase data
 * Reduces database load and improves performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class DataCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clear cache entries for a specific user (useful for logout)
  clearUserData(userId: string): void {
    const userKeys = Array.from(this.cache.keys()).filter(key =>
      key.includes(userId)
    );
    userKeys.forEach(key => this.cache.delete(key));
  }

  // Create cache key for user-specific data
  createUserKey(userId: string, resource: string, params?: Record<string, any>): string {
    const paramString = params ? `-${JSON.stringify(params)}` : '';
    return `user:${userId}:${resource}${paramString}`;
  }
}

export const dataCache = new DataCache();

// Cache utilities for common patterns
export const cacheUtils = {
  // Cache subjects for a teacher
  getSubjectsKey: (teacherId: string) => `subjects:${teacherId}`,

  // Cache students for a subject
  getStudentsKey: (subjectId: string) => `students:${subjectId}`,

  // Cache attendance for a subject and date
  getAttendanceKey: (subjectId: string, date: string) => `attendance:${subjectId}:${date}`,

  // Cache teacher profile
  getTeacherKey: (userId: string) => `teacher:${userId}`,

  // Cache attendance reports
  getReportsKey: (subjectId: string, dateRange: string) => `reports:${subjectId}:${dateRange}`,

  // Cache student history
  getStudentHistoryKey: (studentId: string, dateRange: string) => `history:${studentId}:${dateRange}`,
};

// TTL constants for different data types
export const TTL = {
  TEACHER_PROFILE: 30 * 60 * 1000, // 30 minutes
  SUBJECTS: 10 * 60 * 1000, // 10 minutes
  STUDENTS: 15 * 60 * 1000, // 15 minutes
  ATTENDANCE: 2 * 60 * 1000, // 2 minutes (frequently updated)
  REPORTS: 5 * 60 * 1000, // 5 minutes
  STUDENT_HISTORY: 10 * 60 * 1000, // 10 minutes
};
