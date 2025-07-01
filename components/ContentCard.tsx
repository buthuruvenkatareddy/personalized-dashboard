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
      className="border rounded-lg shadow-md hover:shadow-xl transition bg-white dark:bg-gray-800 relative cursor-grab flex flex-col justify-between h-[420px] p-4"
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
        <img
          src={article.urlToImage || article.Poster}
          alt="content"
          className="w-full h-48 object-cover rounded mb-3"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-base font-semibold mb-1 line-clamp-2">
          {article.title || article.Title || article.name}
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
          {article.description || article.overview || article.Plot || 'No description available'}
        </p>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 text-sm mt-auto"
          >
            Read More →
          </a>
        )}
      </div>

      {/* Favorite Toggle */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 px-2 py-1 rounded ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
        }`}
        aria-label="Toggle favorite"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </motion.div>
  );
}
