function ArrowLeft({
  stroke = 1.5,
  size = 16,
  color = "fill-slate-400",
}: {
  stroke?: number;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke={color && "currentColor"}
      className={`aspect-square`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export default ArrowLeft;
