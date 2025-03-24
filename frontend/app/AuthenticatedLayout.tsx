'use client';

import { useAuth } from '../lib/auth';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) return <>{children}</>; // nếu chưa login thì không có hình nền

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/english.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
        <div className="bg-[#fefae0]/15 min-h-screen">
        {children}
      </div>
    </div>
  );
}
