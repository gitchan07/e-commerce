import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const role = Cookies.get('role');
      const user_id = Cookies.get('user_id');

      if (!role || !allowedRoles.includes(role)) {
        router.push('/access-denied');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
