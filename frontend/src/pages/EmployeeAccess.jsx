import { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [software, setSoftware] = useState('');
  const [accessType, setAccessType] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/software')
      .then(res => setSoftwareList(res.data))
      .catch(() => toast.error('Failed to load software list'));
  }, []);

  const handleSubmit = async () => {
    if (!software || !accessType || !reason) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/requests', {
        software,
        accessType,
        reason
      }, { withCredentials: true });

      toast.success('Request submitted');
      setSoftware('');
      setAccessType('');
      setReason('');
    } catch {
      toast.error('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Request Software Access</h2>
          <label className="block mb-2">Select Software</label>
          <select value={software} onChange={e => setSoftware(e.target.value)} className="mb-4 w-full border p-2 rounded">
            <option value="">Select</option>
            {softwareList.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <label className="block mb-2">Access Type</label>
          <select value={accessType} onChange={e => setAccessType(e.target.value)} className="mb-4 w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Admin">Admin</option>
          </select>
          <InputField label="Reason" value={reason} onChange={e => setReason(e.target.value)} />
          <Button text={loading ? 'Submitting...' : 'Submit'} onClick={handleSubmit} disabled={loading} />
        </div>
      </div>
    </>
  );
}
