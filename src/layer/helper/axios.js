const axios = require('axios')

axios.interceptors.response.use(function(response) {
    return response.data
},function(error){
    return Promise.reject(error)
})

module.exports = axios