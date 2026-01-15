'use client';

import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string;
  icon: IconType;
  change: string;
  changeType: 'positive' | 'negative';
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType,
  color 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <p className={`text-sm mt-2 ${changeColor} font-medium`}>
            {change} من الشهر الماضي
          </p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
}
