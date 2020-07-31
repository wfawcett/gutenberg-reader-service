const axios = require("axios");
const _ = require("lodash");
const {inspect} = require('util');
const ERROR = 'error';
const TRACE = 'trace';
class CatalogController{
  constructor(){        
    this.api = axios.create({
      baseURL: 'http://gutendex.com/books',
      timeout: 3000
    });
  }


  async search(req,res){
    try{
      const results = await this.getter('?search=' + req.query.phrase);
      return res.send(results);
    } catch(e){
      this.log(e,ERROR);
      res.status(500).send(e.name + ': ' + e.message);
    }
  }
  
  async getter(url){
    const fullUrl = encodeURI(url + '&mime_type=text/plain');
    const {data} = await this.api.get(fullUrl);        
    return this.simplify(data);
  }

  simplify(recordSet){
    this.log("called simplify " + JSON.stringify(recordSet, null, 2), TRACE);
    return {      
      results: recordSet.results.map(result=>{        
        const textURL = this.getTextUrl(result.formats);
        if(result.media_type == 'Text' && textURL){                    
          const icon = result.formats['image/jpeg'];
          const author = (result.authors[0] && result.authors[0].name)? result.authors[0].name: null;
          const url = textURL.replace(process.env.GUTENBERG, process.env.SELF_API)
          return{
            id: result.id,
            title: result.title,
            url,
            icon, 
            author           
          }
        }
      }).filter(el=> el)
    }
  }

  getTextUrl(formats){
    let textURL = null;    
    try{
      const txtUrls = _.pick(formats, u=>(u.includes('txt')&&u.includes('files')));
      if(Object.keys(txtUrls).length > 0){
        textURL = txtUrls["text/plain"] || txtUrls["text/plain; charset=utf-8"] || txtUrls["text/plain; charset=iso-8859-1"] || txtUrls["text/plain; charset=us-ascii"];          
      }          
    } catch(e){
      this.log(e.message, ERROR);
    }
    return textURL;
  }

  log(message, level='log'){
    const msg = `\n\n##########\n\n${message}\n\n##########\n`
    console[level](msg);
  }
}
module.exports = CatalogController;