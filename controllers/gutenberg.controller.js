const axios = require("axios");
const {inspect} = require('util');
const ERROR = 'error';
const TRACE = 'trace';
class GutenbergController{
  constructor(){        
    this.api = axios.create({      
      baseURL: "https://gutenberg.org/files/",
      timeout: 3000
    });
  }

  async getFile(req,res){    
    const {bookId, fileId} = req.params;
    const {data} = await this.api.get(`${bookId}/${fileId}`)
    return res.send(data);
  }

  log(message, level='log'){
    const msg = `\n\n##########\n\n${message}\n\n$##########\n`
    console[level](msg);
  }
  
}
module.exports = GutenbergController;