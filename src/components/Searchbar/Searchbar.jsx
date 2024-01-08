import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Please Enter search query!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.bar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
