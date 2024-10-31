import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "./Footer";

const HomePage = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = (e) => setFilter(e.target.value);
  const filteredDates = dates.filter((date) => date.includes(filter));

  const fetchDates = async () => {
    try {
      const collectionName = "dates"; // Only "articles" needed
      const querySnapshot = await getDocs(collection(db, collectionName));
      const allDates = querySnapshot.docs.map((doc) => doc.data().date);

      const uniqueDates = [...new Set(allDates)].sort(
        (a, b) => new Date(b) - new Date(a)
      );
      setDates(uniqueDates);
    } catch (error) {
      console.error("Error fetching dates: ", error);
    }
  };

  useEffect(() => {
    fetchDates(); // Fetch dates on component mount
  }, []);

  return (
    <>
      <div className="min-h-screen bg-tealPrimary p-6 font-sans font-light">
        <Header />
        <div className="max-w-3xl mx-auto">
          {/* Date Filter */}
          <div className="flex items-center mb-6 space-x-4">
            <label htmlFor="dateFilter" className="text-lg text-gray-300">
              Filter by Date:
            </label>
            <input
              id="dateFilter"
              type="date"
              value={filter}
              placeholder="Select a Date"
              onChange={handleFilterChange}
              className="border-b border-tealSecondary text-gray-100 bg-tealPrimary focus:outline-none focus:border-tealSecondary text-lg placeholder-gray-400"
            />
          </div>

          {/* Display Filtered Dates */}
          <ul className="space-y-2">
            {filteredDates.map((date, index) => (
              <li
                key={index}
                className="p-2 text-left text-white text-lg cursor-pointer rounded-md hover:bg-tealSecondary transition duration-300 ease-in-out"
                onClick={() => navigate(`/articles/articles/${date}`)}
              >
                {date}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
