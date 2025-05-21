import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: You can check session on mount by hitting a protected endpoint
    axios.get('http://localhost:5000/api/check-auth', { withCredentials: true })
      .then(() => navigate('/dashboard'))
      .catch(() => {}); // Not logged in
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/login',
        { email, password },
        { withCredentials: true } // Important for sending/receiving cookies
      );

      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed!';
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
            text={loading ? 'Logging in...' : 'Login'}
            onClick={handleLogin}
            disabled={loading || !email || !password}
          />
        </div>
      </div>
    </>
  );
}
