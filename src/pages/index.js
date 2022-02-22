require('../public.js');
require('./css/index.scss');

import api from '../api/';

$(document).ready(function () {
  api.getNewsList({
    params: {

    },
    complete (res) {

    },
  });
});
