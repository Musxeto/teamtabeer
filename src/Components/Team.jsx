import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { FaSpinner } from "react-icons/fa";

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team_members"));
        const members = querySnapshot.docs.map((doc) => doc.data());
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="text-white min-h-screen bg-tealPrimary flex justify-center items-center text-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tealPrimary p-4 md:p-6 font-garamond font-light">
      <Header />

      <section className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white">T A B E E R</h1>
        <h2 className="text-3xl text-gray-200 mt-2">Charity Organization</h2>
        <h3 className="text-xl text-gray-300 mt-1">‘اقبال کے خواب کی تعبیر’</h3>
        <p className="mt-4 text-lg text-gray-300">
          Pioneering Sustainability, Moulding Tomorrow.
        </p>
        <p className="mt-2 text-md text-gray-300">
          Email: teamtabeerofficial@gmail.com
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={member.imageUrl} // Assume you have an image URL in your team member data
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-tealPrimary">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};

export default Team;
