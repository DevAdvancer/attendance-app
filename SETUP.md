# AttendanceTracker Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## Installation

1. **Clone and install dependencies** (already done):

   ```bash
   npm install
   ```

2. **Set up Supabase**:

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create a `.env.local` file in the root directory:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Database Setup**:
   The database schema has already been created using migrations. The following tables and policies have been set up:

   - `teachers` - Teacher profiles
   - `subjects` - Subject management
   - `students` - Student records per subject
   - `attendance` - Attendance tracking
   - RLS (Row Level Security) policies for data isolation

4. **Enable Authentication**:
   - In your Supabase dashboard, go to Authentication > Settings
   - Enable email authentication
   - Configure any additional providers if needed

## Running the Application

1. **Development mode**:

   ```bash
   npm run dev
   ```

2. **Production build**:
   ```bash
   npm run build
   npm start
   ```

## Features

### ✅ Authentication System

- Teacher signup and login
- Secure session management
- Profile management

### ✅ Subject Management

- Create and manage subjects
- Subject details (name, code, academic year, semester)
- Subject deletion with cascade

### ✅ Student Management

- Add students to subjects
- Import students via CSV
- Edit student information
- Student deletion

### ✅ Attendance Tracking

- Mark attendance for specific dates
- Visual attendance marking interface
- Real-time statistics
- Date-wise attendance records

### ✅ Reporting System

- Comprehensive attendance reports
- Excel export functionality
- Visual charts and statistics
- Attendance percentage tracking

### ✅ Individual Student Tracking

- Student attendance history
- Calendar view of attendance
- Detailed attendance records
- Date range filtering

## File Structure

```
attendance-app/
├── app/
│   ├── dashboard/
│   │   ├── subjects/[id]/
│   │   │   ├── students/
│   │   │   ├── attendance/
│   │   │   └── reports/
│   │   └── students/[id]/history/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── subjects/
│   ├── students/
│   ├── attendance/
│   ├── reports/
│   └── ui/
├── contexts/
│   └── auth-context.tsx
├── lib/
│   ├── supabase.ts
│   ├── excel-export.ts
│   └── utils.ts
└── public/
    └── logo.png
```

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI
- **Icons**: Iconify (Lucide icons)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Excel Export**: xlsx library

## Security Features

- Row Level Security (RLS) policies
- Authenticated routes
- Data isolation per teacher
- Secure API endpoints
- Input validation and sanitization

## Usage

1. **First Time Setup**:

   - Sign up as a teacher
   - Create your first subject
   - Add students to the subject

2. **Daily Usage**:

   - Navigate to a subject
   - Click "Attendance" to mark attendance
   - Select the date and mark students as present/absent

3. **Reports**:
   - Go to subject reports to view analytics
   - Export detailed reports to Excel
   - View individual student history

## Support

For issues or questions, please refer to the codebase documentation or create an issue in the repository.
