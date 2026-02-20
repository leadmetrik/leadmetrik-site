import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect('/admin-login');
  }

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <AdminSidebar />
      {/* Main content - account for left sidebar on desktop, top header on mobile */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
