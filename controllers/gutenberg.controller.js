const axios = require("axios");
const {inspect} = require('util');
const ERROR = 'error';
const TRACE = 'trace';
const {process} = require("../helpers/parser.helper");

class GutenbergController{
  constructor(){        
    this.api = axios.create({      
      baseURL: "https://gutenberg.org/files/",
      timeout: 3000
    });
  }

  async getFile(req,res){    
    const {bookId, fileId} = req.params;
    let {data} = await this.api.get(`${bookId}/${fileId}`)
    try{
      data = process(data);
    }catch (err){
      console.log("Error Processing file: ", err);
      throw err;
    }
    
    return res.send(data);
  }

  log(message, level='log'){
    const msg = `\n\n##########\n\n${message}\n\n$##########\n`
    console[level](msg);
  }
  
}
module.exports = GutenbergController;