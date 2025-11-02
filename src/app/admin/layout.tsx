import { requireAuth } from '@/lib/auth';
import AdminNavigation from '@/components/AdminNavigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const username = session.username;

  return (
    <div>
      <AdminNavigation username={username} />

      <main>
        {children}
      </main>
    </div>
  );
}
