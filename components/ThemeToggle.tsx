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
      className="transition-all duration-200 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:scale-110 flex items-center justify-center text-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="transition-all duration-200">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
