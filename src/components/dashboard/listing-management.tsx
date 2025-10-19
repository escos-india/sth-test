'use client';

import { useState, useMemo, useEffect } from 'react';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

// Mock Data for Listings
const listings = [
  { id: 1, title: 'Modern Downtown Loft', author: 'Saraswati Doe', plan: 'Premium', status: 'Active', category: 'Loft', tags: ['modern', 'downtown'] },
  { id: 2, title: 'Cozy Suburban Home', author: 'Lakshmi Smith', plan: 'Basic', status: 'Pending', category: 'House', tags: ['cozy', 'suburban'] },
  { id: 3, title: 'Luxury Beachfront Villa', author: 'Parvati Johnson', plan: 'Premium', status: 'Active', category: 'Villa', tags: ['luxury', 'beachfront'] },
  { id: 4, title: 'Rustic Country Cabin', author: 'Ganesha Brown', plan: 'Free', status: 'Expired', category: 'Cabin', tags: ['rustic', 'country'] },
  { id: 5, title: 'Chic Urban Apartment', author: 'Shiva Williams', plan: 'Basic', status: 'Active', category: 'Apartment', tags: ['chic', 'urban'] },
  { id: 6, title: 'Spacious Family House', author: 'Vishnu Jones', plan: 'Premium', status: 'Pending', category: 'House', tags: ['spacious', 'family'] },
  { id: 7, title: 'Minimalist Studio', author: 'Brahma Garcia', plan: 'Free', status: 'Active', category: 'Studio', tags: ['minimalist'] },
  { id: 8, title: 'Penthouse with a View', author: 'Durga Miller', plan: 'Premium', status: 'Active', category: 'Penthouse', tags: ['view'] },
  { id: 9, title: 'Historic Townhouse', author: 'Kali Davis', plan: 'Basic', status: 'Pending', category: 'Townhouse', tags: ['historic'] },
  { id: 10, title: 'Quaint Lakeside Cottage', author: 'Krishna Rodriguez', plan: 'Free', status: 'Expired', category: 'Cottage', tags: ['quaint', 'lakeside'] },
];

// Skeleton Loader Component
const SkeletonRow = () => (
    <div className="flex items-center space-x-4 p-4 bg-background/50 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
        <div className="h-4 bg-muted rounded w-2/12"></div>
        <div className="h-4 bg-muted rounded w-1/12"></div>
    </div>
);

export default function ListingManagement() {
  const [filters, setFilters] = useState({ title: '', category: '', status: '' });
  const [isLoading, setIsLoading] = useState(true); // Simulate loading
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof listings[0]; direction: string }>({ key: 'title', direction: 'ascending' });

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredListings = useMemo(() => {
    let sortableListings = [...listings];
    if (sortConfig !== null) {
      sortableListings.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableListings.filter(listing =>
      (filters.title ? listing.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.category ? listing.category === filters.category : true) &&
      (filters.status ? listing.status === filters.status : true)
    );
  }, [listings, filters, sortConfig]);

  const requestSort = (key: keyof typeof listings[0]) => {
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
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
      { name: 'Title', key: 'title' },
      { name: 'Author', key: 'author' },
      { name: 'Plan', key: 'plan' },
      { name: 'Status', key: 'status' },
      { name: 'Category', key: 'category' },
  ];

  return (
    <div className="p-6 bg-transparent rounded-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-2 md:space-y-0">
        <h2 className="text-2xl font-bold text-foreground">Listing Management</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              name="title"
              placeholder="Filter by title..."
              value={filters.title}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select name="category" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Categories</option>
                {[...new Set(listings.map(l => l.category))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
             <select name="status" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg bg-background/50 text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Statuses</option>
                {[...new Set(listings.map(l => l.status))].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>
      <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden">
          <div className="hidden md:flex bg-background/20 p-4 font-semibold text-foreground border-b border-border">
              {columns.map((col) => (
                  <div key={col.key} className={`flex-1 cursor-pointer`} onClick={() => requestSort(col.key as keyof typeof listings[0])}>
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
                  {filteredListings.map(listing => (
                      <div key={listing.id} className="flex flex-col md:flex-row items-start md:items-center p-4 space-y-2 md:space-y-0">
                          <div className="flex-1 font-medium text-foreground">{listing.title}</div>
                          <div className="flex-1 text-muted-foreground">{listing.author}</div>
                          <div className="flex-1 text-muted-foreground">{listing.plan}</div>
                          <div className="flex-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(listing.status)}`}>
                              {listing.status}
                            </span>
                          </div>
                          <div className="flex-1 text-muted-foreground">{listing.category}</div>
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