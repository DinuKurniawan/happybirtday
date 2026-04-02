import { useState, useEffect } from 'react';
import BirthdayPage from './components/BirthdayPage';
import AdminPanel from './admin/AdminPanel';
import { BirthdayData, loadBirthdayData, parseShareData, saveBirthdayData } from './utils';
import './styles/global.css';

function App() {
  const [data, setData] = useState<BirthdayData>(loadBirthdayData());
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check URL for admin mode
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('data');

    if (sharedData) {
      const parsed = parseShareData(sharedData);
      if (parsed) {
        setData((prev) => ({ ...prev, ...parsed }));
      }
    }

    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleSave = (newData: BirthdayData) => {
    saveBirthdayData(newData);
    setData(newData);
    setIsAdmin(false);
    // Remove admin param from URL
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleBack = () => {
    setIsAdmin(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  // Listen for admin key combination (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {isAdmin ? (
        <AdminPanel data={data} onSave={handleSave} onBack={handleBack} />
      ) : (
        <BirthdayPage data={data} />
      )}
    </>
  );
}

export default App;
