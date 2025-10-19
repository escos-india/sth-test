'use client';

import { KPICard } from '@/components/dashboard/kpi-card';

export function DashboardOverviewTab() {
  const kpiData = [
    {
      title: 'New Users (Last 7 Days)',
      value: '1,234',
      trend: [50, 60, 70, 65, 80, 85, 90],
    },
    {
      title: 'Pending Approvals',
      value: '12',
      trend: [5, 6, 7, 6, 8, 8, 9].reverse(),
    },
    {
      title: 'Total Active Subscriptions',
      value: '5,678',
      trend: [500, 600, 700, 650, 800, 850, 900],
    },
    {
      title: 'Revenue This Month',
      value: '$12,345',
      trend: [1000, 1200, 1500, 1300, 1800, 2000, 2200],
    },
  ];

  const recentActivity = [
    { id: 1, description: 'User John Doe just signed up for the Platinum plan.', time: '10 minutes ago' },
    { id: 2, description: 'New post created: The Future of AI.', time: '1 hour ago' },
    { id: 3, description: 'User Jane Smith has been approved.', time: '3 hours ago' },
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            {recentActivity.map(activity => (
              <li key={activity.id} className="border-b last:border-b-0 py-2">
                <p>{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
