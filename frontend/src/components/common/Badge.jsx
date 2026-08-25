export default function Badge({
  children,
}) {
  return (
    <span
      className="
      inline-flex
      items-center
      gap-1.5
      rounded-full
      border
      border-blue-200
      bg-blue-50
      px-3.5
      py-1
      text-xs
      font-semibold
      text-blue-700
      "
    >
      {children}
    </span>
  );
}