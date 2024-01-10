import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from 'react-loader-spinner';

import s from './App.module.scss';
import API from 'api/pixAPI';

import { status } from 'tools';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    searchQuery: null,
    modalInfo: null,
    showModal: false,
    data: [],
    status: 'init',
    page: 1,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { state } = this;
    if (
      prevState.searchQuery !== state.searchQuery ||
      state.page !== prevState.page
    ) {
      this.setState({ status: status.PENDING });
      try {
        const data = await API.getPhotosAxios(state.searchQuery, state.page);
        this.setState(prevState => ({
          data: [...prevState.data, ...data.results],
          status: status.RESPONSE,
        }));
        this.notification(data);
      } catch (error) {
        toast.error(error.message);
        this.setState({ status: status.REJECT });
      }
    }
  }

  notification = ({ total, results }) => {
    if (total % 12 === results.length && results.length !== 0) {
      toast.warn(`We're sorry, but you've reached the end of search results.`);
      this.setState({ status: status.REJECT });
    }
    if (total === 0) {
      toast.warn(`We're sorry, but we can't find anything by yours request.`);
      this.setState({ status: status.REJECT });
    }
  };

  handleSubmitForm = searchQuery => {
    this.setState({ searchQuery: searchQuery, page: 1, data: [] });
  };

  handleNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleTogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = modalInfo => {
    this.setState({ modalInfo });
    this.handleTogleModal();
  };

  render() {
    const { status } = this.state;

    return (
      <div className={s.appContainer}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery data={this.state.data} onClick={this.handleOpenModal} />

        {status !== 'reject' && (
          <div className={s.buttonWrapper}>
            {status === 'response' && <Button onClick={this.handleNextPage} />}
            {status === 'pending' && <Audio />}
          </div>
        )}
        {this.state.showModal && (
          <Modal info={this.state.modalInfo} onClick={this.handleTogleModal} />
        )}
        <ToastContainer autoClose={3500} />
      </div>
    );
  }
}
