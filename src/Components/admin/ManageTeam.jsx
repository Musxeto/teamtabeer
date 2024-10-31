import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import AddMemberModal from "./AddMemberModal";
import "react-toastify/dist/ReactToastify.css";

const ManageTeam = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch team members from Firestore
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team_members"));
        const members = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Function to delete a team member
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

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="p-4 bg-tealPrimary min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-tealSecondary text-white py-2 px-4 rounded-md mb-4"
      >
        Add Team Member
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-tealPrimary">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <button
                onClick={() => handleDeleteMember(member.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding a team member */}
      {isModalOpen && (
        <AddMemberModal
          onClose={() => setIsModalOpen(false)}
          onMemberAdded={(newMember) => {
            setTeamMembers((prev) => [...prev, newMember]);
            toast.success("Team member added successfully!");
          }}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageTeam;
