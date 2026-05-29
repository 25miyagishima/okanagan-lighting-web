export type UserRole = "admin" | "installer" | "client";

export type ClientStatus = "lead" | "active" | "archived";

export type QuoteStatus =
  | "draft"
  | "sent"
  | "approved"
  | "scheduled"
  | "installed"
  | "invoiced"
  | "paid"
  | "archived";
  
export type QuoteType = "indoor" | "outdoor";

export type JobStatus =
  | "approved"
  | "scheduled"
  | "in_progress"
  | "installed"
  | "completed"
  | "invoiced"
  | "archived";

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "archived";

export type CatalogInstallType = "indoor" | "outdoor" | "both";

export type CatalogUnitType =
  | "each"
  | "pack"
  | "foot"
  | "roll"
  | "hour"
  | "custom";

export type QuoteItemGroup = "fixtures" | "wire" | "controls" | "materials";

export type DiscountType = "none" | "fixed" | "percentage";

export type DepositType = "none" | "fixed" | "percentage";

export type PhotoType =
  | "before"
  | "reference"
  | "install"
  | "after"
  | "issue_repair";
