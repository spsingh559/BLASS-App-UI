var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var fs=require('fs');

// File upload start
const fileUpload = require('express-fileupload');
app.use(fileUpload());
// File upload end

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

// app.post('/upload', (req, res, next) => {
//     console.log(req);
//     let imageFile = req.files.file;
//     var newDirName =imageFile.name.split('.');
//     var dir = './artifacts/src/github.com/'+newDirName[0];
//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir);
//         imageFile.mv(`${__dirname}/${dir}/${imageFile.name}`, function(err) {
//             if (err) {
//               return res.status(500).send(err);
//             }
        
//             res.json({message:'file uploaded'});
//           });
        
      
//       }else
//       {    
//         var rmFile=dir+'/'+imageFile.name;
//         fs.unlinkSync(rmFile);
//         imageFile.mv(`${__dirname}/${dir}/${imageFile.name}`, function(err) {
//             if (err) {
//               return res.status(500).send(err);
//             }
        
//             res.json({message:'file uploaded'});
//           });
       
//       }
   

   
//   })


// app.post('/StoreFile',multipartMiddleware, function (req, res, next) {
//     console.log(req.files);
//     //logger.info('<<<<<<<<<<<<<<<<< READ AND WRITE A FILE >>>>>>>>>>>>>>>>>');
//     var file = req.files.file;
//     //console.log('------------shipment_id is--------------'+req.body.shipment_id);
//     console.log(req.files.file);
//     if (!file) {
//     res.json(getErrorMessage('\'file\''));
//     return;
//     }
//     var fileName = req.files.file.name;
//     console.log(fileName)
//     var tempPath = file.path;
//     var relative_target_path = './Documents/';
//     var target_path_wo_fileName = path.resolve(relative_target_path).replace(/\\/g, '/') + '/';
//     var target_path = target_path_wo_fileName + fileName;
//     fs.readFile(tempPath, function (err, data) {
//     if (err) {
//     console.log("Error in readFile" + err);
//     res.json({
//     "message": "Error in readFile " + err,
//     "code": "500"
//     });
//     } else {
//     fs.writeFile(target_path, data, function (err) {
//     //console.log('data::'+data);
//     if (err) {
//     console.log("File not uploaded");
//     console.log("Error in writeFile " + err);
//     console.log("Document upload: Error while writing Document: " + target_path);
//     res.json({
//     "message": "Error in writeFile " + err,
//     "code": "500"
//     });
//     } else {
//     console.log("FileSystem document upload successful at ");
//     res.json({
//     "message": "File uploaded Successfully at " + target_path,
//     "code": "200"
//     });
//     }
//     });
//     }
//     });
//     }); 


//Mongoose
// var db = 'mongodb://localhost/test';
// mongoose.connect(db);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("connnected with mongo");
// });

 

//Ruotes
app.use('/', index);
// app.use('/api/v1/',require('./router'));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/api/registration', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("userDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("registration").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          response.send("success");
          db.close();
        });
      }); 

})

app.get('/api/getInstanceData/:userID', function(req,res){
    console.log('api instance ');
    // console.log(req.body);
   
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("userDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        var query = { username: req.params.userID };
  dbo.collection("experiment").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log('--------output of user data is----------------');
    console.log(result);
    
    res.send(result);
    db.close();
  });
      });

})

app.post('/api/login', function(req,response){
    console.log('api login');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("userDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        var query = { username: req.body.username };
  dbo.collection("registration").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    if(result.length==0){
        response.send({
            response:"Fail"
        })
    }else{
    console.log(result[0]);
    if(result[0].password==req.body.password){
        console.log('inside if');
        response.send({
            response:"Succes",
            username:result[0].username
        });
    }else{
        console.log('pass not match')
        response.send({
            response:"Fail"
        })
    }
}
    
    db.close();
  });
      });

})

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));



//Listening to port 8081
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 8080");
});
