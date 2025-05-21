import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Check if already logged in using protected endpoint
    axios.get('http://localhost:5000/api/check-auth', { withCredentials: true })
      .then(() => navigate('/dashboard'))
      .catch(() => {}); // not logged in
  }, [navigate]);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/signup',
        { email, password },
        { withCredentials: true } // Send/receive cookies
      );

      toast.success(response.data.message);
      navigate('/login'); // or /dashboard if you auto-login after signup
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed!';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text={loading ? 'Signing up...' : 'Signup'}
            onClick={handleSignup}
            disabled={loading || !email || !password}
          />
        </div>
      </div>
    </>
  );
}
