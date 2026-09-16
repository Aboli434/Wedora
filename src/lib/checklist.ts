import { ChecklistTask } from "@/data/checklist";

export interface ChecklistProgressStats {
  completedCount: number;
  remainingCount: number;
  totalCount: number;
  percentageComplete: number;
  highPriorityRemaining: number;
  overdueCount: number;
  dueSoonCount: number;
}

const DEFAULT_CURRENT_DATE = "2026-09-16";

/**
 * Calculates progress statistics from a list of tasks.
 */
export function calculateChecklistProgress(
  tasks: ChecklistTask[],
  currentDateStr: string = DEFAULT_CURRENT_DATE
): ChecklistProgressStats {
  const totalCount = tasks.length;
  if (totalCount === 0) {
    return {
      completedCount: 0,
      remainingCount: 0,
      totalCount: 0,
      percentageComplete: 0,
      highPriorityRemaining: 0,
      overdueCount: 0,
      dueSoonCount: 0,
    };
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = totalCount - completedCount;
  const percentageComplete = Math.round((completedCount / totalCount) * 100);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const highPriorityRemaining = pendingTasks.filter(
    (t) => t.priority === "HIGH"
  ).length;

  const overdueCount = getOverdueTasks(pendingTasks, currentDateStr).length;
  const dueSoonCount = getDueSoonTasks(pendingTasks, currentDateStr).length;

  return {
    completedCount,
    remainingCount,
    totalCount,
    percentageComplete,
    highPriorityRemaining,
    overdueCount,
    dueSoonCount,
  };
}

/**
 * Returns pending tasks that are overdue.
 */
export function getOverdueTasks(
  tasks: ChecklistTask[],
  currentDateStr: string = DEFAULT_CURRENT_DATE
): ChecklistTask[] {
  return tasks.filter((t) => !t.completed && t.dueDate < currentDateStr);
}

/**
 * Returns pending tasks due within the next 7 days.
 */
export function getDueSoonTasks(
  tasks: ChecklistTask[],
  currentDateStr: string = DEFAULT_CURRENT_DATE
): ChecklistTask[] {
  const currentDate = new Date(currentDateStr);
  const next7Days = new Date(currentDate);
  next7Days.setDate(currentDate.getDate() + 7);
  const next7DaysStr = next7Days.toISOString().split("T")[0];

  return tasks.filter(
    (t) =>
      !t.completed &&
      t.dueDate >= currentDateStr &&
      t.dueDate <= next7DaysStr
  );
}

/**
 * Filters tasks based on category, status, priority, and search query.
 */
export function filterTasks(
  tasks: ChecklistTask[],
  categoryId: string = "all",
  statusFilter: string = "all",
  priorityFilter: string = "all",
  searchQuery: string = ""
): ChecklistTask[] {
  return tasks.filter((task) => {
    // Category Filter
    if (categoryId !== "all" && task.categoryId !== categoryId) {
      return false;
    }

    // Status Filter
    if (statusFilter === "completed" && !task.completed) {
      return false;
    }
    if (statusFilter === "pending" && task.completed) {
      return false;
    }

    // Priority Filter
    if (
      priorityFilter !== "all" &&
      task.priority.toLowerCase() !== priorityFilter.toLowerCase()
    ) {
      return false;
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(q);
      const descMatch = task.description?.toLowerCase().includes(q) || false;
      const catMatch = task.categoryId.toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !catMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts tasks by due date, priority, or recently added.
 */
export function sortTasks(
  tasks: ChecklistTask[],
  sortBy: string = "dueDate"
): ChecklistTask[] {
  const cloned = [...tasks];

  if (sortBy === "dueDate") {
    return cloned.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  if (sortBy === "priority") {
    const priorityWeight: Record<string, number> = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };
    return cloned.sort(
      (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
    );
  }

  if (sortBy === "recentlyAdded") {
    return cloned.sort((a, b) =>
      (b.createdAt || b.dueDate).localeCompare(a.createdAt || a.dueDate)
    );
  }

  return cloned;
}
