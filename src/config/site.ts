/**
 * SINGLE SOURCE OF TRUTH for contact + deployment configuration.
 * Edit values here; every button, link, the contact form and MotoBot read from this file.
 */

/** Shown to humans. Digits-only international form is derived below. */
export const WHATSAPP_NUMBER = "+94 760535227";

export const CONTACT_EMAIL = "loganathanyathavan@gmail.com";

export const SITE_URL = "https://yathavan-portfolio.onrender.com";

export const SOCIAL = {
  github: "https://github.com/YathavanJD",
  linkedin: "https://www.linkedin.com/in/yathavan-loganathan03/",
  instagram: "https://www.instagram.com/jdyathu/",
} as const;

/**
 * CV: put the real PDF at  public/Loganathan_Yathavan_CV.pdf  (exact name).
 * The build detects it (see vite.config.ts) and switches every "Download CV"
 * button from "CV on request" to a real download. Nothing else to edit.
 */
export const CV = {
  available: __CV_AVAILABLE__,
  filename: __CV_FILENAME__,
  href: `./${__CV_FILENAME__}`,
} as const;

export const WHATSAPP_MESSAGE =
  "Hi Yathavan, I visited your portfolio and would like to discuss a project or opportunity.";

export const EMAIL_SUBJECT = "Portfolio Enquiry — Loganathan Yathavan";
export const EMAIL_BODY =
  "Hi Yathavan,\n\nI visited your portfolio and would like to get in touch about…\n\nKind regards,\n";

/** Optional endpoint for a real form backend (public by design, e.g. Formspree). */
export const FORM_ENDPOINT: string | undefined = import.meta.env.VITE_FORM_ENDPOINT || undefined;
/** Optional secure serverless endpoint for MotoBot's LLM replies. */
export const CHAT_ENDPOINT: string | undefined = import.meta.env.VITE_CHAT_ENDPOINT || undefined;
