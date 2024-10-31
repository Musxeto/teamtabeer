import React, { useState } from 'react';
import { auth } from '../../firebase';
import { updatePassword, updateEmail, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const Settings = () => {
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [password, setPassword] = useState('');

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleEmailUpdate = async () => {
    try {
      const user = auth.currentUser;
      await updateEmail(user, email);
      toast.success('Email updated successfully');
      setShowEmailModal(false);
    } catch (error) {
      toast.error('Error updating email: ' + error.message);
      console.log(error.message);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const user = auth.currentUser;
      await updatePassword(user, password);
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
    } catch (error) {
      toast.error('Error updating password: ' + error.message);
      console.error('Error updating password: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out: ' + error.message);
      console.error('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Settings</h2>
      
      {/* Buttons to open modals */}
      <button onClick={() => setShowEmailModal(true)} className="bg-blue-500 text-white p-2 mt-2">
        Change Email
      </button>
      <button onClick={() => setShowPasswordModal(true)} className="bg-blue-500 text-white p-2 mt-2 ml-2">
        Change Password
      </button>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2 ml-2">
        Logout
      </button>

      {/* Change Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h3 className="text-lg font-bold mb-4">Change Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter new email"
            />
            <button onClick={handleEmailUpdate} className="bg-blue-500 text-white p-2">
              Update Email
            </button>
            <button onClick={() => setShowEmailModal(false)} className="bg-red-500 text-white p-2 ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter new password"
            />
            <button onClick={handlePasswordUpdate} className="bg-blue-500 text-white p-2">
              Update Password
            </button>
            <button onClick={() => setShowPasswordModal(false)} className="bg-red-500 text-white p-2 ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Settings;
