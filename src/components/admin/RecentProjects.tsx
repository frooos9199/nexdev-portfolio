'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RecentProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('projects');
      if (saved) {
        const allProjects = JSON.parse(saved);
        // أحدث 5 مشاريع
        setProjects(allProjects.slice(0, 5));
      }
    }
  }, []);

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">المشاريع الأخيرة</h3>
          <Link href="/admin/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            عرض الكل ←
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500">
          لا توجد مشاريع بعد
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">المشاريع الأخيرة</h3>
        <Link href="/admin/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          عرض الكل ←
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المشروع</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">العميل</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الحالة</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التقدم</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الموعد النهائي</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">السعر</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <p className="font-medium text-gray-800">{project.name}</p>
                </td>
                <td className="py-4 px-4 text-gray-600">{project.client}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">{project.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">{project.deadline}</td>
                <td className="py-4 px-4 font-medium text-gray-800">{project.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
