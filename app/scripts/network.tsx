const axios = require('axios');
export class Network {
  constructor() {
    
  }
  async fetchAllData(){
    let response=await axios.get("/api/json");
    return response.data;
  }
  async uploadFile(file){
    let formData = new FormData();
    formData.append("dataupload", file);
    return axios.post("/upload-data",formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  async resetAllData(){
    return axios.delete("/api/json/reset");
  }
}