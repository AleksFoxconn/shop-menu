const ICONS = {
  water: (
    <path d="M9 2h6l1 3.5c2.5 1 4 3.6 4 6.5a7 7 0 1 1-14 0c0-2.9 1.5-5.5 4-6.5L9 2Z" />
  ),
  cola: (
    <path d="M7 3h10l-1 4.2c1 .3 1.8 1.2 1.7 2.3l-.9 10a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8l-.9-10c-.1-1.1.7-2 1.7-2.3L7 3Zm-.3 6.5h10.6" />
  ),
  bread: (
    <path d="M4 13c0-4 3.6-7 8-7s8 3 8 7v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z M8 12v3 M12 11v4 M16 12v3" />
  ),
  fishrod: (
    <path d="M3 21 15 6 M15 6c1.5-1.5 4-2.5 6-2-.3 2-1.5 4-3 5.5 M15 6l3 3 M9 15c-2 2-4 2-5.5.5" />
  ),
  bait: (
    <path d="M12 3v3 M8 8c-2 1-3 3-3 5.5C5 17.5 8 20 12 20s7-2.5 7-6.5c0-2.5-1-4.5-3-5.5 M9 12h.01 M15 12h.01" />
  ),
  boots: (
    <path d="M7 3h4v9l3 2h6a2 2 0 0 1 2 2v1H7a2 2 0 0 1-2-2v-9a3 3 0 0 1 2-3Z" />
  ),
  simcard: (
    <path d="M8 3h6l4 4v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M9 10h3v4H9z" />
  ),
  flashlight: (
    <path d="M9 3h6v3l-2 2v11a1 1 0 0 1-1 1h0a1 1 0 0 1-1-1V8L9 6V3Z M9 9h6" />
  ),
  battery: (
    <path d="M3 9h14v6H3z M17 11h2v2h-2z M7 12h4" />
  ),
  powerbank: (
    <path d="M6 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M11 7l-3 5h3l-1 5 4-6h-3l1-4Z" />
  ),
  radio: (
    <path d="M8 3l2 3h4l2-3 M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z M12 12v5 M9 12h.01 M15 12h.01" />
  ),
  bandage: (
    <path d="M5 12a5 5 0 0 1 7-4.6l6.6 6.6a5 5 0 1 1-7 7L5.4 14.4A5 5 0 0 1 5 12Z M9.5 9.5l5 5" />
  ),
  lockpick: (
    <path d="M6 10V7a4 4 0 1 1 8 0v3 M4 10h12v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z M9 15h3" />
  ),
  toolkit: (
    <path d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3 M3 13h18" />
  ),
  rope: (
    <path d="M4 6c3 0 3 3 6 3s3-3 6-3 3 3 3 3 M4 12c3 0 3 3 6 3s3-3 6-3 3 3 3 3 M4 18c3 0 3 3 6 3" />
  ),
  matches: (
    <path d="M8 3a2 2 0 1 1 4 0c0 1-.8 1.6-2 3-1.2-1.4-2-2-2-3Z M10 8v13 M6 21h8" />
  ),
  gloves: (
    <path d="M6 12V6a2 2 0 1 1 4 0v3 M10 9V4a2 2 0 1 1 4 0v5 M14 9V5a2 2 0 1 1 4 0v9a6 6 0 0 1-6 6H9a4 4 0 0 1-4-4v-4l2-2" />
  ),
  bag: (
    <path d="M6 8h12l1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L6 8Z M9 8V6a3 3 0 0 1 6 0v2" />
  ),
  food: (
    <path d="M4 3v7a3 3 0 0 0 3 3v8 M4 3v6 M7 3v6 M17 3c-2 0-3 2-3 5v3h2v9 M17 3v17" />
  ),
  fish: (
    <path d="M3 12c3-4 8-6 12-6 3 0 5 2 6 3-1 1-3 3-6 3-4 0-9-2-12-6 3 5 3 8 0 12 3-4 8-6 12-6 3 0 5 2 6 3" />
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  gem: <path d="M6 3h12l3 6-9 12L3 9l3-6Z M3 9h18 M9 3l3 6 3-6 M12 9l-3 12 M12 9l3 12" />,
};

export default function ProductIcon({ name, className, size = 28 }) {
  const path = ICONS[name] || ICONS.bag;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}
