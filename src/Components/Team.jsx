import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Team = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersCollection = collection(db, "writers");
        const writerDocs = await getDocs(writersCollection);
        setWriters(writerDocs.docs.map((doc) => doc.data()));
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load writers");
        setLoading(false);
      }
    };

    fetchWriters();
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0)).join(". ") + ".";
  };

  return (
    <div className="min-h-screen bg-tealPrimary p-4 md:p-6 font-garamond font-light">
      <Header />
      <p className="text-center">
        written by the youth, curated by IzNE & Abbas, presented by Mustafa
      </p>
      <br />
      <h2 className="writers-heading">Writers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {writers.map((writer, index) => (
            <li key={index} className="mb-4">
              <p className="flex justify-between text-lg">
                <span>{getInitials(writer.name)}</span>
                <span>{writer.articlesWritten}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center my-4">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScGj8xQdWfzxuVjxt4_5u3pHYoA_tOYwV6Aj93jyOaBJqxt1A/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          JOIN. INKISHAAF.
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Team;
