export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 dark:bg-[#141414] min-h-screen">
      {children}
    </div>
  );
}
