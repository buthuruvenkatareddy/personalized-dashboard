import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleDarkMode } from '../redux/slices/preferencesSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded text-sm dark:text-white"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
