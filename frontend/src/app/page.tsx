import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <Image
        src="/english.svg"
        alt="Learn English Illustration"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-white mb-4 text-center drop-shadow">
        Boost Your English
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Practice vocabulary in real context and improve your English day by day.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-200"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border border-indigo-300 rounded-full shadow-md hover:bg-indigo-50 transition-all duration-200"
        >
          <UserPlus className="w-5 h-5" />
          Sign Up
        </Link>
      </div>
    </div>
  );
}
