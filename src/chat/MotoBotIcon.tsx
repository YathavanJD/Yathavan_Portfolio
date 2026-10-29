/** Original MotoBot mark: a rounded head with a lime visor, teal "eyes" and an antenna node. */
export default function MotoBotIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M16 3v4" stroke="#B7F34A" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="3" r="1.8" fill="#B7F34A" />
      <rect x="5" y="8" width="22" height="17" rx="6" fill="#F5F5F0" stroke="#101827" strokeWidth="1.6" />
      <rect x="8.5" y="12" width="15" height="8" rx="4" fill="#101827" />
      <circle cx="13" cy="16" r="1.8" fill="#36CFC9" />
      <circle cx="19" cy="16" r="1.8" fill="#36CFC9" />
      <path d="M2.5 15v4M29.5 15v4" stroke="#101827" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 28h8" stroke="#101827" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
