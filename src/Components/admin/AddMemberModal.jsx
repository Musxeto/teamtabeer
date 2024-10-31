import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMemberModal = ({ onClose, onMemberAdded }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMember = {
        name,
        role,
        imageUrl,
      };
      const docRef = await addDoc(collection(db, "team_members"), newMember);
      onMemberAdded({ id: docRef.id, ...newMember });
      toast.success("Team member added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding team member: ", error);
      toast.error("Failed to add team member.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-tealPrimary text-white py-2 px-4 rounded-md"
          >
            Add Member
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMemberModal;
