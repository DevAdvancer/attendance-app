"use client";

import { Icon } from "@iconify/react";

export function FeaturesSection() {
  const features = [
    {
      icon: "lucide:users",
      title: "Student Management",
      description:
        "Easily manage student lists with comprehensive profiles including registration numbers, roll numbers, and course details.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: "lucide:calendar-check",
      title: "Smart Attendance",
      description:
        "Mark attendance with intuitive interface. View by roll number or course with real-time statistics and instant updates.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: "lucide:bar-chart-3",
      title: "Detailed Reports",
      description:
        "Generate comprehensive attendance reports with visual charts and export detailed analysis to Excel format.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: "lucide:upload",
      title: "Bulk Import",
      description:
        "Import student data from Excel or CSV files. Support for bulk operations with validation and error handling.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: "lucide:shield-check",
      title: "Secure & Private",
      description:
        "Built with security in mind. Row-level security ensures teachers can only access their own subjects and data.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: "lucide:smartphone",
      title: "Mobile Friendly",
      description:
        "Responsive design works perfectly on all devices. Mark attendance on-the-go with mobile-optimized interface.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powerful Features for Modern Educators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage attendance efficiently, from student
            enrollment to detailed analytics and reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div
                className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon
                  icon={feature.icon}
                  className={`h-6 w-6 ${feature.color}`}
                />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Attendance Management?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of educators who have streamlined their attendance
              tracking with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth" className="inline-block">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
                  Start Free Trial
                </button>
              </a>
              <button className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors cursor-pointer">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
