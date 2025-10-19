'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ReactElement } from 'react';

// Mock Data
const userGrowthData = [
  { name: 'Jan', users: 400, premium: 240 },
  { name: 'Feb', users: 300, premium: 139 },
  { name: 'Mar', users: 200, premium: 980 },
  { name: 'Apr', users: 278, premium: 390 },
  { name: 'May', users: 189, premium: 480 },
  { name: 'Jun', users: 239, premium: 380 },
  { name: 'Jul', users: 349, premium: 430 },
];

const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
    { name: 'Jul', revenue: 7000 },
];

const listingStatusData = [
  { name: 'Active', value: 400 },
  { name: 'Pending', value: 150 },
  { name: 'Expired', value: 50 },
];

const userDemographicsData = [
    { name: '18-24', value: 25 },
    { name: '25-34', value: 45 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartCard = ({ title, children }: { title: string, children: ReactElement }) => (
    <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);

export default function Analytics() {
  return (
    <div className="p-6 bg-transparent rounded-lg">
        <h2 className="text-2xl font-bold text-foreground mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="User Growth">
                <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="premium" stroke="#82ca9d" />
                </LineChart>
            </ChartCard>
            <ChartCard title="Revenue Growth">
                <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            </ChartCard>
            <ChartCard title="Listing Status">
                <PieChart>
                    <Pie data={listingStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {listingStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ChartCard>
            <ChartCard title="User Demographics">
                <PieChart>
                    <Pie data={userDemographicsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} label>
                         {userDemographicsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ChartCard>
        </div>
    </div>
  );
}