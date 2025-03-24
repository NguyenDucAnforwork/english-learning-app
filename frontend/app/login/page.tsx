'use client';

import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Login() {
  const { user, loading, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Hàm xử lý đăng nhập thành công
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      setToken(data.access_token); // lưu token và trigger fetch user
      router.push('/'); // chuyển hướng về trang chủ
    } catch (error) {
      alert('❌ Incorrect email or password');
      console.error(error);
    }
  };

  return (
    <div>
      <AuthForm type="login" />
      <div className="text-center mt-4">
        <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
