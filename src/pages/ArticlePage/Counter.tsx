import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export const Counter = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  const handlePlus = () => {
    setCurrentNumber(prevNumber => prevNumber + 1);
  };

  const handleMinus = () => {
    setCurrentNumber(prevNumber => prevNumber - 1);
  };

  return (
    <div className="mt-8 flex flex-row items-center justify-center gap-4">
      <button onClick={handleMinus}><Minus /></button>
      <span className="text-xl font-bold">{currentNumber}</span>
      <button onClick={handlePlus}><Plus /></button>
    </div>
  );
};