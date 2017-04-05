var express = require("express");
var app = express();
var Bing = require('node-bing-api')({ accKey: "1fc3f4c636b44449be7232e39f24e679" });





app.get("/:eingabe", function(req, res){
    var eingabe = req.params.eingabe;
    var set= req.query.offset;
    
    
    var set = set || 5; 
 
Bing.images(eingabe, {
    top: set,  
  }, function (err,reso,data){
    res.send(data.value.map(show));
    
    
  });

})

app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})




function show (data){
    return ({
        name: data.name,
        url: data.contentUrl,
        thumbnailUrl: data.thumbnaiUrl,
        
    })
    
    
}