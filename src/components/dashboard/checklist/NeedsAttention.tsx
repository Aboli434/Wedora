"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Clock } from "lucide-react";
import { ChecklistTask } from "@/data/checklist";

interface NeedsAttentionProps {
  overdueTasks: ChecklistTask[];
  dueSoonTasks: ChecklistTask[];
}

export function NeedsAttention({
  overdueTasks,
  dueSoonTasks,
}: NeedsAttentionProps) {
  const shouldReduceMotion = useReducedMotion();

  const attentionTasks = [...overdueTasks, ...dueSoonTasks].slice(0, 4);

  if (attentionTasks.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="p-6 bg-[#F3EFEA] border border-[#161514]/15 space-y-4"
    >
      <div className="flex items-center gap-2 border-b border-[#161514]/15 pb-3">
        <AlertCircle className="w-4 h-4 text-[#C5A880]" />
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#161514]">
          NEEDS ATTENTION ({attentionTasks.length})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {attentionTasks.map((task) => {
          const isOverdue = overdueTasks.some((t) => t.id === task.id);
          return (
            <div
              key={task.id}
              className={`p-3.5 bg-[#FAF8F5] border-l-2 flex flex-col justify-between space-y-2 ${
                isOverdue ? "border-amber-700" : "border-[#C5A880]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C5A880]">
                  {task.categoryId.toUpperCase()}
                </span>
                <span
                  className={`text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 ${
                    isOverdue
                      ? "text-amber-900 bg-amber-100"
                      : "text-[#161514] bg-[#F3EFEA]"
                  }`}
                >
                  {isOverdue ? "OVERDUE" : "DUE SOON"}
                </span>
              </div>

              <h4 className="font-serif text-base font-light text-[#161514] leading-snug">
                {task.title}
              </h4>

              <div className="flex items-center gap-1.5 text-[11px] text-[#5A5650] font-sans pt-1 border-t border-[#161514]/10">
                <Clock className="w-3 h-3 text-[#C5A880]" />
                <span>Due {task.dueDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
