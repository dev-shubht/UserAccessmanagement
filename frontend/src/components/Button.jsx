import React from 'react';

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 text-white rounded ${disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {text}
    </button>
  );
}
