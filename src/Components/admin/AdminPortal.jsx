import Header from "../Header";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaPen, FaBook, FaCog, FaUsers } from "react-icons/fa";

const AdminPortal = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Header />
        <h3>Welcome</h3>
        <p>What's the vision for today?</p>
        <br />
        <ul>
          <li className="mb-2 underline">
            <Link to="/admin/new-article" className="text-black flex items-center">
              Add New Article <FaPen className="ml-2" />
            </Link>
          </li>
          <li className="mb-2 underline">
            <Link to="/admin/manage-articles" className="text-black flex items-center">
              Manage Articles <FaBook className="ml-2" />
            </Link>
          </li>
          <li className="mb-2 underline">
            <Link to="/admin/manage-team" className="text-black flex items-center">
              Manage Team <FaUsers className="ml-2" />
            </Link>
          </li>
          <li className="mb-2 underline">
            <Link to="/admin/settings" className="text-black flex items-center">
              Settings <FaCog className="ml-2" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPortal;
