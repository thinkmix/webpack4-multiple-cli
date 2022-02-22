const $ = require('jquery');
const buildConfig = require('../../config');

/**
 *@describe http请求
 *@method {String} 请求方式
 *@url {String} 接口地址
 *@params {Object} 对应接口参数
 **/
function _http (method = 'post', url, params = '', cb) {
  $.ajax({
    type: method,
    url: buildConfig.build.baseUrl + url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'token': '',
    },
    data: params,
    dataType: 'json',
    timeout: 30 * 1000,
    async: true,
    success: function (res) {
      cb(res);
    },
  });
}

export default {
  /**
   * @description 获取新闻列表（首页）
   */
  getNewsList ({ params, complete }) {
    return _http('get', '/news/query', params, complete);
  },
};
