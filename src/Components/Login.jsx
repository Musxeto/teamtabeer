import React, {useState} from 'react'
import Header from './Header'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth,db } from '../firebase';
import { ToastContainer,toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      navigate('/admin')
    }catch(error){
      toast.error(error.message);
      console.error(error.message);
    }
   
  };

  return (
    <div className="min-h-screen bg-tealPrimary p-6 m-0">
    <Header />

     <div className="mb-6">
       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2" />
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mb-2" />
       <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2">Login</button>
     </div>
      <ToastContainer />
    </div>
  )
}

export default Login
