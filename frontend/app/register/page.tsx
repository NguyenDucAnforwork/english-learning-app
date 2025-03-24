'use client';

import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div>
      <AuthForm type="register" />
      <div className="text-center mt-4">
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
} 