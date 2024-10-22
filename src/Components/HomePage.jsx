import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "./Footer";

const HomePage = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedTab, setSelectedTab] = useState("articles");
  const [currentTime, setCurrentTime] = useState(""); 
  const navigate = useNavigate();

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredDates = dates.filter((date) => date.includes(filter));

  const fetchDates = async () => {
    try {
      let collectionName;
      if (selectedTab === "articles") collectionName = "dates";
      if (selectedTab === "news") collectionName = "dates_news";
      if (selectedTab === "poetry") collectionName = "dates_poetry";

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

  // Function to update the current time
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}:${seconds}:${milliseconds}`);
  };

  // Start the clock when the component mounts
  useEffect(() => {
    fetchDates(); // Fetch dates on component mount or tab change
    const interval = setInterval(updateTime, 100); // Update time every 100 ms
    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedTab]);

  return (
    <>
      <div className="min-h-screen bg-tealPrimary p-4 md:p-6 font-garamond font-light">
        <Header />
        <div className="max-w-lg lg:max-w-4xl xl:max-w-6xl">
          {/* Tab Selection */}
          <div className="flex space-x-4 mb-4">
            {["articles", "news", "poetry"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`text-lg ${
                  selectedTab === tab
                    ? "text-white border-b-2 border-black"
                    : "text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className="flex items-center mb-4">
            <label htmlFor="dateFilter" className="text-lg text-white mr-2">
              DATE:
            </label>
            <input
              id="dateFilter"
              type="date"
              value={filter}
              placeholder="Select a Date"
              onChange={handleFilterChange}
              className="border-0 border-b text-white bg-tealSecondary border-gray-400 focus:outline-none focus:border-gray-600 text-lg"
            />
          </div>

          {/* Display Filtered Dates */}
          <ul className="none">
            {filteredDates.map((date, index) => (
              <li
                key={index}
                className="p-1 cursor-pointer text-white text-left text-lg"
                onClick={() => navigate(`/articles/${selectedTab}/${date}`)}
              >
                {date}
              </li>
            ))}
          </ul>

          {/* Display the current time */}
          <div className="mt-4 text-lg text-white">{currentTime}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
