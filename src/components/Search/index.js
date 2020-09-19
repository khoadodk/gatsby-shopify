import React from 'react';
import { Input, Button } from 'components';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { search } = useLocation();
  const category = queryString.parse(search)?.c || '';

  const handleChange = e => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (category) {
      navigate(
        `/all-products?c=${encodeURIComponent(category)}&s=${encodeURIComponent(
          searchTerm
        )}`
      );
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input placeholder="Search" onChange={handleChange} value={searchTerm} />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
};
