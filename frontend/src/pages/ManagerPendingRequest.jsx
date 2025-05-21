import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/requests/pending', { withCredentials: true })
      .then(res => setRequests(res.data))
      .catch(() => toast.error('Failed to load requests'));
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/${id}`, { status }, { withCredentials: true });
      toast.success(`Request ${status.toLowerCase()}`);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch {
      toast.error('Failed to update request');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-white p-4 rounded shadow">
              <p><strong>User:</strong> {req.user.username}</p>
              <p><strong>Software:</strong> {req.software.name}</p>
              <p><strong>Access:</strong> {req.accessType}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <div className="mt-2 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleAction(req.id, 'Approved')}>Approve</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleAction(req.id, 'Rejected')}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
