import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import EditArticleModal from './EditArticleModal';

const ManageArticles = () => {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState('articles'); // Track which content type is selected

  useEffect(() => {
    fetchContent();
  }, [selectedTab]);

  const fetchContent = async () => {
    const collectionName = selectedTab === 'articles' ? 'articles' : selectedTab === 'news' ? 'news' : 'poetry';
    const contentCollection = collection(db, collectionName);
    const contentDocs = await getDocs(contentCollection);
    setContent(contentDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    const collectionName = selectedTab === 'articles' ? 'articles' : selectedTab === 'news' ? 'news' : 'poetry';
    await deleteDoc(doc(db, collectionName, id));
    setContent(content.filter(item => item.id !== id));
    toast.error(`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} deleted successfully!`);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Manage {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h2>
      <div className="mb-2">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        {/* Tab Selection */}
        <button onClick={() => setSelectedTab('articles')} className={`p-2 ${selectedTab === 'articles' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Articles</button>
        <button onClick={() => setSelectedTab('news')} className={`p-2 ${selectedTab === 'news' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>News</button>
        <button onClick={() => setSelectedTab('poetry')} className={`p-2 ${selectedTab === 'poetry' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Poetry</button>
      </div>
      <ul>
        {content.filter(item => item.date === date).map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.title} ({item.date}) - Posted by: {item.postedBy}</span>
            <div>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-1 mr-2">Delete</button>
              <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white p-1">Edit</button>
            </div>
          </li>
        ))}
      </ul>

      <EditArticleModal
        isOpen={isEditing} 
        onClose={closeEditModal} 
        article={selectedItem} 
        contentType={selectedTab} // Pass the content type to the EditArticleModal
      />
      <ToastContainer />
    </div>
  );
};

export default ManageArticles;
