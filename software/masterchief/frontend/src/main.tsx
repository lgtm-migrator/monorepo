import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/not-found';
import DadPage from './pages/dad';
import FeedPage from './pages/feed/feed';
import { ROUTE_CREATE_BLOG, ROUTE_DAD, ROUTE_FEED } from './constants';
import CreateBlogPage from './pages/create-blog';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path={ROUTE_FEED} element={<FeedPage />} />
          <Route path={ROUTE_DAD} element={<DadPage />}></Route>
          {/*<Route path={ROUTE_CREATE_BLOG} element={<CreateBlogPage />}></Route>*/}
          <Route path="/" element={<App />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
);