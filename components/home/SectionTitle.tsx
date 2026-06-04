export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mx-auto my-[50px] w-[800px] rounded-2xl bg-gray-bg p-3 text-center text-dark max-[800px]:w-[90%]">
      {children}
    </h2>
  );
}
