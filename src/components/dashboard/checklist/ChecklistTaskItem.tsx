"use client";

import React from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import { ChecklistTask } from "@/data/checklist";

interface ChecklistTaskItemProps {
  task: ChecklistTask;
  onToggleComplete: (taskId: string) => void;
  currentDateStr?: string;
}

export function ChecklistTaskItem({
  task,
  onToggleComplete,
  currentDateStr = "2026-09-16",
}: ChecklistTaskItemProps) {
  const isOverdue = !task.completed && task.dueDate < currentDateStr;

  const priorityStyles: Record<string, string> = {
    HIGH: "text-[#161514] bg-[#F3EFEA] border-[#C5A880]",
    MEDIUM: "text-[#5A5650] bg-[#F3EFEA] border-[#161514]/20",
    LOW: "text-[#5A5650] bg-[#F3EFEA] border-[#161514]/10",
  };

  return (
    <div
      className={`p-4 sm:p-5 border-b border-[#161514]/12 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
        task.completed
          ? "bg-[#FAF8F5]/60 text-[#5A5650]"
          : "bg-[#FAF8F5] text-[#161514] hover:bg-[#F3EFEA]/40"
      }`}
    >
      {/* Left: Checkbox & Task Main Info */}
      <div className="flex items-start gap-4 flex-1">
        {/* Accessible Checkbox */}
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={`Mark task "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 w-5 h-5 flex-shrink-0 border flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880] ${
            task.completed
              ? "bg-[#161514] border-[#161514] text-[#FAF8F5]"
              : "border-[#161514]/40 bg-transparent hover:border-[#C5A880]"
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={`font-serif text-lg font-light transition-all ${
                task.completed
                  ? "line-through text-[#5A5650]/70"
                  : "text-[#161514]"
              }`}
            >
              {task.title}
            </h4>

            {task.custom && (
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#F3EFEA] text-[#C5A880] border border-[#C5A880]/30">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Custom</span>
              </span>
            )}
          </div>

          {task.description && (
            <p
              className={`text-xs font-sans font-light max-w-2xl leading-relaxed ${
                task.completed ? "text-[#5A5650]/60" : "text-[#5A5650]"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Meta Information (Category, Due Date, Priority) */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 text-xs font-sans pl-9 md:pl-0">
        {/* Category Tag */}
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5A5650] px-2.5 py-1 bg-[#F3EFEA] border border-[#161514]/10 whitespace-nowrap">
          {task.categoryId.toUpperCase()}
        </span>

        {/* Due Date Tag */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 border text-[11px] whitespace-nowrap ${
            isOverdue
              ? "text-amber-900 bg-amber-100/70 border-amber-300 font-semibold"
              : "text-[#5A5650] bg-[#F3EFEA] border-[#161514]/10"
          }`}
        >
          <Clock className={`w-3 h-3 ${isOverdue ? "text-amber-700" : "text-[#C5A880]"}`} />
          <span>{isOverdue ? `Overdue (${task.dueDate})` : task.dueDate}</span>
        </div>

        {/* Priority Badge */}
        <span
          className={`text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 border whitespace-nowrap ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}
