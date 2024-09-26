import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('jwt');
      if (!token && router.pathname !== '/login') {
        router.push('/login');
      }
    };

    checkAuth();
    router.events.on('routeChangeComplete', checkAuth);

    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router]);

  return <>{children}</>;
};

export default AuthProvider;