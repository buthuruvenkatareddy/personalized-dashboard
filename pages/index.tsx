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

  const [draggedArticles, setDraggedArticles] = useState<any[]>(articles);

  // Fetch news & movies on load
  useEffect(() => {
    dispatch(fetchNews(categories));
    dispatch(fetchMovies('superman'));
  }, [dispatch, categories]);

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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        {/* 📰 NEWS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Personalized News</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {draggedArticles.map((article, i) => (
              <ContentCard
                key={i}
                article={article}
                index={i}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </section>

        {/* 🎬 MOVIES */}
        <section>
          <h2 className="text-2xl font-bold my-6">Recommended Movies</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {movies.map((movie, i) => (
              <ContentCard key={i} article={movie} />
            ))}
          </div>
        </section>

        {/* ❤️ FAVORITES */}
        <section>
          <h2 className="text-2xl font-bold my-6">Favorites</h2>
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
      </div>
    </div>
  );
};

export default Home;
