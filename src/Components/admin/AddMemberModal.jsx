import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const AddMemberModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'writers'), {
        name,
        instagram,
        articlesWritten: 0,
      });
      toast.success('New member added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add member');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold">Add New Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2"
              required
            />
          </div>
          <div className="mb-2">
            <label>Instagram:</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="border p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
