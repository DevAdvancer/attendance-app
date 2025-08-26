# 📚 Attendance App

A modern, feature-rich attendance management system built with Next.js, Supabase, and Tailwind CSS. Track student attendance, manage subjects, generate reports, and export data with ease.

## ✨ Features

### 🎯 Core Functionality

- **Student Management**: Add, edit, and manage student information
- **Subject Management**: Create and organize subjects/courses
- **Attendance Tracking**: Mark daily attendance with an intuitive interface
- **Calendar View**: Visual attendance calendar for easy tracking
- **History Tracking**: Comprehensive attendance history for each student

### 📊 Reporting & Analytics

- **Attendance Reports**: Detailed reports by subject, date range, and student
- **Visual Charts**: Interactive charts showing attendance patterns
- **Excel Export**: Export attendance data to Excel format
- **Student Tracking**: Monitor individual student attendance trends

### 🔐 Authentication & Security

- **User Authentication**: Secure login and signup system
- **Role-based Access**: Different access levels for administrators and teachers
- **Profile Management**: User profile editing and password changes

### 🎨 User Experience

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Mobile Friendly**: Optimized for all device sizes
- **Dark/Light Mode**: Toggle between themes
- **Real-time Updates**: Instant feedback and notifications

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI Components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Custom chart components
- **Icons**: Lucide React, Iconify
- **Code Quality**: Biome for linting and formatting

## 📁 Project Structure

```
attendance-app/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard and features
│   ├── features/          # Feature-specific pages
│   └── support/           # Help and support pages
├── components/            # Reusable UI components
│   ├── attendance/        # Attendance-related components
│   ├── auth/             # Authentication components
│   ├── students/         # Student management components
│   ├── subjects/         # Subject management components
│   └── ui/               # Base UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions and configurations
└── public/                # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd attendance-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**

   - Set up your Supabase project
   - Run the necessary database migrations
   - Configure Row Level Security (RLS) policies

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### For Administrators

1. **Dashboard Overview**

   - Access the main dashboard to view system statistics
   - Monitor overall attendance trends
   - Quick access to all features

2. **Student Management**

   - Add new students with detailed information
   - Import students in bulk using Excel files
   - Edit student details and track attendance history

3. **Subject Management**

   - Create and organize subjects/courses
   - Assign students to subjects
   - Manage subject-specific attendance

4. **Reports & Analytics**
   - Generate comprehensive attendance reports
   - Export data to Excel format
   - Analyze attendance patterns and trends

### For Teachers

1. **Attendance Marking**

   - Mark daily attendance for assigned subjects
   - Use the intuitive marking interface
   - View attendance history and patterns

2. **Student Tracking**
   - Monitor individual student attendance
   - Identify attendance patterns and issues
   - Generate student-specific reports

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Manual Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

### Code Quality

- **Linting**: Biome for fast and reliable linting
- **Formatting**: Automatic code formatting with Biome
- **TypeScript**: Full type safety throughout the application

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices
- Touch interfaces

## 🔒 Security Features

- **Row Level Security (RLS)** in Supabase
- **JWT-based authentication**
- **Secure API endpoints**
- **Input validation** with Zod schemas
- **XSS protection**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/support/documentation` page
- **Help Center**: Visit `/support/help-center` for FAQs
- **Contact Us**: Reach out via `/support/contact-us`
- **Issues**: Report bugs and feature requests on GitHub

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/) and [Iconify](https://iconify.design/)

---

**Made with ❤️ for better education management**
