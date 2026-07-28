import SidebarDashboad from "./_component/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarDashboad>{children}</SidebarDashboad>
    </>
  );
}
