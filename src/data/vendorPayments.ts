export type PaymentStatus =
  | "PENDING"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod =
  | "BANK_TRANSFER"
  | "UPI"
  | "CASH"
  | "CARD"
  | "OTHER";

export type PaymentType =
  | "ADVANCE"
  | "INSTALLMENT"
  | "FINAL_PAYMENT"
  | "ADD_ON"
  | "REFUND";

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "VOID";

export interface VendorPayment {
  id: string;
  paymentReference: string;
  bookingId: string;
  clientReference: string;
  coupleName: string;
  service: string;
  packageName: string;
  destination: string;
  weddingDate: string;
  paymentType: PaymentType;
  amount: number;
  paidAmount: number;
  outstandingAmount: number;
  dueDate: string;
  paidAt?: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  invoiceId?: string;
  receiptId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  transactionReference: string;
  paymentId: string;
  bookingId: string;
  clientReference: string;
  coupleName: string;
  amount: number;
  transactionDate: string;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  status: "SUCCESS" | "PENDING" | "FAILED";
  notes?: string;
  createdAt: string;
}

export interface VendorInvoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  clientReference: string;
  coupleName: string;
  service: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: InvoiceStatus;
  notes?: string;
}

export interface VendorPaymentsSummary {
  totalBookedValue: number;
  totalReceived: number;
  totalOutstanding: number;
  overdueAmount: number;
  dueSoonAmount: number;
  totalPayments: number;
  paidPayments: number;
  pendingPayments: number;
  overduePayments: number;
  totalInvoices: number;
  paidInvoices: number;
  outstandingInvoices: number;
}

export interface PaymentActionItem {
  id: string;
  type: "OVERDUE" | "DUE_SOON" | "INVOICE_PENDING" | "PARTIAL_PAYMENT" | "MISSING_METHOD";
  title: string;
  description: string;
  paymentId?: string;
  bookingId?: string;
  dueDate?: string;
  priority: "HIGH" | "NORMAL" | "LOW";
  amount?: number;
}

export const INITIAL_VENDOR_PAYMENTS: VendorPayment[] = [
  {
    id: "pay_1",
    paymentReference: "PAY-2026-001",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    service: "Full Wedding Photography & Cinematography",
    packageName: "Royal Heritage Collection",
    destination: "Udaipur",
    weddingDate: "2026-11-15",
    paymentType: "ADVANCE",
    amount: 300000,
    paidAmount: 300000,
    outstandingAmount: 0,
    dueDate: "2026-01-15",
    paidAt: "2026-01-15T10:30:00Z",
    status: "PAID",
    paymentMethod: "BANK_TRANSFER",
    invoiceId: "inv_1",
    receiptId: "rcpt_1",
    notes: "Initial 40% booking deposit received via HDFC Bank NEFT.",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "pay_2",
    paymentReference: "PAY-2026-002",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    service: "Full Wedding Photography & Cinematography",
    packageName: "Royal Heritage Collection",
    destination: "Udaipur",
    weddingDate: "2026-11-15",
    paymentType: "INSTALLMENT",
    amount: 250000,
    paidAmount: 250000,
    outstandingAmount: 0,
    dueDate: "2026-08-10",
    paidAt: "2026-08-10T14:15:00Z",
    status: "PAID",
    paymentMethod: "UPI",
    invoiceId: "inv_1",
    receiptId: "rcpt_2",
    notes: "Second milestone installment paid prior to pre-wedding shoot.",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-08-10T14:15:00Z",
  },
  {
    id: "pay_3",
    paymentReference: "PAY-2026-003",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    service: "Full Wedding Photography & Cinematography",
    packageName: "Royal Heritage Collection",
    destination: "Udaipur",
    weddingDate: "2026-11-15",
    paymentType: "FINAL_PAYMENT",
    amount: 200000,
    paidAmount: 0,
    outstandingAmount: 200000,
    dueDate: "2026-09-01",
    status: "OVERDUE",
    invoiceId: "inv_1",
    notes: "Final balance due 60 days before event. Follow-up reminder sent.",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-09-02T08:00:00Z",
  },
  {
    id: "pay_4",
    paymentReference: "PAY-2026-004",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    service: "Candid Photography & Teaser Film",
    packageName: "Palace Elegance Package",
    destination: "Jaipur",
    weddingDate: "2026-12-04",
    paymentType: "ADVANCE",
    amount: 200000,
    paidAmount: 200000,
    outstandingAmount: 0,
    dueDate: "2026-03-20",
    paidAt: "2026-03-20T11:00:00Z",
    status: "PAID",
    paymentMethod: "BANK_TRANSFER",
    invoiceId: "inv_2",
    receiptId: "rcpt_3",
    notes: "Advance confirmation payment received.",
    createdAt: "2026-03-15T12:00:00Z",
    updatedAt: "2026-03-20T11:00:00Z",
  },
  {
    id: "pay_5",
    paymentReference: "PAY-2026-005",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    service: "Candid Photography & Teaser Film",
    packageName: "Palace Elegance Package",
    destination: "Jaipur",
    weddingDate: "2026-12-04",
    paymentType: "INSTALLMENT",
    amount: 180000,
    paidAmount: 180000,
    outstandingAmount: 0,
    dueDate: "2026-09-10",
    paidAt: "2026-09-10T16:45:00Z",
    status: "PAID",
    paymentMethod: "UPI",
    invoiceId: "inv_2",
    receiptId: "rcpt_4",
    notes: "Mid-way installment cleared via Google Pay.",
    createdAt: "2026-03-15T12:00:00Z",
    updatedAt: "2026-09-10T16:45:00Z",
  },
  {
    id: "pay_6",
    paymentReference: "PAY-2026-006",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    service: "Candid Photography & Teaser Film",
    packageName: "Palace Elegance Package",
    destination: "Jaipur",
    weddingDate: "2026-12-04",
    paymentType: "FINAL_PAYMENT",
    amount: 100000,
    paidAmount: 0,
    outstandingAmount: 100000,
    dueDate: "2026-10-25",
    status: "PENDING",
    invoiceId: "inv_2",
    notes: "Final balance due 40 days prior to event.",
    createdAt: "2026-03-15T12:00:00Z",
    updatedAt: "2026-03-15T12:00:00Z",
  },
  {
    id: "pay_7",
    paymentReference: "PAY-2026-007",
    bookingId: "BK-2026-003",
    clientReference: "CLI-2026-003",
    coupleName: "Isha & Kunal",
    service: "Pre-Wedding & Destination Wedding Film",
    packageName: "Coastal Sunset Package",
    destination: "Goa",
    weddingDate: "2026-11-28",
    paymentType: "ADVANCE",
    amount: 250000,
    paidAmount: 250000,
    outstandingAmount: 0,
    dueDate: "2026-05-15",
    paidAt: "2026-05-12T15:20:00Z",
    status: "PAID",
    paymentMethod: "UPI",
    invoiceId: "inv_3",
    receiptId: "rcpt_5",
    notes: "Early bird advance deposit received.",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-05-12T15:20:00Z",
  },
  {
    id: "pay_8",
    paymentReference: "PAY-2026-008",
    bookingId: "BK-2026-003",
    clientReference: "CLI-2026-003",
    coupleName: "Isha & Kunal",
    service: "Pre-Wedding & Destination Wedding Film",
    packageName: "Coastal Sunset Package",
    destination: "Goa",
    weddingDate: "2026-11-28",
    paymentType: "FINAL_PAYMENT",
    amount: 270000,
    paidAmount: 120000,
    outstandingAmount: 150000,
    dueDate: "2026-10-05",
    status: "PARTIALLY_PAID",
    paymentMethod: "BANK_TRANSFER",
    invoiceId: "inv_3",
    receiptId: "rcpt_6",
    notes: "Partially paid ₹1,20,000 on 2026-09-05. Remaining ₹1,50,000 due Oct 5.",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-09-05T17:30:00Z",
  },
  {
    id: "pay_9",
    paymentReference: "PAY-2026-009",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    service: "Traditional Wedding Photography",
    packageName: "Grand Classic Package",
    destination: "Mumbai",
    weddingDate: "2026-08-20",
    paymentType: "ADVANCE",
    amount: 150000,
    paidAmount: 150000,
    outstandingAmount: 0,
    dueDate: "2026-06-01",
    paidAt: "2026-06-01T09:45:00Z",
    status: "PAID",
    paymentMethod: "CARD",
    invoiceId: "inv_4",
    receiptId: "rcpt_7",
    notes: "Paid in full via corporate credit card.",
    createdAt: "2026-05-25T14:00:00Z",
    updatedAt: "2026-06-01T09:45:00Z",
  },
  {
    id: "pay_10",
    paymentReference: "PAY-2026-010",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    service: "Traditional Wedding Photography",
    packageName: "Grand Classic Package",
    destination: "Mumbai",
    weddingDate: "2026-08-20",
    paymentType: "INSTALLMENT",
    amount: 110000,
    paidAmount: 110000,
    outstandingAmount: 0,
    dueDate: "2026-08-01",
    paidAt: "2026-08-01T12:10:00Z",
    status: "PAID",
    paymentMethod: "UPI",
    invoiceId: "inv_4",
    receiptId: "rcpt_8",
    notes: "Pre-event balance installment cleared.",
    createdAt: "2026-05-25T14:00:00Z",
    updatedAt: "2026-08-01T12:10:00Z",
  },
  {
    id: "pay_11",
    paymentReference: "PAY-2026-011",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    service: "Traditional Wedding Photography",
    packageName: "Grand Classic Package",
    destination: "Mumbai",
    weddingDate: "2026-08-20",
    paymentType: "FINAL_PAYMENT",
    amount: 100000,
    paidAmount: 100000,
    outstandingAmount: 0,
    dueDate: "2026-08-25",
    paidAt: "2026-08-25T18:00:00Z",
    status: "PAID",
    paymentMethod: "BANK_TRANSFER",
    invoiceId: "inv_4",
    receiptId: "rcpt_9",
    notes: "Final album delivery payment cleared.",
    createdAt: "2026-05-25T14:00:00Z",
    updatedAt: "2026-08-25T18:00:00Z",
  },
  {
    id: "pay_12",
    paymentReference: "PAY-2026-012",
    bookingId: "BK-2026-005",
    clientReference: "CLI-2026-005",
    coupleName: "Priya & Dev",
    service: "Luxury Wedding Film & Fine Art Album",
    packageName: "Bespoke Luxury Collection",
    destination: "Jaipur",
    weddingDate: "2027-01-10",
    paymentType: "ADVANCE",
    amount: 100000,
    paidAmount: 0,
    outstandingAmount: 100000,
    dueDate: "2026-09-25",
    status: "PENDING",
    notes: "Booking advance invoice issued. Payment due by Sept 25.",
    createdAt: "2026-09-12T11:00:00Z",
    updatedAt: "2026-09-12T11:00:00Z",
  },
  {
    id: "pay_13",
    paymentReference: "PAY-2026-013",
    bookingId: "BK-2026-005",
    clientReference: "CLI-2026-005",
    coupleName: "Priya & Dev",
    service: "Luxury Wedding Film & Fine Art Album",
    packageName: "Bespoke Luxury Collection",
    destination: "Jaipur",
    weddingDate: "2027-01-10",
    paymentType: "FINAL_PAYMENT",
    amount: 250000,
    paidAmount: 0,
    outstandingAmount: 250000,
    dueDate: "2026-11-20",
    status: "PENDING",
    notes: "Final payment scheduled 50 days prior to event.",
    createdAt: "2026-09-12T11:00:00Z",
    updatedAt: "2026-09-12T11:00:00Z",
  },
];

export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "txn_1",
    transactionReference: "TXN-2026-8891",
    paymentId: "pay_1",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    amount: 300000,
    transactionDate: "2026-01-15T10:30:00Z",
    paymentMethod: "BANK_TRANSFER",
    paymentType: "ADVANCE",
    status: "SUCCESS",
    notes: "HDFC Bank NEFT Ref #N015263910",
    createdAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "txn_2",
    transactionReference: "TXN-2026-8892",
    paymentId: "pay_2",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    amount: 250000,
    transactionDate: "2026-08-10T14:15:00Z",
    paymentMethod: "UPI",
    paymentType: "INSTALLMENT",
    status: "SUCCESS",
    notes: "Google Pay UPI Ref #2238491028",
    createdAt: "2026-08-10T14:15:00Z",
  },
  {
    id: "txn_3",
    transactionReference: "TXN-2026-8893",
    paymentId: "pay_4",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    amount: 200000,
    transactionDate: "2026-03-20T11:00:00Z",
    paymentMethod: "BANK_TRANSFER",
    paymentType: "ADVANCE",
    status: "SUCCESS",
    notes: "ICICI RTGS Ref #R98341029",
    createdAt: "2026-03-20T11:00:00Z",
  },
  {
    id: "txn_4",
    transactionReference: "TXN-2026-8894",
    paymentId: "pay_5",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    amount: 180000,
    transactionDate: "2026-09-10T16:45:00Z",
    paymentMethod: "UPI",
    paymentType: "INSTALLMENT",
    status: "SUCCESS",
    notes: "PhonePe UPI Ref #P90238419",
    createdAt: "2026-09-10T16:45:00Z",
  },
  {
    id: "txn_5",
    transactionReference: "TXN-2026-8895",
    paymentId: "pay_7",
    bookingId: "BK-2026-003",
    clientReference: "CLI-2026-003",
    coupleName: "Isha & Kunal",
    amount: 250000,
    transactionDate: "2026-05-12T15:20:00Z",
    paymentMethod: "UPI",
    paymentType: "ADVANCE",
    status: "SUCCESS",
    notes: "Paytm UPI Ref #PY283019",
    createdAt: "2026-05-12T15:20:00Z",
  },
  {
    id: "txn_6",
    transactionReference: "TXN-2026-8896",
    paymentId: "pay_8",
    bookingId: "BK-2026-003",
    clientReference: "CLI-2026-003",
    coupleName: "Isha & Kunal",
    amount: 120000,
    transactionDate: "2026-09-05T17:30:00Z",
    paymentMethod: "BANK_TRANSFER",
    paymentType: "FINAL_PAYMENT",
    status: "SUCCESS",
    notes: "Partial payment received via IMPS.",
    createdAt: "2026-09-05T17:30:00Z",
  },
  {
    id: "txn_7",
    transactionReference: "TXN-2026-8897",
    paymentId: "pay_9",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    amount: 150000,
    transactionDate: "2026-06-01T09:45:00Z",
    paymentMethod: "CARD",
    paymentType: "ADVANCE",
    status: "SUCCESS",
    notes: "Axis Bank Credit Card #*4092",
    createdAt: "2026-06-01T09:45:00Z",
  },
  {
    id: "txn_8",
    transactionReference: "TXN-2026-8898",
    paymentId: "pay_10",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    amount: 110000,
    transactionDate: "2026-08-01T12:10:00Z",
    paymentMethod: "UPI",
    paymentType: "INSTALLMENT",
    status: "SUCCESS",
    notes: "GPay UPI #G7728491",
    createdAt: "2026-08-01T12:10:00Z",
  },
  {
    id: "txn_9",
    transactionReference: "TXN-2026-8899",
    paymentId: "pay_11",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    amount: 100000,
    transactionDate: "2026-08-25T18:00:00Z",
    paymentMethod: "BANK_TRANSFER",
    paymentType: "FINAL_PAYMENT",
    status: "SUCCESS",
    notes: "Final settlement IMPS #I99284102",
    createdAt: "2026-08-25T18:00:00Z",
  },
];

export const INITIAL_VENDOR_INVOICES: VendorInvoice[] = [
  {
    id: "inv_1",
    invoiceNumber: "INV-2026-001",
    bookingId: "BK-2026-001",
    clientReference: "CLI-2026-001",
    coupleName: "Aditi & Arjun",
    service: "Royal Heritage Collection (Udaipur)",
    issueDate: "2026-01-10",
    dueDate: "2026-09-01",
    subtotal: 750000,
    taxAmount: 0,
    totalAmount: 750000,
    paidAmount: 550000,
    outstandingAmount: 200000,
    status: "ISSUED",
    notes: "Comprehensive wedding coverage invoice.",
  },
  {
    id: "inv_2",
    invoiceNumber: "INV-2026-002",
    bookingId: "BK-2026-002",
    clientReference: "CLI-2026-002",
    coupleName: "Meera & Rohan",
    service: "Palace Elegance Package (Jaipur)",
    issueDate: "2026-03-15",
    dueDate: "2026-10-25",
    subtotal: 480000,
    taxAmount: 0,
    totalAmount: 480000,
    paidAmount: 380000,
    outstandingAmount: 100000,
    status: "ISSUED",
    notes: "Candid photography & teaser film invoice.",
  },
  {
    id: "inv_3",
    invoiceNumber: "INV-2026-003",
    bookingId: "BK-2026-003",
    clientReference: "CLI-2026-003",
    coupleName: "Isha & Kunal",
    service: "Coastal Sunset Package (Goa)",
    issueDate: "2026-05-10",
    dueDate: "2026-10-05",
    subtotal: 520000,
    taxAmount: 0,
    totalAmount: 520000,
    paidAmount: 370000,
    outstandingAmount: 150000,
    status: "ISSUED",
    notes: "Destination wedding film invoice.",
  },
  {
    id: "inv_4",
    invoiceNumber: "INV-2026-004",
    bookingId: "BK-2026-004",
    clientReference: "CLI-2026-004",
    coupleName: "Ananya & Kabir",
    service: "Grand Classic Package (Mumbai)",
    issueDate: "2026-05-25",
    dueDate: "2026-08-25",
    subtotal: 360000,
    taxAmount: 0,
    totalAmount: 360000,
    paidAmount: 360000,
    outstandingAmount: 0,
    status: "PAID",
    notes: "Fully paid invoice for completed wedding.",
  },
  {
    id: "inv_5",
    invoiceNumber: "INV-2026-005",
    bookingId: "BK-2026-005",
    clientReference: "CLI-2026-005",
    coupleName: "Priya & Dev",
    service: "Bespoke Luxury Collection (Jaipur)",
    issueDate: "2026-09-12",
    dueDate: "2026-09-25",
    subtotal: 350000,
    taxAmount: 0,
    totalAmount: 350000,
    paidAmount: 0,
    outstandingAmount: 350000,
    status: "ISSUED",
    notes: "Advance payment invoice issued for January 2027 celebration.",
  },
];
