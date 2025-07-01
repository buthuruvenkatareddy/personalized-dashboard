import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchNews } from '../redux/slices/newsSlice';
import { fetchMovies } from '../redux/slices/moviesSlice';
import ContentCard from '../components/ContentCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { articles } = useTypedSelector((state) => state.news);
  const { movies } = useTypedSelector((state) => state.movies);
  const { items: favorites } = useTypedSelector((state) => state.favorites);
  const { categories } = useTypedSelector((state) => state.preferences);

  // Search state is lifted up here
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedArticles, setDraggedArticles] = useState<any[]>(articles);

  // Fetch news & movies on search or categories change
  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(fetchNews(searchTerm));
      dispatch(fetchMovies(searchTerm));
    } else {
      dispatch(fetchNews(categories));
      dispatch(fetchMovies('superman'));
    }
  }, [dispatch, searchTerm, categories]);

  // Update local drag state when new articles come in
  useEffect(() => {
    setDraggedArticles(articles);
  }, [articles]);

  const handleDragEnd = (fromIndex: number, y: number) => {
    const toIndex = Math.floor(fromIndex + y / 100);
    if (toIndex === fromIndex || toIndex < 0 || toIndex >= draggedArticles.length) return;

    const updated = [...draggedArticles];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setDraggedArticles(updated);
  };

  return (
    <div className="flex min-h-screen bg-blue-100 dark:bg-[#181e2a] text-black dark:text-white">
      <Sidebar />

      <main className="flex-1 px-2 sm:px-6 py-8">
        {/* Hero Branding */}
        <header className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 dark:text-cyan-300 mb-2 tracking-tight drop-shadow-lg">
            Welcome to the Ultimate Contest & News Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-700 dark:text-cyan-200 mb-3 font-semibold">
            Your one-stop hub for contests, trending news, and entertainment. Discover, search, and personalize your experience—all in a bold, modern dashboard built just for you.
          </p>
          <img src="/logo.png" alt="Contest Dashboard Logo" className="w-12 h-12 mx-auto mb-2 rounded-full shadow bg-white/80 object-contain" />
          <h1 className="font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 text-transparent bg-clip-text drop-shadow-lg text-4xl md:text-5xl">
            Contest Dashboard
          </h1>
          <h2 className="font-bold text-lg md:text-2xl text-blue-900 dark:text-cyan-200 uppercase tracking-wide mb-2 mt-2">
            Your Trusted Source for News, Movies & More
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-blue-800 dark:text-cyan-200 mt-1 mb-2 font-semibold">
            Discover trending contests, the latest news, and entertainment—all in one place. Personalize your experience, search for your favorite topics, and keep your interests organized with ease.
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-700 dark:text-gray-300 mt-2 mb-2 font-medium">
            Discover the latest headlines, trending movies, and your favorite picks—all in one place. Stay informed, entertained, and inspired every day with a dashboard designed for you.
          </p>
          <div className="max-w-3xl mx-auto mt-3 mb-2">
            <p className="text-base md:text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-300">Why use this dashboard?</span> <br />
              • Instantly access the latest news and contest updates, tailored to your interests.<br />
              • Discover handpicked movie recommendations and trending topics.<br />
              • Save your favorites for quick access anytime.<br />
              • Enjoy a beautiful, fast, and distraction-free experience—on any device.
            </p>
            <p className="text-base md:text-lg text-blue-600 dark:text-cyan-200">
              <span className="font-semibold">Get started by searching for your favorite topics above, or simply explore the curated content below!</span>
            </p>
          </div>
          <img src="/hero-illustration.svg.svg" alt="Dashboard Illustration" className="mx-auto my-2 w-full max-w-[100px]" />
        </header>

        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-6xl">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} inputClassName="w-full max-w-6xl text-2xl py-5 px-10 rounded-2xl border-2 border-blue-400 focus:border-cyan-500 shadow-2xl" />
          </div>
        </div>

        {/* 📰 NEWS */}
        <section>
          <h2 className="mb-2 text-3xl md:text-4xl font-black text-blue-800 dark:text-cyan-300 tracking-tight flex items-center gap-3 uppercase">
            <span className="text-4xl">📰</span> Top Stories For You
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl font-semibold">
            Breaking news, trending topics, and personalized updates—curated just for you. Dive into the latest headlines and stay informed like never before.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {draggedArticles.map((article, i) => (
              <div
                key={i}
                className="min-h-[320px] max-h-[420px] flex flex-col justify-between bg-white/90 dark:bg-[#232b3b]/90 rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-200"
              >
                <ContentCard
                  article={article}
                  index={i}
                  onDragEnd={handleDragEnd}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 🎬 MOVIES */}
        <section>
          <h2 className="my-6">Recommended Movies</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {movies.map((movie, i) => (
              <ContentCard key={i} article={movie} />
            ))}
          </div>
        </section>

        {/* ❤️ FAVORITES */}
        <section>
          <h2 className="my-6">Favorites</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {favorites.length === 0 ? (
              <p className="text-gray-500">No favorites yet. Click the ❤️ on any card to add.</p>
            ) : (
              favorites.map((fav, i) => (
                <ContentCard key={i} article={fav} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
