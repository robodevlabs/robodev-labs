/* ==========================================================================
   RoboDev Labs — Centralized Form Configuration
   Single source of truth for all external form endpoints across the website.
   Update form destinations here; all pages and components consume these keys.
   ========================================================================== */

export interface FormConfig {
  freeWorkshopRegistration: string;
  paidWorkshopEnrollment: string;
  internshipApplication: string;
  jobEngineeringApplication: string;
  generalContact: string;
}

export const formsConfig: FormConfig = {
  freeWorkshopRegistration:
    'https://docs.google.com/forms/d/e/1FAIpQLSct9EeV3YbiRs8xlnEbbeVr6CJTdRPrnQvjbbXQ2cEOuDcZPQ/viewform?usp=dialog',
  paidWorkshopEnrollment:
    'https://docs.google.com/forms/d/e/1FAIpQLSc17XxHtKPAyQfsMqXJZCmJfrmQ4dGlSawYm9gHAXBHy8WlAQ/viewform?usp=dialog',
  internshipApplication:
    'https://docs.google.com/forms/d/e/1FAIpQLScWg3PD6M8_j4TmKNpIXW3_iuQSAD_5R3WZcaghzDsNH_XTZw/viewform?usp=dialog',
  jobEngineeringApplication:
    'https://docs.google.com/forms/d/e/1FAIpQLScWg3PD6M8_j4TmKNpIXW3_iuQSAD_5R3WZcaghzDsNH_XTZw/viewform?usp=dialog',
  generalContact:
    'https://docs.google.com/forms/d/e/1FAIpQLSdAim1ecdpi2kSFqydna_OrOYuu-yFPLcUaMfePLErWsCATig/viewform?usp=dialog',
} as const;

export type FormKey = keyof FormConfig;
