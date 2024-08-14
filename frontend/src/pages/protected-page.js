// /pages/protected-page.js
import withAuth from '../hoc/withAuth';

const ProtectedPage = () => {
    return (
        <div>
            <h1>Protected Page</h1>
            <p>This page is only accessible to users with the correct role.</p>
        </div>
    );
};

export default withAuth(ProtectedPage, ['user', 'seller']);
