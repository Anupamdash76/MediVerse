export default function DiagnosisInput() {
  return (
    <div className="mt-10">

      <textarea
        rows={6}
        placeholder="Example: I've had a severe headache and vomiting since this morning..."
        className="
        w-full

        rounded-2xl

        border

        border-white/10

        bg-white/5

        p-6

        text-white

        placeholder:text-slate-500

        outline-none

        transition

        focus:border-blue-500

        focus:ring-2

        focus:ring-blue-500/20
        "
      />

    </div>
  );
}