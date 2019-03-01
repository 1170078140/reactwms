import axios from 'axios';
import {message} from 'antd';

const baseUrl = 'http://10.108.2.56';
const api = {
  post(url,params,success, failure){
    axios.post(baseUrl+url, params)
    .then(function (res) {
      // token过期
      if(res.data.repCode === '4002'){
        message.error(res.data.repMsg, 1, function(){
          sessionStorage.clear();
          window.location.reload();
        })
        
      }else{
        if(success){
          success(res)
        }
      }
    })
    .catch(function (err) {
      if(failure){
        failure(err)
      }
    });

  }
}

export default api;