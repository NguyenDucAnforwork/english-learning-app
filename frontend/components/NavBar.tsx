'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth';
import { LogOut } from 'lucide-react';

export default function NavBar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">English App</h1>
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:underline text-indigo-700">🏠 Home</Link>
          <Link href="/exercises" className="hover:underline text-indigo-700">🏋️ Exercise</Link>
          <Link href="/story" className="hover:underline text-indigo-700">📖 Personalized story</Link>
          <span className="text-gray-600">Hi, <b>{user.full_name}</b></span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
