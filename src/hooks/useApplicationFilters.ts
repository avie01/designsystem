import { useState, useMemo } from 'react';

export interface ApplicationFilters {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
}

export function useApplicationFilters<T extends Record<string, any>>(
  applications: T[],
  filterFn: (app: T, filters: ApplicationFilters) => boolean
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filters = useMemo(() => ({
    searchQuery,
    statusFilter,
    typeFilter
  }), [searchQuery, statusFilter, typeFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => filterFn(app, filters));
  }, [applications, filters, filterFn]);

  return {
    filteredApplications,
    filters: {
      searchQuery,
      statusFilter,
      typeFilter
    },
    setSearchQuery,
    setStatusFilter,
    setTypeFilter,
    resetFilters: () => {
      setSearchQuery('');
      setStatusFilter('all');
      setTypeFilter('all');
    }
  };
}