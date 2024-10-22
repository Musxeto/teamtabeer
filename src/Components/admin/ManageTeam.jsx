import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import AddMemberModal from "./AddMemberModal";
import "react-toastify/dist/ReactToastify.css";

const ManageTeam = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersCollection = collection(db, "writers");
        const writerDocs = await getDocs(writersCollection);
        setWriters(
          writerDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load team members");
        setLoading(false);
      }
    };

    fetchWriters();
  }, [isModalOpen]);

  const incrementArticles = async (id, currentCount) => {
    try {
      setLoading(true);
      const writerDoc = doc(db, "writers", id);
      await updateDoc(writerDoc, { articlesWritten: currentCount + 1 });
      setWriters(
        writers.map((writer) =>
          writer.id === id
            ? { ...writer, articlesWritten: currentCount + 1 }
            : writer
        )
      );
      toast.success("Article count updated");
    } catch (error) {
      toast.error("Failed to update article count");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Manage Team</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white p-2 mb-4"
      >
        Add New Member
      </button>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Instagram</th>
            <th className="border-b p-2 text-left">Articles Written</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {writers.map((writer) => (
            <tr key={writer.id}>
              <td className="p-2">{writer.name}</td>
              <td className="p-2">{writer.instagram}</td>
              <td className="p-2">{writer.articlesWritten}</td>
              <td className="p-2">
                <button
                  disabled={loading}
                  onClick={() =>
                    incrementArticles(writer.id, writer.articlesWritten)
                  }
                  className="bg-blue-500 text-white p-1"
                >
                  +1 Article
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

      {/* AddMemberModal to handle new member addition */}
      <AddMemberModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ManageTeam;
