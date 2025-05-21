import { useState } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateSoftware() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = (level) => {
    setAccessLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleCreate = async () => {
    if (!name || !description || accessLevels.length === 0) {
      toast.error('All fields required');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/software', {
        name,
        description,
        accessLevels
      }, { withCredentials: true });

      toast.success('Software created');
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch {
      toast.error('Failed to create software');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Create Software</h2>
          <InputField label="Name" value={name} onChange={e => setName(e.target.value)} />
          <InputField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <div className="mb-4">
            <label className="block font-medium mb-2">Access Levels</label>
            {['Read', 'Write', 'Admin'].map(level => (
              <label key={level} className="block">
                <input
                  type="checkbox"
                  checked={accessLevels.includes(level)}
                  onChange={() => handleCheckbox(level)}
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>
          <Button text={loading ? 'Creating...' : 'Create'} onClick={handleCreate} disabled={loading} />
        </div>
      </div>
    </>
  );
}
