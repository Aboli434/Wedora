"use client";

import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface ChecklistFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  priorityFilter: string;
  onPriorityChange: (priority: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function ChecklistFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
}: ChecklistFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#F3EFEA] border border-[#161514]/15">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-[#5A5650] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/60 text-xs font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
        />
      </div>

      {/* Filter & Sort Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
          <label htmlFor="filter-status" className="sr-only">
            Filter by status
          </label>
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <label htmlFor="filter-priority" className="sr-only">
            Filter by priority
          </label>
          <select
            id="filter-priority"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Priority: All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
          <label htmlFor="sort-tasks" className="sr-only">
            Sort tasks
          </label>
          <select
            id="sort-tasks"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="recentlyAdded">Sort: Recently Added</option>
          </select>
        </div>
      </div>
    </div>
  );
}
