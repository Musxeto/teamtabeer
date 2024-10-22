import { FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className=" py-4 mt-6 text-center font-light">
      <div className="max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto">
        {/* <p className="mb-2">&copy; 2024 INKISHAAF. All Rights Reserved.</p> */}
        <div className="flex justify-center space-x-4">
          {/* <a 
            href="https://www.instagram.com/theinkishaaf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram />
          </a> */}
          <button 
            className="hover:text-gray-400"
            onClick={() => navigate('/team')}
          >
            Team
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
