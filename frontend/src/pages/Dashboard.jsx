import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/check-auth', {
                    withCredentials: true // ✅ Send HTTP-only cookie
                });
                setData(response.data);
            } catch (err) {
                console.error('Error fetching protected data:', err);
                setError('Unauthorized. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        fetchProtectedData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    if (error) return <div>{error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <pre className="bg-white p-4 rounded shadow">{JSON.stringify(data, null, 2)}</pre>
            <button
                onClick={handleLogout}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}
