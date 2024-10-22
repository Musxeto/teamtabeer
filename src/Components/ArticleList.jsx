import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { db } from "../firebase"; // Adjust the import path as necessary
import { collection, query, where, getDocs } from "firebase/firestore";
import Footer from "./Footer";

const ArticleList = () => {
  const { date, selectedTab } = useParams(); // Fetch selectedTab from params
  const [articles, setArticles] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  // Fetch articles for the selected date and tab
  const fetchArticles = async () => {
    try {
      const articlesRef = collection(
        db,
        selectedTab === "articles"
          ? "articles"
          : selectedTab === "news"
          ? "news"
          : "poetry"
      );
      const q = query(articlesRef, where("date", "==", date));
      const querySnapshot = await getDocs(q);

      const fetchedArticles = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        expanded: false,
      }));

      console.log(fetchedArticles); // Log fetched articles
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const toggleExpand = (index) => {
    setArticles(
      articles.map((article, i) =>
        i === index ? { ...article, expanded: !article.expanded } : article
      )
    );
  };

  useEffect(() => {
    fetchArticles();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, [date, selectedTab]);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0)).join(". ") + ".";
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
  return (
    <>
      <div className="min-h-screen bg-white p-4 md:p-6 font-garamond">
        <Header />
        <div className="text-left my-6">
          <h2 className="text-lg sm:text-xl md:text-2xl text-black">{date}</h2>
        </div>

        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <ul className="list-disc pl-5">
            {articles.map((article, index) => (
              <li key={index} className="mb-4">
                <h3
                  className="sm:text-lg md:text-xl cursor-pointer hover:text-gray-600"
                  onClick={() => toggleExpand(index)}
                >
                  {article.title}
                </h3>
                {article.expanded && (
                  <div className="text-gray-700 mt-1">
                    {/* Move the "posted by" information inside the expanded section */}

                    {Array.isArray(article.content) &&
                    article.content.length > 0 ? (
                      article.content.map((block, blockIndex) => {
                        if (block.type === "heading") {
                          return (
                            <h4 key={blockIndex} className="font-bold mt-4">
                              {block.text}
                            </h4>
                          );
                        }
                        if (block.type === "subheading") {
                          return (
                            <h5 key={blockIndex} className="font-bold mt-4">
                              {block.text}
                            </h5>
                          );
                        }
                        if (block.type === "paragraph") {
                          return (
                            <p key={blockIndex} className="mt-2">
                              {block.text}
                            </p>
                          );
                        }
                        if (block.type === "image") {
                          return (
                            <img
                              key={blockIndex}
                              src={block.text}
                              alt={block.alt}
                              className="my-2 w-48"
                            />
                          );
                        }
                        if (block.type === "stanza") {
                          return (
                            <div key={blockIndex} className="my-2 italic">
                              {block.text.split("\n").map((line, lineIndex) => (
                                <p key={lineIndex} className="mt-1">
                                  {line}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        if (block.type === "list") {
                          return (
                            <ul key={blockIndex} className="list-disc pl-5">
                              {Array.isArray(block.items) &&
                                block.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="mt-1">
                                    {item}
                                  </li>
                                ))}
                            </ul>
                          );
                        }

                        if (block.type === "quote") {
                          return (
                            <blockquote
                              key={blockIndex}
                              className="border-l-4 border-gray-300 pl-4 italic my-2"
                            >
                              {block.text}
                            </blockquote>
                          );
                        }
                        return null; // Fallback for unknown types
                      })
                    ) : (
                      <p>No content available for this article.</p> // Handle case with no content
                    )}
                    {article.postedBy && (
                      <p className="italic text-sm text-gray-500">
                        Posted by: {getInitials(article.postedBy)}
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg text-black">{currentTime}</div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
