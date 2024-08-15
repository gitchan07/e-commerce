// /pages/access-denied.js
import Link from 'next/link';

const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You do not have permission to view this page.</p>
            <Link href="/">
                <a className="text-blue-500 hover:underline">Go to Home</a>
            </Link>
        </div>
    );
};

export default AccessDenied;
