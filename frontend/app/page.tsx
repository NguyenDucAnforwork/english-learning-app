'use client';

import { useAuth } from '../lib/auth';
import NavBar from '../components/NavBar';
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to English App</h1>
        <p className="mt-4 text-gray-600">Please log in to continue.</p>
        <Link href="/login" className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">
        Login
      </Link>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#fefae0]/90 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-xl text-center border border-yellow-100">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Welcome back 👋
          </h2>
          <p className="text-gray-700 text-lg">
            Ready to improve your English today? <br /> Go to <b className="text-indigo-800">Exercise</b> above!
          </p>
        </div>
      </div>
    </>
  );
}
