
import React from 'react';
import { SearchX } from 'lucide-react';

export const NoResults = ({ message = "No results found matching your criteria." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground bg-muted/20 rounded-lg">
      <SearchX className="w-12 h-12 mb-4 text-primary" />
      <h3 className="text-xl font-semibold">No Results Found</h3>
      <p>{message}</p>
    </div>
  );
};
