import type { ReactNode } from "react";
import { CV, SOCIAL, WHATSAPP_NUMBER } from "../config/site";
import { cvAction, mailtoUrl, whatsappConfigured, whatsappUrl } from "../lib/contact";
import { Download, Github, Linkedin, Mail, WhatsApp } from "./Icons";
import { Magnetic } from "./Magnetic";

type Variant = "lime" | "ghost";
type Common = { variant?: Variant; className?: string; magnetic?: boolean; children?: ReactNode };

const cls = (v: Variant, extra?: string) => `btn ${v === "lime" ? "btn-lime" : "btn-ghost"} ${extra ?? ""}`;

/** Opens WhatsApp with the prefilled message. Renders nothing if the number isn't configured. */
export function WhatsAppButton({ variant = "lime", className, magnetic, children, message }: Common & { message?: string }) {
  if (!whatsappConfigured) return null;
  const el = (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cls(variant, className)}
      aria-label={`Message Yathavan on WhatsApp (${WHATSAPP_NUMBER}) — opens in a new tab`}
    >
      <WhatsApp /> {children ?? "WhatsApp"}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function EmailButton({ variant = "ghost", className, magnetic, children }: Common) {
  const el = (
    <a href={mailtoUrl()} className={cls(variant, className)}>
      <Mail /> {children ?? "Email"}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/**
 * Real download when /Loganathan_Yathavan_CV.pdf exists at build time.
 * Otherwise an honest "Request CV" email — never a link to a missing file.
 */
export function CvButton({ variant = "ghost", className, magnetic, children }: Common) {
  const el =
    cvAction.kind === "download" ? (
      <a
        href={cvAction.href}
        download={CV.filename}
        className={cls(variant, className)}
        aria-label="Download CV (PDF)"
      >
        <Download /> {children ?? cvAction.label}
      </a>
    ) : (
      <a
        href={cvAction.href}
        className={cls(variant, className)}
        title="The CV file hasn't been uploaded yet — this opens an email request instead."
      >
        <Mail /> {children ?? cvAction.label}
      </a>
    );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      <li>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <Github /> GitHub
        </a>
      </li>
      <li>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <Linkedin /> LinkedIn
        </a>
      </li>
    </ul>
  );
}
