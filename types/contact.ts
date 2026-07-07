import type { GeoCoordinates, URLString } from "./common";

/** A phone or messaging number with an optional label. */
export interface PhoneNumber {
  /** E.164 format recommended, e.g. `"+254712345678"`. */
  number: string;
  /** Display label, e.g. `"Sales"` or `"Site office"`. */
  label?: string;
}

/** A physical sales/office location. */
export interface OfficeLocation {
  address: string;
  coordinates?: GeoCoordinates;
  /** Opening-hours lines, e.g. `["Mon–Fri: 8am–5pm", "Sat: 9am–1pm"]`. */
  hours?: string[];
}

/** Supported input types for an enquiry form field. */
export type EnquiryFieldType = "text" | "email" | "tel" | "textarea" | "select";

/** Declarative configuration for a single enquiry-form field. */
export interface EnquiryField {
  /** Machine name / form key, e.g. `"fullName"`. */
  name: string;
  label: string;
  type: EnquiryFieldType;
  required?: boolean;
  placeholder?: string;
  /** Selectable options; applies when `type` is `"select"`. */
  options?: string[];
}

/** Configuration for the lead-capture enquiry form. */
export interface EnquiryFormConfig {
  /** Endpoint the form submits to. */
  action?: URLString;
  fields: EnquiryField[];
  /** Message shown after a successful submission. */
  successMessage?: string;
  /** Recipient address for lead notifications. */
  recipientEmail?: string;
}

/** All the ways a prospect can reach the sales team. */
export interface Contact {
  salesPhone: PhoneNumber;
  whatsapp?: PhoneNumber;
  email: string;
  office?: OfficeLocation;
  enquiryForm?: EnquiryFormConfig;
}
