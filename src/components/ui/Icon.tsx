type IconName = "menu" | "close" | "search" | "arrow" | "arrow-left" | "enquiry";

const paths: Record<IconName, React.ReactNode> = {
  menu: (
    <>
      <path d="M2 9h20" />
      <path d="M2 15h20" />
    </>
  ),
  close: (
    <>
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  enquiry: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.5h8" />
      <path d="M8 12.5h5" />
    </>
  ),
};

export function Icon({ name, size = 22, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
