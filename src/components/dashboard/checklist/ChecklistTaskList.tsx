"use client";

import React from "react";
import { ChecklistTask } from "@/data/checklist";
import { ChecklistTaskItem } from "./ChecklistTaskItem";
import { ChecklistEmptyState } from "./ChecklistEmptyState";

interface ChecklistTaskListProps {
  tasks: ChecklistTask[];
  onToggleComplete: (taskId: string) => void;
  onClearFilters: () => void;
}

export function ChecklistTaskList({
  tasks,
  onToggleComplete,
  onClearFilters,
}: ChecklistTaskListProps) {
  if (tasks.length === 0) {
    return <ChecklistEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 overflow-hidden">
      {/* Desktop Column Header */}
      <div className="hidden md:flex items-center justify-between px-5 py-3 bg-[#F3EFEA] border-b border-[#161514]/15 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650]">
        <div className="flex items-center gap-4 flex-1">
          <span className="w-5 text-center">DONE</span>
          <span>TASK DETAILS</span>
        </div>
        <div className="flex items-center gap-8 pr-2">
          <span className="w-24 text-left">CATEGORY</span>
          <span className="w-28 text-left">DUE DATE</span>
          <span className="w-20 text-left">PRIORITY</span>
        </div>
      </div>

      {/* Task Rows */}
      <div className="divide-y divide-[#161514]/12">
        {tasks.map((task) => (
          <ChecklistTaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
