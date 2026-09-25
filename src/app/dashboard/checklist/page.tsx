"use client";

import React, { useState, useEffect } from "react";
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
import {
  getWeddingsApi,
  getChecklistTasksApi,
  createChecklistTaskApi,
  updateChecklistTaskApi,
} from "@/lib/api/endpoints";

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<ChecklistTask[]>(MOCK_CHECKLIST_TASKS);
  const [weddingId, setWeddingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTasks() {
      try {
        setLoading(true);
        const weddings = await getWeddingsApi();
        if (weddings && weddings.length > 0) {
          const wId = weddings[0].id;
          if (isMounted) setWeddingId(wId);

          const apiTasks = await getChecklistTasksApi(wId);
          if (Array.isArray(apiTasks) && isMounted) {
            const mapped: ChecklistTask[] = apiTasks.map((t) => ({
              id: t.id,
              title: t.title,
              description: t.notes || undefined,
              categoryId: t.category.toLowerCase(),
              dueDate: t.dueDate ? new Date(t.dueDate).toISOString().split("T")[0] : "",
              priority: (t.priority as "HIGH" | "MEDIUM" | "LOW") || "MEDIUM",
              completed: t.status === "COMPLETED",
            }));
            setTasks(mapped);
          }
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTasks();
    return () => {
      isMounted = false;
    };
  }, []);

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
  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: newCompleted } : t))
    );

    if (weddingId) {
      try {
        await updateChecklistTaskApi(weddingId, taskId, {
          status: newCompleted ? "COMPLETED" : "PENDING",
        });
      } catch {
        // Revert on error
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, completed: !newCompleted } : t))
        );
      }
    }
  };

  const handleAddTask = async (newTask: ChecklistTask) => {
    setTasks((prev) => [newTask, ...prev]);

    if (weddingId) {
      try {
        const created = await createChecklistTaskApi(weddingId, {
          title: newTask.title,
          category: newTask.categoryId,
          dueDate: newTask.dueDate || undefined,
          priority: newTask.priority,
          notes: newTask.description,
        });

        setTasks((prev) =>
          prev.map((t) => (t.id === newTask.id ? { ...t, id: created.id } : t))
        );
      } catch {
        // Retain local task fallback
      }
    }
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
      <ChecklistPageHeader
        completedCount={stats.completedCount}
        totalCount={stats.totalCount}
        onAddTaskClick={() => setIsAddModalOpen(true)}
      />

      {loading ? (
        <div className="p-8 text-center text-xs text-[#5A5650] font-sans">Loading checklist...</div>
      ) : (
        <div className="space-y-8">
          <ChecklistOverview stats={stats} />
          <NeedsAttention overdueTasks={overdueTasks} dueSoonTasks={dueSoonTasks} />
          <ChecklistCategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            tasks={tasks}
          />
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
          <ChecklistTaskList
            tasks={filteredTasks}
            totalTasks={tasks.length}
            onToggleComplete={handleToggleComplete}
            onClearFilters={handleClearFilters}
            onAddTask={() => setIsAddModalOpen(true)}
          />
        </div>
      )}

      <AddTaskForm
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddTask={handleAddTask}
      />
    </DashboardShell>
  );
}
