export default function ResendIconSimple({
  className = "",
  color = "#fff",
  size = 20,
}: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M21.5 2V8M21.5 8H15.5M21.5 8L18 4.5C16.8 3.3 15.2 2.5 13.5 2.19C11.3 1.79 9 2.27 7.1 3.56C4.4 5.36 2.85 8.39 3.03 11.59C3.21 14.79 5.06 17.62 7.88 19.09C10.7 20.56 14.05 20.46 16.79 18.83C18.4 17.85 19.64 16.38 20.32 14.66"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
