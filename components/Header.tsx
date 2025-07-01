import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useDebouncedCallback } from '../utils/debounce';
import { fetchNews } from '../redux/slices/newsSlice';
import { fetchMovies } from '../redux/slices/moviesSlice';
import ThemeToggle from './ThemeToggle';



interface HeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  inputClassName?: string;
}

export default function Header({ searchTerm, setSearchTerm, inputClassName }: HeaderProps) {
  // No local state, just use props
  return (
    <header className="flex justify-between items-center mb-8 px-2 py-4 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md">
      <div className="relative w-2/3 md:w-1/2">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search news, movies, or contests..."
          aria-label="Search for news, movies, or contests"
          className={inputClassName || "pl-4 pr-4 py-3 w-full rounded-lg border-none bg-gray-100 dark:bg-gray-800 dark:text-white text-lg shadow-inner focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition"}
        />
      </div>
      <div className="flex items-center gap-4">
        {/* ThemeToggle removed as per user request */}
      </div>
    </header>
  );
}
