'use client';

import { useState, useMemo, useEffect } from 'react';
import { Profile } from '@/app/lib/data';

type FilterValue = string[] | string | boolean;
export type Filters = Record<string, FilterValue>;

export const useProfiles = (
    initialProfiles: Profile[],
    initialFilters: Filters,
    searchKeys: (keyof Profile)[]
) => {
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [sortBy, setSortBy] = useState('activity');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setProfiles(initialProfiles);
            setLoading(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, [initialProfiles]);

    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => {
            const existing = prev[type] as string[];
            const newValues = existing.includes(value)
                ? existing.filter(item => item !== value)
                : [...existing, value];
            return { ...prev, [type]: newValues };
        });
    };
    
    const handleSwitchChange = (type: string, checked: boolean) => {
        setFilters(prev => ({ ...prev, [type]: checked }));
    };

    const handleInputChange = (type: string, value: string) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const clearFilters = () => {
        setFilters(initialFilters);
        setSearchTerm('');
    };

    const filteredAndSortedProfiles = useMemo(() => {
        let filtered = profiles;

        if (searchTerm) {
            filtered = filtered.filter(profile =>
                searchKeys.some(key => {
                    const value = profile[key];
                    return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
        }

        filtered = filtered.filter(profile => {
            return Object.entries(filters).every(([key, value]) => {
                const profileValue = profile[key as keyof Profile];

                if (Array.isArray(value) && value.length > 0) {
                    return profileValue ? value.includes(profileValue as string) : false;
                }
                if (typeof value === 'boolean') {
                    return !value || profileValue === value;
                }
                if (typeof value === 'string' && value !== '') {
                    return profileValue ? (profileValue as string).toLowerCase().includes(value.toLowerCase()) : false;
                }
                return true;
            });
        });

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'followers':
                    return (b.followers ?? 0) - (a.followers ?? 0);
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'activity':
                default:
                    return (b.activity ?? 0) - (a.activity ?? 0);
            }
        });
    }, [profiles, searchTerm, filters, sortBy, searchKeys]);

    return {
        loading,
        searchTerm,
        setSearchTerm,
        filters,
        sortBy,
        setSortBy,
        handleFilterChange,
        handleSwitchChange,
        handleInputChange,
        clearFilters,
        filteredAndSortedProfiles,
        totalProfiles: initialProfiles.length,
    };
};