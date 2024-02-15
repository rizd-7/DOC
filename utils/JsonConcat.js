 module.exports = class JsonConcatenator {

  static count = 0;
  
  constructor(jsonString1c,jsonString2c){
    this.jsonString1=jsonString1c;
    this.jsonString2=jsonString2c;
  }
  
  concat(jsonStr1,jsonStr2){

    const json1String = JSON.stringify(jsonStr1).replace("{"," ").replace("}"," ")
    const json2String = JSON.stringify(jsonStr2).replace("{"," ").replace("}"," ")

    const JsonAlmostvalid = `{ ${json1String},${json2String} }`;

    var index = json1String.indexOf("_id");
    var index2 = json2String.indexOf("_id");
    
    if (index !== -1 && index2!== -1) {
       
      JsonConcatenator.count++;
      var before = JsonAlmostvalid.substring(0, index);
      var after = JsonAlmostvalid.substring(index+6);
      var replacement = `_id${JsonConcatenator.count}`;
      return `  ${before} "${replacement}" ${after}  ` ;
    }
  }

} 
 