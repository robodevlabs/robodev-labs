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
    'https://docs.google.com/forms/d/e/1FAIpQLSf1Me28g-Jqmwow0f1EqtVL63AZDDMyNyHD4DNg8BpC7OxMtQ/viewform?usp=dialog',
  jobEngineeringApplication:
    'https://docs.google.com/forms/d/e/1FAIpQLSdJopb5J8T7shh-MpGD8HhUwVj04bCJk1BwcN8-Gqd25aWYTQ/viewform?usp=dialog',
  generalContact:
    'https://docs.google.com/forms/d/e/1FAIpQLSfxFJhqwV9V08iAAoXB97ndqSjY7lVvFT87UY0trhsLZdo2LQ/viewform?usp=dialog',
} as const;

export type FormKey = keyof FormConfig;
