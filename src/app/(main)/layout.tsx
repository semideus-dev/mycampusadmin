import { PageWrapper } from "@/components/page-wrapper";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>
    </div>
  );
}
