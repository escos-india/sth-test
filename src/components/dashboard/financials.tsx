'use client';

import { useState, useMemo, useEffect } from 'react';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

// Mock Data for Transactions
const transactions = [
  { id: 1, user: 'Saraswati Doe', type: 'Subscription', amount: 99.99, status: 'Completed', date: '2023-01-15' },
  { id: 2, user: 'Lakshmi Smith', type: 'Listing Fee', amount: 19.99, status: 'Completed', date: '2023-02-20' },
  { id: 3, user: 'Parvati Johnson', type: 'Subscription', amount: 99.99, status: 'Completed', date: '2023-03-10' },
  { id: 4, user: 'Ganesha Brown', type: 'Withdrawal', amount: -200.00, status: 'Pending', date: '2023-04-05' },
  { id: 5, user: 'Shiva Williams', type: 'Listing Fee', amount: 19.99, status: 'Completed', date: '2023-05-21' },
  { id: 6, user: 'Vishnu Jones', type: 'Subscription', amount: 99.99, status: 'Failed', date: '2023-06-11' },
  { id: 7, user: 'Brahma Garcia', type: 'Withdrawal', amount: -50.00, status: 'Completed', date: '2023-07-19' },
  { id: 8, user: 'Durga Miller', type: 'Listing Fee', amount: 19.99, status: 'Completed', date: '2023-08-30' },
  { id: 9, user: 'Kali Davis', type: 'Subscription', amount: 99.99, status: 'Completed', date: '2023-09-01' },
  { id: 10, user: 'Krishna Rodriguez', type: 'Withdrawal', amount: -100.00, status: 'Pending', date: '2023-10-12' },
];

// Skeleton Loader Component
const SkeletonRow = () => (
    <div className="flex items-center space-x-4 p-4 bg-background/50 animate-pulse">
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
    </div>
);

export default function Financials() {
  const [filters, setFilters] = useState({ user: '', type: '', status: '' });
  const [isLoading, setIsLoading] = useState(true); // Simulate loading
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof transactions[0]; direction: string }>({ key: 'date', direction: 'descending' });

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableTransactions.filter(transaction =>
      (filters.user ? transaction.user.toLowerCase().includes(filters.user.toLowerCase()) : true) &&
      (filters.type ? transaction.type === filters.type : true) &&
      (filters.status ? transaction.status === filters.status : true)
    );
  }, [transactions, filters, sortConfig]);

  const requestSort = (key: keyof typeof transactions[0]) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters(prev => ({...prev, [name]: value}));
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
      { name: 'User', key: 'user' },
      { name: 'Type', key: 'type' },
      { name: 'Amount', key: 'amount' },
      { name: 'Status', key: 'status' },
      { name: 'Date', key: 'date' },
  ];

  return (
    <div className="p-6 bg-transparent rounded-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-2 md:space-y-0">
        <h2 className="text-2xl font-bold text-foreground">Financials</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              name="user"
              placeholder="Filter by user..."
              value={filters.user}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select name="type" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Types</option>
                {[...new Set(transactions.map(t => t.type))].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
             <select name="status" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Statuses</option>
                {[...new Set(transactions.map(t => t.status))].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>
      <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
          <div className="hidden md:flex bg-background/20 p-4 font-semibold text-foreground border-b border-border">
              {columns.map((col) => (
                  <div key={col.key} className={`flex-1 cursor-pointer`} onClick={() => requestSort(col.key as keyof typeof transactions[0])}>
                      {col.name} <ArrowUpDown className="inline-block ml-1 h-4 w-4" />
                  </div>
              ))}
              <div className="w-12"></div>
          </div>
          {isLoading ? (
              <div>
                  {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
              </div>
          ) : (
              <div className="divide-y divide-border">
                  {filteredTransactions.map(transaction => (
                      <div key={transaction.id} className="flex flex-col md:flex-row items-start md:items-center p-4 space-y-2 md:space-y-0">
                          <div className="flex-1 font-medium text-foreground">{transaction.user}</div>
                          <div className="flex-1 text-muted-foreground">{transaction.type}</div>
                          <div className={`flex-1 font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount.toFixed(2)}</div>
                          <div className="flex-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </div>
                          <div className="flex-1 text-muted-foreground">{transaction.date}</div>
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