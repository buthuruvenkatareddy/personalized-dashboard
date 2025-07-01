
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategories } from '../redux/slices/preferencesSlice';

const categoriesList = ['technology', 'sports', 'business', 'health', 'entertainment'];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.preferences);

  const toggleCategory = (category: string) => {
    const updated = categories.includes(category)
      ? categories.filter((cat) => cat !== category)
      : [...categories, category];
    dispatch(setCategories(updated));
  };

  return (
    <aside className="w-72 bg-white/90 dark:bg-gray-900/90 p-6 shadow-xl sticky top-0 h-screen border-r border-gray-100 dark:border-gray-800 flex flex-col items-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-blue-800 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mb-2 select-none">
          <span>CD</span>
        </div>
        <span className="text-4xl font-extrabold tracking-wide text-blue-700 dark:text-blue-300 drop-shadow-lg mb-1 uppercase">Contest Dashboard</span>
        <style jsx>{`
          .sidebar-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: #2563eb;
            letter-spacing: 0.04em;
            text-shadow: 0 2px 8px rgba(37,99,235,0.10);
          }
          .dark .sidebar-title {
            color: #60a5fa;
          }
        `}</style>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Your Personalized Contest Hub</span>
      </div>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Categories</h2>
      <ul className="space-y-2 w-full">
        {categoriesList.map((category) => (
          <li
            key={category}
            onClick={() => toggleCategory(category)}
            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer text-center font-medium transition-all duration-150 select-none shadow-sm border border-transparent hover:scale-105 hover:shadow-md ${
              categories.includes(category)
                ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
            }`}
          >
            <span>
              {category === 'technology' && '💻'}
              {category === 'sports' && '🏅'}
              {category === 'business' && '💼'}
              {category === 'health' && '🩺'}
              {category === 'entertainment' && '🎬'}
            </span>
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
