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
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 h-screen">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categoriesList.map((category) => (
          <li
            key={category}
            onClick={() => toggleCategory(category)}
            className={`p-2 rounded cursor-pointer ${
              categories.includes(category)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </aside>
  );
}
