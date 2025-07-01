import axios from 'axios';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export const fetchMoviesFromOMDB = async (search: string = 'batman') => {
  const response = await axios.get('https://www.omdbapi.com/', {
    params: {
      s: search,
      apikey: OMDB_API_KEY,
    },
  });

  return response.data.Search || [];
};
export const fetchMockSocialFeed = () => {
  return [
    {
      id: 1,
      username: 'elonmusk',
      content: 'Starship launch was incredible! 🚀',
      timestamp: '2h ago',
    },
    {
      id: 2,
      username: 'techie99',
      content: 'Just built my first AI model. #ML',
      timestamp: '1h ago',
    },
    {
      id: 3,
      username: 'devgal',
      content: 'Learning React + Redux is 🔥',
      timestamp: '30m ago',
    },
  ];
};
