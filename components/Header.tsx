import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useDebouncedCallback } from '../utils/debounce';
import { fetchNews } from '../redux/slices/newsSlice';
import { fetchMovies } from '../redux/slices/moviesSlice';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    dispatch(fetchNews(value));
    dispatch(fetchMovies(value));
  }, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search news or movies..."
        aria-label="Search for news or movies"
        className="border px-3 py-2 rounded w-1/2 dark:bg-gray-800 dark:text-white"
      />
      <ThemeToggle />
    </header>
  );
}
