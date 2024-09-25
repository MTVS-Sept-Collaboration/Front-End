import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token && router.pathname !== '/login') {
      router.push('/login');

    }
  }, [router]);
  return <>{children}</>;
};

export default AuthProvider;