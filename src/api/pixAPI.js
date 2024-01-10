import axios from 'axios';
/* =====================================================
=============Class for work with API Servises
========================================================*/
// const proxi = {};
class ApiServise {
  constructor() {
    this.option = {
      url: 'https://api.unsplash.com/search/photos',
      headers: {
        common: {
          Authorization:
            'Client-ID 42Js-asypicJajKFLohxUiNH3swR-7YGPsUe-TDMXjA',
        },
      },
      params: {
        query: '',
        per_page: '12',
        page: 1,
        orientation: 'portrait',
      },
    };
  }

  async getPhotosAxios(value, page) {
    this.option.params.query = value;
    this.option.params.page = page || 1;
    const response = await axios(this.option);
    return response.data;
  }
}

export default new ApiServise();
