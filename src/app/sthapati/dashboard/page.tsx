'use client';

import { useState, FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import UserManagement from '@/components/dashboard/user-management';

const CommunityPostSection = dynamic(
  () => import('@/components/dashboard/community-post-section').then(mod => mod.CommunityPostSection),
  { 
    ssr: false,
    loading: () => <p>Loading editor...</p> 
  }
);

// Mock Data - replace with actual data from your API
const kpiData = {
  newUsers: 150,
  pendingUserApprovals: 25,
  totalUsers: 1250,
};

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'upgraded to Premium', timestamp: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'posted a new listing: \'Modern Apartment\'', timestamp: '5 hours ago' },
  { id: 3, user: 'Admin', action: 'approved 3 new users', timestamp: 'yesterday' },
  { id: 4, user: 'Mike Johnson', action: 'sent a message to support', timestamp: 'yesterday' },
];

const userChartData = [
  { name: 'Day 1', value: 20 },
  { name: 'Day 2', value: 45 },
  { name: 'Day 3', value: 30 },
  { name: 'Day 4', value: 50 },
  { name: 'Day 5', value: 40 },
  { name: 'Day 6', value: 60 },
  { name: 'Day 7', value: 55 },
];

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard', 'User Management', 'Community Posts'];
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: number;
  children: ReactNode;
  icon: React.ElementType;
}

const KPICard: FC<KPICardProps> = ({ title, value, children, icon: Icon }) => (
  <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start">
        <div>
            <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Icon className="h-6 w-6" />
        </div>
    </div>
    <div className="h-20 mt-4">
      {children}
    </div>
  </div>
);


const Dashboard = () => (
  <>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <KPICard title="New Users (Last 7 Days)" value={kpiData.newUsers} icon={Users}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userChartData}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </KPICard>
      <KPICard title="Pending User Approvals" value={kpiData.pendingUserApprovals} icon={Users}>
         <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name: 'Pending', value: kpiData.pendingUserApprovals}]}>
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </KPICard>
       <KPICard title="Total Users" value={kpiData.totalUsers} icon={Users}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name: 'Total', value: kpiData.totalUsers}]}>
            <Bar dataKey="value" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </KPICard>
    </div>
    <div className="mt-8">
      <h3 className="text-lg font-medium text-foreground mb-4">Recent Activity</h3>
      <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border">
        <ul className="divide-y divide-border">
          {recentActivity.map(activity => (
            <li key={activity.id} className="p-4 flex items-center justify-between">
              <div>
                <span className="font-semibold text-foreground">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action}</span>
              </div>
              <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default function SthapatiDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        <div className={activeTab === 'Dashboard' ? '' : 'hidden'}>
          <Dashboard />
        </div>
        <div className={activeTab === 'User Management' ? '' : 'hidden'}>
          <UserManagement />
        </div>
        <div className={activeTab === 'Community Posts' ? '' : 'hidden'}>
          <CommunityPostSection />
        </div>
      </div>
    </div>
  );
}
