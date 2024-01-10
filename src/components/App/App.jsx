import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.scss';
import API from 'api/splashAPI';

import { status_Base } from 'tools';
import { Button, Searchbar, ImageGallery, Modal } from 'components';

export const App = () => {
  const [query, setQuery] = useState('');
  const [modalInfo, setModalInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('init');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query === '') return;
    setStatus(status_Base.PENDING);
    API.getPhotosAxios(query, page)
      .then(data => {
        setData(prev => [...prev, ...data.results]);
        setStatus(status_Base.RESPONSE);
        notification(data);
      })
      .catch(error => {
        toast.error(error.message);
        setStatus(status_Base.REJECT);
      });
  }, [query, page]);

  const handleSubmitForm = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setData([]);
  };

  function notification({ total, results }) {
    if (total % 12 === results.length && results.length !== 0) {
      toast.warn(`We're sorry, but you've reached the end of search results.`);
      setStatus(status_Base.REJECT);
    }
    if (total === 0) {
      toast.warn(`We're sorry, but we can't find anything by yours request.`);
      setStatus(status_Base.REJECT);
    }
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handleTogleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleOpenModal = modalInfo => {
    setModalInfo(modalInfo);
    handleTogleModal();
  };

  return (
    <div className={s.appContainer}>
      <Searchbar onSubmit={handleSubmitForm} />
      <ImageGallery data={data} onClick={handleOpenModal} />

      {status !== 'reject' && (
        <div className={s.buttonWrapper}>
          {status === 'response' && <Button onClick={handleNextPage} />}
          {status === 'pending' && <Audio />}
        </div>
      )}
      {showModal && <Modal info={modalInfo} onClick={handleTogleModal} />}
      <ToastContainer autoClose={3500} />
    </div>
  );
};

// export class oldApp extends Component {
//   state = {
//     searchQuery: null,
//     modalInfo: null,
//     showModal: false,
//     data: [],
//     status: 'init',
//     page: 1,
//   };

//   async componentDidUpdate(prevProp, prevState) {
//     const { state } = this;
//     if (
//       prevState.searchQuery !== state.searchQuery ||
//       state.page !== prevState.page
//     ) {
//       this.setState({ status: status.PENDING });
//       try {
//         const data = await API.getPhotosAxios(state.searchQuery, state.page);
//         this.setState(prevState => ({
//           data: [...prevState.data, ...data.results],
//           status: status.RESPONSE,
//         }));
//         this.notification(data);
//       } catch (error) {
//         toast.error(error.message);
//         this.setState({ status: status.REJECT });
//       }
//     }
//   }

// notification = ({ total, results }) => {
//   if (total % 12 === results.length && results.length !== 0) {
//     toast.warn(`We're sorry, but you've reached the end of search results.`);
//     this.setState({ status: status.REJECT });
//   }
//   if (total === 0) {
//     toast.warn(`We're sorry, but we can't find anything by yours request.`);
//     this.setState({ status: status.REJECT });
//   }
// };

// handleSubmitForm = searchQuery => {
//   this.setState({ searchQuery: searchQuery, page: 1, data: [] });
// };

// handleNextPage = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

//   handleTogleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

// handleOpenModal = modalInfo => {
//   this.setState({ modalInfo });
//   this.handleTogleModal();
// };

//   render() {
//     const { status } = this.state;

//     return (
//       <div className={s.appContainer}>
//         <Searchbar onSubmit={this.handleSubmitForm} />
//         <ImageGallery data={this.state.data} onClick={this.handleOpenModal} />

//         {status !== 'reject' && (
//           <div className={s.buttonWrapper}>
//             {status === 'response' && <Button onClick={this.handleNextPage} />}
//             {status === 'pending' && <Audio />}
//           </div>
//         )}
//         {this.state.showModal && (
//           <Modal info={this.state.modalInfo} onClick={this.handleTogleModal} />
//         )}
//         <ToastContainer autoClose={3500} />
//       </div>
//     );
//   }
// }
