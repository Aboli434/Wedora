"use client";

import React, { useState } from "react";
import { MOCK_CHECKLIST_TASKS, ChecklistTask } from "@/data/checklist";
import {
  calculateChecklistProgress,
  filterTasks,
  getDueSoonTasks,
  getOverdueTasks,
  sortTasks,
} from "@/lib/checklist";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  ChecklistPageHeader,
  ChecklistOverview,
  NeedsAttention,
  ChecklistCategoryNav,
  ChecklistFilters,
  ChecklistTaskList,
  AddTaskForm,
} from "@/components/dashboard/checklist";

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<ChecklistTask[]>(MOCK_CHECKLIST_TASKS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dynamic calculations via pure functions
  const stats = calculateChecklistProgress(tasks);
  const overdueTasks = getOverdueTasks(tasks);
  const dueSoonTasks = getDueSoonTasks(tasks);

  const filteredTasks = sortTasks(
    filterTasks(
      tasks,
      selectedCategory,
      statusFilter,
      priorityFilter,
      searchQuery
    ),
    sortBy
  );

  // Interaction Handlers
  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: ChecklistTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSearchQuery("");
    setSortBy("dueDate");
  };

  return (
    <DashboardShell>
      {/* 1. Header */}
      <ChecklistPageHeader
        completedCount={stats.completedCount}
        totalCount={stats.totalCount}
      />

      {/* 2. Visual Progress Overview */}
      <ChecklistOverview stats={stats} />

      {/* 3. Needs Attention Summary */}
      <NeedsAttention
        overdueTasks={overdueTasks}
        dueSoonTasks={dueSoonTasks}
      />

      {/* 4. Category Navigation Tabs */}
      <ChecklistCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        tasks={tasks}
      />

      {/* 5. Filter & Search Controls */}
      <ChecklistFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* 6. Filtered Task List & Items */}
      <ChecklistTaskList
        tasks={filteredTasks}
        totalTasks={tasks.length}
        onToggleComplete={handleToggleComplete}
        onClearFilters={handleClearFilters}
        onAddTask={() => setIsAddModalOpen(true)}
      />

      {/* 7. Add Custom Task Trigger */}
      <div className="flex justify-end pt-2">
        <AddTaskForm
          onAddTask={handleAddTask}
          isOpen={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
        />
      </div>
    </DashboardShell>
  );
}
