import {
  CONTACT_EMAIL,
  CV,
  EMAIL_BODY,
  EMAIL_SUBJECT,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "../config/site";

/** "+94 760535227" -> "94760535227" (no plus, spaces, brackets or dashes). */
export const whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, "");

/** Treat anything that is not a plausible international number as "not configured". */
export const whatsappConfigured = whatsappDigits.length >= 9 && whatsappDigits.length <= 15;

export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(opts?: { subject?: string; body?: string }): string {
  const subject = opts?.subject ?? EMAIL_SUBJECT;
  const body = opts?.body ?? EMAIL_BODY;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Real download when the PDF exists, otherwise a clearly-labelled email request. */
export const cvAction = CV.available
  ? ({ kind: "download", href: CV.href, filename: CV.filename, label: "Download CV" } as const)
  : ({
      kind: "request",
      href: mailtoUrl({
        subject: "CV request — Loganathan Yathavan",
        body: "Hi Yathavan,\n\nCould you please send me a copy of your CV?\n\nThank you,\n",
      }),
      label: "Request CV",
    } as const);
