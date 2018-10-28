// import { Collection } from 'mongoose';

// const fs=require('fs');//using file system(fs) : common module

// const os=require('os'); // operating system of our system details we get out of it

// const ld=require('lodash');
// const mymodule=require('./mymodule.js');


// var c1=process.argv[2];    ///using process argv
// //console.log(c1)
// var c2=process.argv[3]
// // console.log(command);
// c1=parseInt(c1);
// c2=parseInt(c2);
// var largest=mymodule.getLargest(c1,c2)
// console.log(largest);

//console.log(ld.isString(true));

//console.log(ld.uniq(['Gopal',12,'GOpal',100,100,12,1.2,4,5,6,122,100,100,12,34,35]));  //lodash

//const mymodule=require('./mymodule.js');


 //var name = mymodule.name;  // name gets Gopal through export of module

  //var getname =mymodule.getName();

//   var largest=mymodule.getLargest(10,13)
//  console.log(`Largest Number = ${largest}`);


// var UserInfo=os.userInfo(); //userInfo in built function
// var Username=UserInfo.username;
//console.log(UserInfo.username);

// fs.appendFile('sample.txt','welcome'+ Username, function(err){   //here we use callback function to display error
//     if(err) throw err;
//     console.log("data saved to file successfully")
// });


// fs.appendFile('sample.txt',`Welcome ${Username}`, function(err){   //here we use callback function to display error
//     if(err) throw err;
//     console.log("data saved to file successfully")           //template string method ($)
// });



// console.log('starting');
// setTimeout(
    
//     ()=>{
//       console.log('First Process.......')      // non-blocking I/O example
//     }
// ,5000);

// setTimeout(
//     ()=>{
//       console.log('second process......')      // non-blocking I/O example
//     }
// ,0);


// console.log('stopping');


//another example of call back

// console.log('starting');

// var getUserDetails=(id,callback)=>{    // executes in this way  : starting,object and stopping
//     var user={id:1,name:'Sumesh'};
//     callback(user);
// }

// getUserDetails(1,
// (userObject)=>{
//     console.log(userObject)
// }
// )

// console.log('stopping');
//...................
//EXPRESS JS      //expressjs.org
//....................


//app.use(express.static(__dirname + '/myhtmlpages'));    // toget the full path of the directory. it is called middleware

// app.get('/',(req,res)=>{
//    res.send('<h1>Welcome to express js programming</h1>')     //html response
// });



// app.get('/Home',(req,res)=>{
//     res.send('welcome to home page');
// });
// app.get('/About',(req,res)=>{
//     res.send('welcome to about page');
// });

// app.get('/',(req,res)=>{
//     res.send({"id":2,"name":"gopal"});                   //json response
// });


// app.get('/',(req,res)=>{
//     res.send('');                   //json response
// });

// const express=require('express');

// var app=express();
// const hbs=require('hbs');
// app.set('view engine','hbs');

// app.get('/',(req,res)=>{
//         res.render('views.hbs',{
//             pageTitle: "College",                          //loading dynamic content or passing values instead of using the html
//             pageBody:"Welcome to college",
//             year: new Date().getFullYear()
//         }) ;                                                 //rendering html page handlebars
//     });

// app.listen(3000);




//...................
//express to mongodb
//..............................



//FOR API
const express=require('express');
var mongoose=require('./mongoose_db');
var ObjectId = require('mongodb').ObjectID;
var {matches}=require('./usermodel');
var {resources}=require('./usermodel');
var {teams}=require('./usermodel');
var {tickets}=require('./usermodel');
var bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//routing

//find specific users
// app.get('/getusers/:name',(req,res)=>{
//     var Name=req.params.name;
//      users.find({name:Name}).then((data)=>{
//         res.send(data);
//      }).catch((error)=>{                       //error handling catch is used
//          res.send(error);
//      })
// })



// all users
// app.get('/getusers',(req,res)=>{
//     users.find().then((data)=>{
//         res.send(data);
//     },(error)=>{
//         res.status(400).send(error)
//     })
// });
// all matches
app.get('/getmatches',(req,res)=>{
    matches.find({status:"True"}).then((data)=>{
        res.send(data);
    },(error)=>{
        res.status(400).send(error)
    })
});
app.get('/getteams',(req,res)=>{
    teams.find().then((data)=>{
        res.send(data);
    },(error)=>{
        res.status(400).send(error)
    })
});

app.get('/getregisteredusers',(req,res)=>{
    resources.find().then((data)=>{
        res.send(data);
    },(error)=>{
        res.status(400).send(error)
    })
});

app.put('/updatematches',(req,res)=>{
    var Id= req.body._id;
//   var Id=new ObjectID(req.body._id).toHexString();
//  var Id=new ObjectID(req.params.id).toHexString();
    // var Away=req.params.away;
    matches.findById({_id:ObjectId(Id)}).then((data)=>{
        data.hteam=req.body.hteam;
        data.ateam=req.body.ateam;
        data.date=req.body.date;
        data.location=req.body.location;
        data.status=req.body.status;
        console.log(data.hteam);

        data.save().then((datas)=>{
            //    res.send(data);
            console.log('Successfully saved',datas)      // mongo gives a response after writing into it
            },
            (error)=>{
            console.log('Error',error);
        });
    })
        
    });
//user entry
app.post('/matchesentry',(req,res)=>{

   // console.log(req.body);
     //passing a value to the model

// var Users=new users(
//     {
//         name:req.body.name,
//         age:req.body.age,
//         rollno:req.body.rollno,               //req.body.rollno....rollno is the name given within the postman or post request
//         admno:req.body.admno,                 //this value is given to the model variable
//         college:req.body.college
//     }
//    );

//    Users.save().then((data)=>{
//        res.send(data);
//     //console.log('Successfully saved',data)      // mongo gives a response after writing into it
//     },
//     (error)=>{
//     console.log('Error',error);
// });

   var Matches=new matches();
   Matches.ateam=req.body.ateam;
   Matches.hteam=req.body.hteam;
   Matches.date=req.body.date;
   Matches.location=req.body.location;
   Matches.status="True";
//console.log(req.body.ateam);

// var Matches=new matches(
//     {
//       hteam:req.body.hteam,
//       ateam:req.body.ateam,
//       date:req.body.date,
//       location:req.body.location
        
//     }
//    );

  

   Matches.save().then((data)=>{
      res.send(data);
    console.log('Successfully saved',data)      // mongo gives a response after writing into it
    },
    (error)=>{
    console.log('Error',error);
});

})
app.post('/registerusers',(req,res)=>{
    var Resources=new resources();
    Resources.username=req.body.username;
    Resources.password=req.body.password;
    Resources.address=req.body.address;
    Resources.mobile=req.body.mobile;
    Resources.type=req.body.type;
    Resources.save().then((data)=>{
        res.send(data);
      console.log('Successfully saved',data)      // mongo gives a response after writing into it
      },
      (error)=>{
      console.log('Error',error);
  });
  
  })
  app.post('/ticketusers',(req,res)=>{
    var Tickets=new tickets();
    Tickets.username=req.body.username;
    Tickets.level=req.body.level;
    Tickets.noOfSeats=req.body.noOfSeats;
    Tickets.totalAmount=req.body.totalAmount;
    Tickets.paymentStatus=req.body.paymentStatus
    Tickets.save().then((data)=>{
        res.send(data);
      console.log('Successfully saved',data)      // mongo gives a response after writing into it
      },
      (error)=>{
      console.log('Error',error);
  });
  
  })
  app.post('/registerteams',(req,res)=>{
    var Teams=new teams();
    Teams.teamname=req.body.teamname;
    Teams.location=req.body.location;
    Teams.contact=req.body.contact;
    Teams.save().then((data)=>{
        res.send(data);
      console.log('Successfully saved',data)      // mongo gives a response after writing into it
      },
      (error)=>{
      console.log('Error',error);
  });
  
  })
app.put('/deletematches',(req,res)=>{
      
    var Id= req.body._id;
      
    matches.findById({_id:ObjectId(Id)}).then((data)=>{
        data.status="False";
        data.save().then((datas)=>{
             res.send(datas);
            console.log('Successfully saved',datas)      // mongo gives a response after writing into it
            },
            (error)=>{
            console.log('Error',error);
        });
    })
})


//to write into db


app.listen(3000,()=>{
    console.log('Started')
})