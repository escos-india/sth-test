'use client';

import { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { allUsers, User } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded-md w-full mb-4"></div>
    <div className="h-8 bg-gray-200 rounded-md w-full mb-4"></div>
    <div className="h-8 bg-gray-200 rounded-md w-full mb-4"></div>
  </div>
);

export function UserManagementTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(allUsers);
      setLoading(false);
    }, 1500);
  }, []);

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handlePlanChange = (userId: string, newPlan: User['plan']) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, plan: newPlan } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns: TableColumn<User>[] = [
    {
      name: 'User',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <img src={row.avatarUrl} alt={row.name} className="w-8 h-8 rounded-full" />
          <div>
            <div>{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : row.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Plan',
      selector: (row) => row.plan,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {row.status === 'Pending' && (
            <Button size="sm" onClick={() => handleStatusChange(row.id, 'Active')}>
              Approve
            </Button>
          )}
          {row.status !== 'Banned' ? (
            <Button size="sm" variant="destructive" onClick={() => handleStatusChange(row.id, 'Banned')}>
              Ban
            </Button>
          ) : (
            <Button size="sm" onClick={() => handleStatusChange(row.id, 'Active')}>
              Unban
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Input
          placeholder="Filter by name or email"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        progressPending={loading}
        progressComponent={<SkeletonLoader />}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
