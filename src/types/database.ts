import type {
  CatalogInstallType,
  CatalogUnitType,
  ClientStatus,
  DepositType,
  DiscountType,
  InvoiceStatus,
  JobStatus,
  PhotoType,
  QuoteItemGroup,
  QuoteStatus,
  QuoteType,
  UserRole,
} from "./app";

export type Profile = {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type Client = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  siteAddress: string | null;
  notes: string | null;
  status: ClientStatus;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type CatalogItem = {
  id: string;
  name: string;
  brand: string | null;
  supplier: string | null;
  supplierLink: string | null;
  skuOrAsin: string | null;
  cost: number;
  markupPercent: number;
  packQuantity: number;
  category: string;
  quoteGroup: QuoteItemGroup;
  installType: CatalogInstallType;
  unitType: CatalogUnitType;
  taxable: boolean;
  defaultQuantity: number;
  favourite: boolean;
  active: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type Quote = {
  id: string;
  clientId: string;
  quoteNumber: string;
  revisionNumber: number;
  quoteType: QuoteType;
  status: QuoteStatus;
  scope: string;
  discountType: DiscountType;
  discountValue: number;
  depositType: DepositType;
  depositValue: number;
  quoteLevelLabourHours: number;
  quoteLevelHourlyRate: number;
  clientNotes: string | null;
  internalNotes: string | null;
  sentAt: string | null;
  approvedAt: string | null;
  lockedAt: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type Zone = {
  id: string;
  quoteId: string;
  name: string;
  sortOrder: number;
  wireLengthFeet: number;
  selectedWireCatalogItemId: string | null;
  transformerId: string | null;
  labourHours: number;
  hourlyRate: number;
  clientNotes: string | null;
  internalNotes: string | null;
  collapsed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QuoteItem = {
  id: string;
  quoteId: string;
  zoneId: string | null;
  catalogItemId: string | null;
  quantity: number;

  nameSnapshot: string;
  brandSnapshot: string | null;
  supplierSnapshot: string | null;
  supplierLinkSnapshot: string | null;
  skuOrAsinSnapshot: string | null;
  costSnapshot: number;
  markupPercentSnapshot: number;
  sellPriceSnapshot: number;
  categorySnapshot: string;
  quoteGroupSnapshot: QuoteItemGroup;
  packQuantitySnapshot: number;
  unitTypeSnapshot: CatalogUnitType;
  taxableSnapshot: boolean;

  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type QuoteTransformer = {
  id: string;
  quoteId: string;
  catalogItemId: string;
  nameSnapshot: string;
  capacityWatts: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  id: string;
  clientId: string;
  quoteId: string;
  assignedInstallerId: string | null;
  status: JobStatus;
  scheduledStart: string | null;
  scheduledEnd: string | null;
  jobAddress: string | null;
  crewNotes: string | null;
  installNotes: string | null;
  specialInstructions: string | null;
  startTime: string | null;
  completedTime: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type Invoice = {
  id: string;
  clientId: string;
  quoteId: string;
  jobId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  depositPaid: number;
  balanceDue: number;
  dueDate: string | null;
  paidDate: string | null;
  paymentMethod: string | null;
  notes: string | null;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Photo = {
  id: string;
  clientId: string | null;
  quoteId: string | null;
  zoneId: string | null;
  jobId: string | null;
  uploadedBy: string;
  type: PhotoType;
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

export type AppSettings = {
  id: string;
  businessName: string;
  logoUrl: string | null;
  brandPrimaryColor: string | null;
  brandSecondaryColor: string | null;
  contactEmail: string;
  contactPhone: string | null;
  defaultHourlyRate: number;
  defaultMarkupPercent: number;
  materialTaxRate: number;
  labourTaxable: boolean;
  warrantyText: string;
  paymentTerms: string;
  pdfFooterText: string | null;
  defaultDepositType: DepositType;
  defaultDepositValue: number;
  createdAt: string;
  updatedAt: string;
};