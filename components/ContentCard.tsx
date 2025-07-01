import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';

interface ContentCardProps {
  article: any;
  index?: number;
  onDragEnd?: (index: number, y: number) => void;
}


export default function ContentCard({ article, index, onDragEnd }: ContentCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some(
    (item) =>
      item.id === article.id ||
      item.title === article.title ||
      item.Title === article.Title
  );

  const toggleFavorite = () => {
    isFavorite ? dispatch(removeFavorite(article)) : dispatch(addFavorite(article));
  };

  return (
    <motion.div
      className="card group relative cursor-grab flex flex-col justify-between h-[420px] p-0 overflow-hidden transition-transform duration-200 hover:scale-[1.025]"
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (onDragEnd && typeof index === 'number') {
          onDragEnd(index, info.point.y);
        }
      }}
    >
      {/* Image */}
      {(article.urlToImage || article.Poster) ? (
        <div className="w-full aspect-[16/9] min-h-[460px] max-h-[480px] flex items-center justify-center overflow-hidden rounded-t-xl mb-0 bg-gray-100 dark:bg-gray-800">
          <img
            src={article.urlToImage || article.Poster}
            alt="content"
            className="w-full h-full object-cover object-center"
            style={{ aspectRatio: '16/9', minHeight: 460, maxHeight: 480, display: 'block' }}
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] min-h-[460px] max-h-[480px] bg-gray-200 dark:bg-gray-700 rounded-t-xl flex items-center justify-center text-gray-500">
          <span className="text-2xl">🖼️</span>
        </div>
      )}

      {/* Content */}

      <div className="flex-1 flex flex-col justify-between px-5 py-4 overflow-hidden">
        <h2 className="text-lg font-bold mb-1 text-gray-900 dark:text-white line-clamp-2 break-words overflow-hidden">
          {article.title || article.Title || article.name}
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 mb-3 line-clamp-4 break-words overflow-hidden">
          {(article.description || article.overview || article.Plot || 'No description available').length > 160
            ? (article.description || article.overview || article.Plot || 'No description available').slice(0, 160) + '…'
            : (article.description || article.overview || article.Plot || 'No description available')}
        </p>


        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold mt-auto hover:underline hover:text-blue-800 transition"
          >
            Read More →
          </a>
        )}
      </div>

      {/* Favorite Toggle */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 border-2 border-white dark:border-gray-800 z-10 text-xl bg-white/80 dark:bg-gray-700/80 hover:scale-110 ${
          isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
        }`}
        aria-label="Toggle favorite"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </motion.div>
  );
}
