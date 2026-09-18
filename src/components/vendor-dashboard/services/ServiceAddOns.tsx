"use client";

import React, { useState } from "react";
import { VendorAddOn } from "@/data/vendorServices";
import { formatIndianCurrency, validateVendorAddOn } from "@/lib/vendorServices";
import { Plus, Trash2, Edit2, AlertTriangle } from "lucide-react";

interface ServiceAddOnsProps {
  addOns: VendorAddOn[];
  onChange: (updated: VendorAddOn[]) => void;
}

export function ServiceAddOns({ addOns, onChange }: ServiceAddOnsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricingType, setPricingType] = useState<"FIXED" | "CUSTOM_QUOTE">("FIXED");
  const [price, setPrice] = useState<number | "">(20000);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPricingType("FIXED");
    setPrice(20000);
    setError(null);
  };

  const handleSaveAddOn = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddOn: VendorAddOn = {
      id: editingId || `addon-${Date.now()}`,
      name,
      description,
      pricingType,
      price: pricingType === "FIXED" ? (typeof price === "number" ? price : 0) : undefined,
      availability: "AVAILABLE",
    };

    const validation = validateVendorAddOn(newAddOn);
    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0]);
      return;
    }

    if (editingId) {
      onChange(addOns.map((a) => (a.id === editingId ? newAddOn : a)));
    } else {
      onChange([...addOns, newAddOn]);
    }

    resetForm();
  };

  const handleEditClick = (addOn: VendorAddOn) => {
    setEditingId(addOn.id);
    setName(addOn.name);
    setDescription(addOn.description || "");
    setPricingType(addOn.pricingType);
    setPrice(addOn.price ?? 20000);
    setError(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      onChange(addOns.filter((a) => a.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
        <label className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
          Optional Service Add-Ons ({addOns.length})
        </label>
        <span className="text-[11px] font-mono text-[#8C857B]">Extras couples can add</span>
      </div>

      {/* Add-ons List */}
      {addOns.length > 0 && (
        <div className="space-y-2">
          {addOns.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded bg-white border border-[#E8E2D9] text-xs"
            >
              <div>
                <p className="font-medium text-[#2C2A29]">{item.name}</p>
                {item.description && (
                  <p className="text-[11px] text-[#6E6B65] mt-0.5">{item.description}</p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-serif font-medium text-[#2C2A29]">
                  {item.pricingType === "CUSTOM_QUOTE"
                    ? "Custom Quote"
                    : formatIndianCurrency(item.price)}
                </span>

                <button
                  type="button"
                  onClick={() => handleEditClick(item)}
                  className="p-1 text-[#8C857B] hover:text-[#2C2A29]"
                  title="Edit Add-on"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-1 text-[#8C857B] hover:text-rose-700"
                  title="Remove Add-on"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Add-on Form */}
      <form onSubmit={handleSaveAddOn} className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
        <span className="text-xs font-medium text-[#2C2A29] block">
          {editingId ? "Edit Add-On" : "Create New Add-On"}
        </span>

        {error && <p className="text-xs text-rose-700">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase text-[#8C857B] font-medium block mb-1">
              Add-On Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Handcrafted Leather Album"
              className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#8C857B] font-medium block mb-1">
              Pricing Type
            </label>
            <select
              value={pricingType}
              onChange={(e) => setPricingType(e.target.value as "FIXED" | "CUSTOM_QUOTE")}
              className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="FIXED">Fixed Price (₹)</option>
              <option value="CUSTOM_QUOTE">Custom Quote</option>
            </select>
          </div>

          {pricingType === "FIXED" && (
            <div>
              <label className="text-[10px] uppercase text-[#8C857B] font-medium block mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          )}

          <div className={pricingType === "FIXED" ? "" : "sm:col-span-2"}>
            <label className="text-[10px] uppercase text-[#8C857B] font-medium block mb-1">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 30-page luxury flush-mount album"
              className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 text-xs text-[#6E6B65] hover:text-[#2C2A29]"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded hover:bg-[#1A1918]"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{editingId ? "Update Add-On" : "Add Add-On"}</span>
          </button>
        </div>
      </form>

      {/* Delete Add-on Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-rose-200 rounded-xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-rose-950 font-serif text-base">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Remove Add-On?</span>
            </div>
            <p className="text-xs text-[#5A5650]">
              Are you sure you want to remove this add-on from this service?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E2D9]">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-3 py-1.5 text-xs text-[#6E6B65] hover:text-[#2C2A29]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-rose-900 rounded"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
