import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  /**
   * State
   */
  const [searchQuery, setSearchQuery] = useState('');
  /**
   * Functions
   */

  const handleChange = event => {
    const { value } = event.currentTarget;
    setSearchQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please Enter search query!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.bar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
