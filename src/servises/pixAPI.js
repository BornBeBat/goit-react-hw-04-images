import axios from 'axios';
/* =====================================================
=============Class for work with API Servises
========================================================*/
class ApiServise {
  constructor() {
    this.option = {
      url: 'https://pixabay.com/api/',
      method: 'get',
      params: {
        key: '41071182-18ccbddfe29083241d2882ae4',
        q: '',
        image_type: 'photo',
        per_page: '12',
        orientation: 'horizontal',
        page: 1,
      },
    };
  }

  async getPhotosAxios(value, page) {
    this.option.params.q = value;
    this.option.params.page = page || 1;
    const response = await axios(this.option);
    return response.data;
  }
}

export default new ApiServise();
