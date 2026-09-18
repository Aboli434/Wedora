"use client";

import React, { useState, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout/VendorDashboardShell";
import {
  VendorReview,
  ReviewRequest,
  ReviewStatus,
  INITIAL_VENDOR_REVIEWS,
  INITIAL_REVIEW_REQUESTS,
} from "@/data/vendorReviews";
import {
  calculateReviewsSummary,
  filterVendorReviews,
  ReviewFilterState,
  getReviewsNeedingAttention,
} from "@/lib/vendorReviews";
import {
  ReviewsPageHeader,
  ReviewsOverview,
  ReviewsNeedsAttention,
  RatingSnapshot,
  ResponseSnapshot,
  RecentReviews,
  ReviewFilters,
  ReviewList,
  ReviewDetail,
  ReviewRequestList,
  ReviewRequestEditor,
  ReviewRequestDetail,
  ReviewsPageCTA,
} from "@/components/vendor-dashboard/reviews";
import { Star, Send } from "lucide-react";

export default function VendorReviewsPage() {
  // Master Datasets State
  const [reviews, setReviews] = useState<VendorReview[]>(INITIAL_VENDOR_REVIEWS);
  const [requests, setRequests] = useState<ReviewRequest[]>(INITIAL_REVIEW_REQUESTS);

  // Active Workspace Tab State
  const [activeTab, setActiveTab] = useState<"reviews" | "requests">("reviews");

  // Review Filters State
  const [filters, setFilters] = useState<ReviewFilterState>({
    status: "ALL",
    rating: "ALL",
    responseStatus: "ALL",
    service: "ALL",
    destination: "ALL",
    source: "ALL",
    searchQuery: "",
    sortBy: "newest",
  });

  // Modal / Drawer Selection States
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isRequestEditorOpen, setIsRequestEditorOpen] = useState(false);

  // Derived summaries & lists
  const summary = useMemo(() => calculateReviewsSummary(reviews, requests), [reviews, requests]);
  const needsAttentionList = useMemo(() => getReviewsNeedingAttention(reviews, requests), [reviews, requests]);
  const filteredReviews = useMemo(() => filterVendorReviews(reviews, filters), [reviews, filters]);

  // Selected objects
  const selectedReview = useMemo(() => {
    if (!selectedReviewId) return null;
    return reviews.find((r) => r.id === selectedReviewId) || null;
  }, [reviews, selectedReviewId]);

  const selectedRequest = useMemo(() => {
    if (!selectedRequestId) return null;
    return requests.find((req) => req.id === selectedRequestId) || null;
  }, [requests, selectedRequestId]);

  // Filter Handlers
  const handleFilterChange = (updates: Partial<ReviewFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "ALL",
      rating: "ALL",
      responseStatus: "ALL",
      service: "ALL",
      destination: "ALL",
      source: "ALL",
      searchQuery: "",
      sortBy: "newest",
    });
  };

  const handleResetDemoData = () => {
    setReviews(INITIAL_VENDOR_REVIEWS);
    setRequests(INITIAL_REVIEW_REQUESTS);
    handleResetFilters();
    setSelectedReviewId(null);
    setSelectedRequestId(null);
  };

  const handleMetricSelect = (metricKey: string) => {
    setActiveTab("reviews");
    handleResetFilters();
    if (metricKey === "AWAITING_RESPONSE") {
      setFilters((prev) => ({ ...prev, responseStatus: "NOT_RESPONDED" }));
    } else if (metricKey === "PUBLISHED") {
      setFilters((prev) => ({ ...prev, status: "PUBLISHED" }));
    }
  };

  // Review Mutations
  const handleUpdateStatus = (reviewId: string, newStatus: ReviewStatus) => {
    const now = new Date().toISOString();
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            status: newStatus,
            updatedAt: now,
          };
        }
        return r;
      })
    );
  };

  const handleSubmitResponse = (reviewId: string, responseText: string) => {
    const now = new Date().toISOString();
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            responseStatus: "RESPONDED",
            response: responseText,
            respondedAt: now,
            updatedAt: now,
          };
        }
        return r;
      })
    );
  };

  const handleSaveNotes = (reviewId: string, noteContent: string) => {
    const now = new Date().toISOString();
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            privateNote: noteContent,
            updatedAt: now,
          };
        }
        return r;
      })
    );
  };

  const handleDeleteNotes = (reviewId: string) => {
    const now = new Date().toISOString();
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            privateNote: undefined,
            updatedAt: now,
          };
        }
        return r;
      })
    );
  };

  // Review Request Handlers
  const handleSaveRequest = (requestData: Partial<ReviewRequest>) => {
    const now = new Date().toISOString();
    const newId = `req_${Date.now()}`;
    const newReq: ReviewRequest = {
      id: newId,
      clientReference: requestData.clientReference || "CLI-2026-001",
      bookingId: requestData.bookingId || "BK-2026-001",
      coupleName: requestData.coupleName || "New Couple",
      weddingDate: requestData.weddingDate || "2026-11-15",
      service: requestData.service || "Wedding Photography",
      requestStatus: "REQUESTED",
      requestedAt: now,
      notes: requestData.notes,
    };

    setRequests((prev) => [newReq, ...prev]);
    setIsRequestEditorOpen(false);
    setActiveTab("requests");
    setSelectedRequestId(newId);
  };

  const handleMarkRequestCompleted = (requestId: string) => {
    const now = new Date().toISOString();
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            requestStatus: "COMPLETED",
            completedAt: now,
          };
        }
        return req;
      })
    );
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-16">
        {/* Page Header */}
        <ReviewsPageHeader
          onRequestReview={() => setIsRequestEditorOpen(true)}
          onResetData={handleResetDemoData}
        />

        {/* Reviews Overview Metrics */}
        <ReviewsOverview
          summary={summary}
          activeFilterKey={filters.responseStatus === "NOT_RESPONDED" ? "AWAITING_RESPONSE" : filters.status}
          onSelectMetricFilter={handleMetricSelect}
        />

        {/* Actionable Follow-up Items */}
        <ReviewsNeedsAttention
          items={needsAttentionList}
          onSelectReview={(id) => setSelectedReviewId(id)}
        />

        {/* Rating Snapshot & Distribution */}
        <RatingSnapshot summary={summary} />

        {/* Vendor Response Practice Snapshot */}
        <ResponseSnapshot summary={summary} />

        {/* Recent Client Testimonials Highlights */}
        <RecentReviews
          reviews={reviews}
          onSelectReview={(id) => setSelectedReviewId(id)}
        />

        {/* Workspace Sub-Navigation Tabs */}
        <div className="border-b border-[#161514]/10">
          <div className="flex items-center gap-8 text-xs font-medium font-sans uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 border-b-2 transition-all inline-flex items-center gap-2 ${
                activeTab === "reviews"
                  ? "border-[#161514] text-[#161514] font-semibold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514]"
              }`}
            >
              <Star className="w-4 h-4 text-[#C5A880]" />
              Reviews Directory ({reviews.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={`pb-3 border-b-2 transition-all inline-flex items-center gap-2 ${
                activeTab === "requests"
                  ? "border-[#161514] text-[#161514] font-semibold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514]"
              }`}
            >
              <Send className="w-4 h-4 text-[#C5A880]" />
              Review Invitations ({requests.length})
            </button>
          </div>
        </div>

        {/* TAB 1: REVIEWS DIRECTORY */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <ReviewFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredReviews.length}
            />

            <ReviewList
              reviews={filteredReviews}
              selectedReviewId={selectedReviewId || undefined}
              onSelectReview={(id) => setSelectedReviewId(id)}
              onResetFilters={handleResetFilters}
              onRequestReview={() => setIsRequestEditorOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: REVIEW REQUESTS */}
        {activeTab === "requests" && (
          <ReviewRequestList
            requests={requests}
            selectedRequestId={selectedRequestId || undefined}
            onSelectRequest={(id) => setSelectedRequestId(id)}
            onRequestReview={() => setIsRequestEditorOpen(true)}
          />
        )}

        {/* Closing CTA */}
        <ReviewsPageCTA />
      </div>

      {/* Side-Panel Review Detail Drawer */}
      <ReviewDetail
        review={selectedReview}
        onClose={() => setSelectedReviewId(null)}
        onUpdateStatus={handleUpdateStatus}
        onSubmitResponse={handleSubmitResponse}
        onSaveNotes={handleSaveNotes}
        onDeleteNotes={handleDeleteNotes}
      />

      {/* Request Review Editor Modal */}
      <ReviewRequestEditor
        isOpen={isRequestEditorOpen}
        onClose={() => setIsRequestEditorOpen(false)}
        onSave={handleSaveRequest}
      />

      {/* Review Request Detail Modal */}
      {selectedRequest && (
        <ReviewRequestDetail
          request={selectedRequest}
          onClose={() => setSelectedRequestId(null)}
          onMarkCompleted={handleMarkRequestCompleted}
        />
      )}
    </VendorDashboardShell>
  );
}
