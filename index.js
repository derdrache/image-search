var express = require("express");
var app = express();
var Bing = require('node-bing-api')({ accKey: "1fc3f4c636b44449be7232e39f24e679" });
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://shortener:shortener@ds145220.mlab.com:45220/shortener"//"mongodb://localhost:27017/shortener"




app.get("/:eingabe*", function(req, res){
    var eingabe = req.params.eingabe;
    var set= req.query.offset;
    var set = set || 1; 
 
    if (req.params[0].length>0 && req.params.eingabe=="latest"&& req.params[0]=="/imagesearch"){
        
        mongoClient.connect(dburl, function(err,db){
            db.collection("imagesearch").find({},{_id:0}).toArray(function(err,result){
                var sort = result.sort().reverse();
                res.send(sort);
            })
        })
            
    }else{
        Bing.images(eingabe, {
            top: set,  
            }, function (err,reso,data){
            console.log(data.thumbnaiUrl)
            res.send(data.value.map(show));
    
        });

    
    mongoClient.connect(dburl, function(err,db){
       
        db.collection("imagesearch").insert({
            search: eingabe,
            when: new Date()
        })
        
        db.close();
    })
    


}
})

app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})




function show (data){
    return ({
        name: data.name,
        url: data.contentUrl,
        thumbnailUrl: data.thumbnailUrl,
        
    })
    
    
}