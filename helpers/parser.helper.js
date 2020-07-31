const bookMatcher = /\*{3} START.*\*{3} END/gms;

const steps = [
  {pattern: /\r/gms, replacement: ''} // normalize *nix and pc line endings. 
  ,{pattern: /\[\billustration\b.[^\]]*]/gmsi, replacement: ''} // illistration tags are useless here
  ,{pattern: /[\(|\)|\*|\-|\;|\_|\t{1,10}]/gms, replacement: ''} //dirty characters. 
  ,{pattern: /  +/gms, replacement: ''} // two or more spaces
]

class ParserHelper{
  static process(textBody){
    try{      
      let bookText = bookMatcher.exec(textBody)[0] || textBody; // if the bookMatcher fails return all of it. 
    steps.forEach(step=> {
      bookText = bookText.replace(step.pattern, step.replacement);
    });    
    return bookText.split(/\n{2,6}/).map(s => s).filter( x=> x);    
    } catch (err){
      console.log(err);
    }    
  }
}

module.exports = ParserHelper;