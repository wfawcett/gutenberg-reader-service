const axios = require("axios");
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
        if(result.media_type == 'Text'){
          const guten_url = result.formats["text/plain; charset=utf-8"] || result.formats["text/plain; charset=iso-8859-1"] || result.formats["text/plain; charset=us-ascii"];
          const url = guten_url.replace(process.env.GUTENBERG, process.env.SELF_API)
          return{
            id: result.id,
            title: result.title,
            url,
            raw: result
          }
        }
      }).filter(el=> el)
    }
  }

  log(message, level='log'){
    const msg = `\n\n$##########\n\n${message}\n\n$##########\n`
    console[level](msg);
  }
}
module.exports = CatalogController;