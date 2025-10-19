'use client';

import { useState, useMemo, useEffect } from 'react';
import { MoreHorizontal, ArrowUpDown, Check, X, ShieldBan } from 'lucide-react';

// Enhanced Mock Data with more statuses
const users = [
  { id: 1, name: 'Saraswati Doe', email: 'saraswati.doe@example.com', plan: 'Premium', status: 'Active', registrationDate: '2023-01-15' },
  { id: 2, name: 'Lakshmi Smith', email: 'lakshmi.smith@example.com', plan: 'Basic', status: 'Pending', registrationDate: '2023-02-20' },
  { id: 3, name: 'Parvati Johnson', email: 'parvati.johnson@example.com', plan: 'Free', status: 'Active', registrationDate: '2023-03-10' },
  { id: 4, name: 'Ganesha Brown', email: 'ganesha.brown@example.com', plan: 'Premium', status: 'Banned', registrationDate: '2023-04-05' },
  { id: 5, name: 'Shiva Williams', email: 'shiva.williams@example.com', plan: 'Basic', status: 'Active', registrationDate: '2023-05-21' },
  { id: 6, name: 'Vishnu Jones', email: 'vishnu.jones@example.com', plan: 'Premium', status: 'Pending', registrationDate: '2023-06-11' },
  { id: 7, name: 'Brahma Garcia', email: 'brahma.garcia@example.com', plan: 'Free', status: 'Active', registrationDate: '2023-07-19' },
  { id: 8, name: 'Durga Miller', email: 'durga.miller@example.com', plan: 'Basic', status: 'Active', registrationDate: '2023-08-30' },
  { id: 9, name: 'Kali Davis', email: 'kali.davis@example.com', plan: 'Premium', status: 'Pending', registrationDate: '2023-09-01' },
  { id: 10, name: 'Krishna Rodriguez', email: 'krishna.rodriguez@example.com', plan: 'Free', status: 'Banned', registrationDate: '2023-10-12' },
];

// Skeleton Loader Component
const SkeletonRow = () => (
    <div className="flex items-center space-x-4 p-4 bg-background/50 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-3/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
    </div>
);

export default function UserManagement() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof users[0]; direction: string }>({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableUsers.filter(user =>
      (user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())) &&
      (statusFilter === 'All' || user.status === statusFilter)
    );
  }, [users, filter, statusFilter, sortConfig]);

  const requestSort = (key: keyof typeof users[0]) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status:string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const pendingUsers = users.filter(user => user.status === 'Pending');

  const columns = [
      { name: 'Name', key: 'name' },
      { name: 'Email', key: 'email' },
      { name: 'Plan', key: 'plan' },
      { name: 'Status', key: 'status' },
      { name: 'Registration Date', key: 'registrationDate' },
  ];

  return (
    <div className="p-6 bg-transparent rounded-lg">
      <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pending User Approvals</h2>
          <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
             {isLoading ? (
                  <div>{[...Array(3)].map((_, i) => <SkeletonRow key={i} />)}</div>
              ) : (
                  <div className="divide-y divide-border">
                      {pendingUsers.map(user => (
                          <div key={user.id} className="flex items-center p-4">
                              <div className="flex-1 font-medium text-foreground">{user.name}</div>
                              <div className="flex-1 text-muted-foreground">{user.email}</div>
                              <div className="flex-1 text-muted-foreground">{user.registrationDate}</div>
                              <div className="flex items-center gap-2">
                                  <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><Check size={16} /></button>
                                  <button className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"><X size={16} /></button>
                                  <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><ShieldBan size={16} /></button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">All Users</h2>
        <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)} 
                className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Banned">Banned</option>
            </select>
        </div>
      </div>
      <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
          <div className="hidden md:flex bg-background/20 p-4 font-semibold text-foreground border-b border-border">
              {columns.map((col) => (
                  <div key={col.key} className={`flex-1 cursor-pointer`} onClick={() => requestSort(col.key as keyof typeof users[0])}>
                      {col.name} <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                  </div>
              ))}
              <div className="w-12"></div>
          </div>
          {isLoading ? (
              <div>{[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}</div>
          ) : (
              <div className="divide-y divide-border">
                  {filteredUsers.map(user => (
                      <div key={user.id} className="flex flex-col md:flex-row items-start md:items-center p-4 space-y-2 md:space-y-0">
                          <div className="flex-1 font-medium text-foreground">{user.name}</div>
                          <div className="flex-1 text-muted-foreground">{user.email}</div>
                          <div className="flex-1 text-muted-foreground">{user.plan}</div>
                          <div className="flex-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                              {user.status}
                            </span>
                          </div>
                          <div className="flex-1 text-muted-foreground">{user.registrationDate}</div>
                          <div className="w-12 text-center">
                              <button className="text-muted-foreground hover:text-foreground">
                                  <MoreHorizontal />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
}