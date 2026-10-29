/// <reference types="vite/client" />

declare const __CV_AVAILABLE__: boolean
declare const __CV_FILENAME__: string

interface ImportMetaEnv {
  /** Optional: public form endpoint (e.g. Formspree). Leave unset to use mailto/WhatsApp fallbacks. */
  readonly VITE_FORM_ENDPOINT?: string
  /** Optional: URL of a secure serverless function that proxies an LLM for MotoBot. */
  readonly VITE_CHAT_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
