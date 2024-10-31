import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import AddMemberModal from "./AddMemberModal";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ManageTeam = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "team_members"));
        const members = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, "team_members", id));
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
      toast.success("Team member deleted successfully!");
    } catch (error) {
      console.error("Error deleting team member: ", error);
      toast.error("Failed to delete team member.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMemberAdded = (newMember) => {
    setTeamMembers((prevMembers) => [...prevMembers, newMember]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-tealPrimary">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="m min-h-screen mx-auto p-4">

      <h1 className="text-2xl font-bold text-white mb-4">Manage Team Members</h1>
      <button
        onClick={handleOpenModal}
        className="mb-4 px-4 py-2 bg-tealSecondary text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Team Member
      </button>

      <ul className="space-y-2">
        {teamMembers.map((member) => (
          <li key={member.id} className="flex justify-between items-center p-4 bg-white rounded-md shadow hover:shadow-lg transition duration-200">
            <div>
              <span className="text-lg font-medium">{member.name} - </span>
              <span className="text-gray-600">{member.role}</span>
            </div>
            <button
              onClick={() => handleDeleteMember(member.id)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <AddMemberModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onMemberAdded={handleMemberAdded} 
      />
    </div>
  );
};

export default ManageTeam;
