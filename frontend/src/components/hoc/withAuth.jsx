import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const role = localStorage.getItem('role');
      const user_id = localStorage.getItem('user_id');

      if (!role || !allowedRoles.includes(role)) {
        router.push('/access-denied');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
