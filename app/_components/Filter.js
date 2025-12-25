'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React from 'react';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get('capacity') ?? 'all';

  const handleFilter = (filter) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('capacity', filter);
    const newPathname = `${pathname}?${newSearchParams.toString()}`;
    router.replace(newPathname);
  };

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Show all
      </FilterButton>

      <FilterButton
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Small (1&mdash;4 guests)
      </FilterButton>

      <FilterButton
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Medium (4&mdash;6 guests)
      </FilterButton>

      <FilterButton
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Large (7&mdash;10 guests)
      </FilterButton>
    </div>
  );
}

function FilterButton({filter, activeFilter, handleFilter, children}) {
  return (
    <button
      className={`py-2 px-5 hover:bg-primary-700 ${
        activeFilter === filter && 'bg-primary-700 text-primary-100'
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
