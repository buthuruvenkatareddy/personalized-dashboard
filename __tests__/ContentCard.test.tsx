import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ContentCard from '../components/ContentCard';

const mockArticle = {
  title: 'Test News Article',
  description: 'This is a test description.',
  url: 'https://example.com',
};

describe('ContentCard Component', () => {
  it('renders title and description', () => {
    render(
      <Provider store={store}>
        <ContentCard article={mockArticle} />
      </Provider>
    );

    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('renders read more link', () => {
    render(
      <Provider store={store}>
        <ContentCard article={mockArticle} />
      </Provider>
    );

    const link = screen.getByText('Read More →');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
