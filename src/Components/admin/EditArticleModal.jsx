import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; 
import { doc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

const EditArticleModal = ({ isOpen, onClose, article, contentType }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [date, setDate] = useState("");
  const [postedBy, setPostedBy] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setDate(article.date);
      setPostedBy(article.postedBy);
    }
  }, [article]);

  const handleEditContent = (index, field, value) => {
    const newContent = content.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setContent(newContent);
  };

  const handleRemoveContent = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleAddContent = () => {
    setContent([...content, { type: "heading", text: "" }]);
  };

  const handleImageUpload = async (index, file) => {
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        handleEditContent(index, 'text', url); 
        toast.success('Image uploaded successfully!'); 
      } catch (error) {
        console.error('Error uploading image: ', error);
        toast.error('Failed to upload image.');
      }
    }
  };

  const handleEdit = async () => {
    const collectionName = contentType === 'articles' ? 'articles' : contentType === 'news' ? 'news' : 'poetry';
    const articleRef = doc(db, collectionName, article.id);
    
    try {
      await updateDoc(articleRef, { title, content, date, postedBy });
      toast.success(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} updated successfully!`);
      onClose();
    } catch (error) {
      console.error("Error updating article: ", error);
      toast.error("Failed to update article.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full max-h-[90%] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Edit {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</h2>
        <div className="mb-4">
          <label className="block">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {content.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <select
              value={item.type}
              onChange={(e) => handleEditContent(index, "type", e.target.value)}
              className="border p-2 mr-2 w-1/3"
            >
              <option value="heading">Heading</option>
              <option value="subheading">Subheading</option>
              <option value="paragraph">Paragraph</option>
              <option value="image">Image</option>
              <option value="list">List</option>
            </select>

            {item.type === "image" ? (
              <>
                <input
                  type="text"
                  value={item.text}
                  readOnly
                  placeholder="Image URL"
                  className="border p-2 w-2/3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])} 
                  className="border p-2 w-1/3"
                />
              </>
            ) : (
              <input
                type="text"
                value={item.text}
                onChange={(e) =>
                  handleEditContent(index, "text", e.target.value)
                }
                className="border p-2 w-2/3"
              />
            )}
            <button
              type="button"
              onClick={() => handleRemoveContent(index)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContent}
          className="bg-blue-500 text-white p-2 mb-4"
        >
          Add Content
        </button>
        <div className="mb-4">
          <label className="block">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Posted By:</label>
          <input
            type="text"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleEdit}
            className="bg-green-500 text-white p-2 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 p-2"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditArticleModal;
