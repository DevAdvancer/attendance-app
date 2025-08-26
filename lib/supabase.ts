import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Direct Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-application-name': 'attendance-tracker'
    }
  }
})

// Keep the same client for backward compatibility
export const supabaseClient = supabase

// Database types
export type Teacher = {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export type Subject = {
  id: string
  teacher_id: string
  name: string
  code: string
  description?: string
  academic_year: string
  semester: string
  created_at: string
  updated_at: string
}

export type Student = {
  id: string
  subject_id: string
  name: string
  reg_number: string
  roll_number: string
  course: string
  created_at: string
  updated_at: string
}

export type Attendance = {
  id: string
  student_id: string
  subject_id: string
  date: string
  status: 'present' | 'absent'
  marked_at: string
  marked_by: string
  notes?: string
}

export type AttendanceAnalytics = {
  student_id: string
  student_name: string
  reg_number: string
  roll_number: string
  course: string
  subject_id: string
  subject_name: string
  subject_code: string
  total_classes: number
  present_count: number
  absent_count: number
  attendance_percentage: number
}
