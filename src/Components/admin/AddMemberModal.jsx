import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddMemberModal = ({ isOpen, onClose, onMemberAdded }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const storageRef = ref(storage, `team_members/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const newMember = { name, role, imageUrl };
      const docRef = await addDoc(collection(db, "team_members"), newMember);
      onMemberAdded({ id: docRef.id, ...newMember });
      toast.success("Team member added successfully!");

      onClose(); 
    } catch (error) {
      console.error("Error adding team member: ", error);
      toast.error("Failed to add team member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Team Member"
      className="max-w-lg mx-auto rounded-lg bg-white p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-tealPrimary mb-4">Add Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-tealPrimary"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-tealPrimary"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tealPrimary"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 flex items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Add Member"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </Modal>
  );
};

export default AddMemberModal;
