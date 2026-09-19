"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sparkles } from "lucide-react";
import { CHECKLIST_CATEGORIES, ChecklistPriority, ChecklistTask } from "@/data/checklist";

interface AddTaskFormProps {
  onAddTask: (task: ChecklistTask) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddTaskForm({ onAddTask, isOpen: controlledIsOpen, onOpenChange }: AddTaskFormProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isFormOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    setInternalIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("venue");
  const [priority, setPriority] = useState<ChecklistPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("2026-10-15");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task name.");
      return;
    }

    const newTask: ChecklistTask = {
      id: `chk-custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || undefined,
      categoryId,
      priority,
      dueDate,
      completed: false,
      custom: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onAddTask(newTask);

    // Reset & Close
    setTitle("");
    setDescription("");
    setError("");
    setIsOpen(false);
  };

  const validCategories = CHECKLIST_CATEGORIES.filter((c) => c.id !== "all");

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-6 py-3.5 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#161514] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
      >
        <Plus className="w-4 h-4" />
        <span>Add Custom Task</span>
      </button>

      {/* Lightweight Modal Dialog */}
      <AnimatePresence>
        {isFormOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add Custom Planning Task"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161514]/60 backdrop-blur-xs overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-[#FAF8F5] p-6 sm:p-8 border border-[#161514]/20 shadow-xl space-y-6 my-8"
            >
              {/* Dialog Header */}
              <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                      CUSTOM TASK
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#161514]">
                    Add Checklist Item
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close add task modal"
                  className="p-1 text-[#5A5650] hover:text-[#161514] focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Task Name */}
                <div className="space-y-1.5">
                  <label htmlFor="task-title" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Task name <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="e.g. Schedule rehearsal dinner walkthrough"
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {error && (
                    <p className="text-xs text-red-700 font-sans mt-1">
                      {error}
                    </p>
                  )}
                </div>

                {/* Category & Priority Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label htmlFor="task-cat" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Category <span className="text-[#C5A880]">*</span>
                    </label>
                    <select
                      id="task-cat"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      {validCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-1.5">
                    <label htmlFor="task-prio" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Priority <span className="text-[#C5A880]">*</span>
                    </label>
                    <select
                      id="task-prio"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as ChecklistPriority)}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div className="space-y-1.5">
                  <label htmlFor="task-date" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Due date <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="task-date"
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                {/* Optional Description */}
                <div className="space-y-1.5">
                  <label htmlFor="task-desc" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Description (optional)
                  </label>
                  <textarea
                    id="task-desc"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details, notes or contacts for this task..."
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors resize-y"
                  />
                </div>

                {/* Demo Disclaimer */}
                <p className="text-[11px] text-[#5A5650] italic">
                  Note: Custom tasks are added to temporary frontend demonstration state for this session.
                </p>

                {/* Submit Actions */}
                <div className="pt-3 border-t border-[#161514]/15 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#5A5650] hover:text-[#161514] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
