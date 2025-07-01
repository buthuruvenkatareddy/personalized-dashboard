import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNewsFromAPI = async (category: string = 'technology') => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      category,
      country: 'us',
      apiKey: NEWS_API_KEY,
    },
  });

  return response.data.articles || [];
}
;

