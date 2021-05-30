const axios = require('axios');
export class Network {
  constructor() {
    
  }
  async fetchAllData(){
    let response=await axios.get("/api/json");
    return response.data;
  }
  async fetchRequestedData(config){
    let response;
    switch(config.type){
      case "list":
        response=await axios.get(`/api/json/list/${config.params.count}/${config.params.currentPage}/${(config.params.sortcol)?config.params.sortcol:"name"}/${(config.params.sort)?config.params.sort:"asc"}`);
        break;
      case "search":
        let q="?"
        for (const col in config.params.queries) {
          if (Object.prototype.hasOwnProperty.call(config.params.queries, col)) {
            const query = config.params.queries[col];
            if(query!="")
              q+=col+"="+query+"&";
          }
        }
        
        if(q.lastIndexOf("&")==q.length-1)
          q=q.substring(0,q.length-1);
        response=await axios.get(`/api/json/list/${config.params.count}/${config.params.currentPage}/${(config.params.sortcol)?config.params.sortcol:"name"}/${(config.params.sort)?config.params.sort:"asc"}${q}`);
        break;
    }
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