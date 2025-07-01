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
}
;
