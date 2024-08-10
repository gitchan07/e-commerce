// UserComponent/UserProfile.jsx
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    // Fetch user profile from an API or database
    const fetchUser = async () => {
      const data = await fetch('/api/user').then((res) => res.json());
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    // Save user profile to an API or database
    console.log('User profile saved:', user);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Address</label>
        <textarea
          name="address"
          value={user.address}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
      >
        Save Profile
      </button>
    </div>
  );
};

export default UserProfile;
