"use client";

import React from "react";
import { EventTask } from "@/data/eventsDashboard";
import { CheckSquare, Square, Calendar } from "lucide-react";

interface EventTaskListProps {
  tasks: EventTask[];
  onToggleTask: (taskId: string) => void;
}

export function EventTaskList({ tasks, onToggleTask }: EventTaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-xs font-sans text-[#5A5650] italic">
        No event-specific planning tasks added yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
        Event Planning Checklist
      </span>

      <div className="divide-y divide-[#161514]/10 bg-white/60 border border-[#161514]/10">
        {tasks.map((task) => {
          const isDone = task.status === "COMPLETED";

          return (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className="p-3 flex items-start gap-3 text-xs font-sans cursor-pointer hover:bg-[#161514]/[0.02] transition-colors group"
            >
              <button
                type="button"
                aria-label={`Mark task '${task.title}' as ${isDone ? "incomplete" : "complete"}`}
                className="mt-0.5 text-[#161514] focus:outline-none"
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-[#2D4A3E]" />
                ) : (
                  <Square className="w-4 h-4 text-[#5A5650] group-hover:text-[#C5A880] transition-colors" />
                )}
              </button>

              <div className="flex-1 space-y-0.5">
                <span
                  className={`font-serif text-sm block ${
                    isDone
                      ? "line-through text-[#5A5650]/70"
                      : "text-[#161514] font-medium"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-3 text-[10px] text-[#5A5650]">
                  <span className="uppercase tracking-wider">
                    Priority: {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C5A880]" />
                      Due: {task.dueDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
