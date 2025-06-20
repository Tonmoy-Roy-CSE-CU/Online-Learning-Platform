// Add at the VERY TOP of your file
require('dotenv').config(); // Load environment variables

var express = require("express");
var login =  require('./routes/loginroutes');
var handleFileRouter =  require('./routes/handlingFile');
var mcqRouter=require('./routes/mcq')
var profileRouter=require('./routes/profileSetting');
var viewtestdatafile=require('./routes/viewtestdatafile')
var chatapp=require('./routes/chatapp')
var mocktest=require('./routes/mocktest')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var nodemailer = require("nodemailer");
var premiumRouter=require('./routes/premiuimTest');
require('./dbconnection');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});

var router = express.Router();

app.get('/', (req, res) => res.send('ho!'))
//test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
app.post('/register',login.register);
app.post('/tregister',login.tregister);
app.post('/handleFile',handleFileRouter.handleFile);
app.post('/testid',handleFileRouter.checkTestId);
app.post('/submittedques',handleFileRouter.submittedQues);
app.post('/initialResult',handleFileRouter.initialRes);
app.post('/checkt',handleFileRouter.checkt);
app.post('/updateRes',handleFileRouter.updateMcqSub);
app.put('/savesetting',profileRouter.settings);
app.get('/phone',profileRouter.phone);
app.post('/initialPremResult',premiumRouter.initialRes);
app.post('/submittedPremques',premiumRouter.submittedQues);
app.post('/updatePremRes',premiumRouter.updateMcqSub);
app.post('/studentPremParticular',premiumRouter.studentPremParticular);
app.post('/viewPremAnalysis',premiumRouter.viewPremAnalysis);

app.post('/setexp',profileRouter.setexp);
app.put('/savesetting1',profileRouter.settings1);
app.get('/phone1',profileRouter.phone1);



app.get('/getexp',profileRouter.getExp);
app.get('/getskill',profileRouter.getSkills);
app.post('/addskill',profileRouter.addskill);
app.get('/getedu',profileRouter.getEdu);
app.put('/saveedu',profileRouter.saveEdu);
app.get('/mcq',mcqRouter.mcq);
app.get('/prevTot',mcqRouter.prevTot);
app.post('/login',login.login)
app.post('/tlogin',login.tlogin)
app.post('/notice',login.nnotice)
app.post('/getnotice',login.getnotice)
app.post('/deleten',login.ddelete)
app.post('/addtodo',login.todo)
app.post('/gettodo',login.gettodo)



app.post('/addtocalender',login.addtocalender)
app.post('/getcalender',login.getcalender)
app.post('/getcalender1',login.getcalender1)
app.post('/updatecalender',login.updatecalender)
app.post('/deletecalender',login.deletecalender)
app.post('/getallcalender',login.getallcalender)

app.post('/viewtestdatafile',viewtestdatafile.viewtestdata)
app.post('/studenttesthistory',viewtestdatafile.studenttesthistory)
app.post('/viewTestanalysis',viewtestdatafile.viewTestanalysis)
app.post('/studenttestparticular',viewtestdatafile.studenttestparticular)
app.post('/teachercurrentresult',viewtestdatafile.teachercurrentresult)
app.post('/studentcurrentresult',viewtestdatafile.studentcurrentresult)












app.post('/deletetodo',login.tododelete)
app.post('/quote',login.addquote)
app.get('/getquote',login.getquote)
app.post('/testhistory',login.testhistory)
app.post('/checkpass',login.checkpassword)
app.post('/changepass',login.changepassword)
app.post('/testdetails',login.testdetails)

app.get('/getnotice1',login.getnotice1)
app.post('/checkpass1',login.checkpassword1)
app.post('/changepass1',login.changepassword1)
app.use('/api', router);

app.get('/getblog',login.getblog)
app.post('/viewblog',login.viewblog)
app.post('/getcomment',login.getcomment)
app.post('/addcomment',login.addcomment)
app.post('/updatelike',login.updatelike)


app.post('/search',chatapp.search)
app.post('/addmsg',chatapp.addmsg)
app.post('/sendermsg',chatapp.sendermsg)
app.post('/setpic',profileRouter.setPic);
app.post('/settpic',profileRouter.settPic);
app.get('/getphoto',profileRouter.getPhoto);
app.get('/gettphoto',profileRouter.gettPhoto);

app.get('/getmocktest',mocktest.getmocktest)
app.post('/gettest',mocktest.gettest)

app.listen(8082,()=>{ 
    console.log("Server is Listening At Port 8082")  
})


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER, // Ensure this is set in .env
        pass: process.env.MAIL_PASS  // Use App Password if 2FA enabled
    },
    tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production' // Secure in production
  }
});
  
var rand,mailOptions,host,link;

// Route to delete test based on `testid`
app.post('/deleteTest', (req, res) => {
    const { testid } = req.body;

    // SQL query to delete test from `test` table
    const sql = 'DELETE FROM test WHERE testid = ?';
    
    mysqlConnection.query(sql, [testid], (err, result) => {
        if (err) {
            console.error('Error deleting test:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete test' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        res.json({ success: true, message: 'Test deleted successfully' });
    });
});
app.post('/send',function(req,res){
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
       // from : 'letsLearn@gmail.com',
        to : req.body.semail,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, info){
     if(error){
        console.log(error);
        res.end("error");
     }else{
        console.log("Message sent: " + info.response);
        res.end("sent");
         }
});
res.status(400).json({resType:102});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>"); 
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});




var mysqlConnection= require('./dbconnection');
app.put('/putevent', (req, res) => {

    let emp = req.body;
    mysqlConnection.query("INSERT INTO blogg (name,college,course,blo,date,time,rate,count,email,image) VALUES (?,?,?,?,?,?,?,?,?,?)",
    
                             [emp.name, emp.college, emp.course, emp.blo , emp.date,emp.time,emp.rate,emp.count,emp.email],emp.image, (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

app.get('/getcourse', (req, res) => {
    mysqlConnection.query('Select * from pcourses', (err, rows, fields) => {
        if (!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
});


app.put('/putcart', (req, res) => {
console.log("Rfff");
    let emp = req.body;
    mysqlConnection.query("INSERT INTO cart (cid,email,price,description,cname,image) VALUES (?,?,?,?,?,?)",
    
                             [emp.id,emp.email,emp.price,emp.description,emp.cname,emp.image], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


app.put('/removecart', (req, res) => {
   
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('Delete FROM cart WHERE cid=? && email = ?', [emp.id,emp.email], (err, rows, fields) => {
        if (!err)
        {
            console.log("gg");
            res.send(rows);
        }
        else
            console.log(err);
    })
});

app.get('/getcart', (req, res) => {
    mysqlConnection.query('Select * from cart', (err, rows, fields) => {
        if (!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
});


app.put('/getbill', (req, res) =>  {   
    let emp=req.body;
    console.log(emp);
    var val='';
    mysqlConnection.query('SELECT sum(price) AS val FROM cart where email = ? ',[emp.email], (err, rows, fields) => {
        if (!err)
        {
            console.log(val);
            res.send(rows);
            // console.log(val);
            // res.send({
                
            //     "val": val,
            // })
        }
        else
            console.log(err);
    })
});


app.put('/addcoursetostud', (req, res) => {
    console.log("gg");

        let emp = req.body;
       
        mysqlConnection.query("Update student set courses = ? where semail =? ",[emp.temp,emp.id] ,(err, rows, fields) => {

            if (!err)
                res.send('Updated successfully');
            else
                console.log(err);
        })
    });

    app.put('/getcourseofstud', (req, res) => {
   
        let emp=req.body;
        mysqlConnection.query('SELECT courses FROM student where semail = ? ',[emp.id], (err, rows, fields) => {
            if (!err)
            {
                console.log(rows);
                res.send(rows);
            }
            else
                console.log(err);
        })
    });


    app.put('/deletecart', (req, res) => {
   
        let emp=req.body;
        mysqlConnection.query('Delete FROM cart where email = ? ',[emp.id], (err, rows, fields) => {
            if (!err)
            {
                console.log(rows);
                res.send(rows);
            }
            else
                console.log(err);
        })
    });

    app.put('/getdetails', (req, res) => {
            let emp = req.body;
            console.log("hii");
            console.log(emp);
            mysqlConnection.query("Select * from pcourses where cname= ? ",[emp.temp] , (err, rows, fields) => {
                if (!err)
                    {
                        console.log("hello");
                        console.log(rows);
                    res.send(rows);
                    }
                else
                    console.log(err);
            })
        });


        app.put('/getmcqs', (req, res) => {
            let emp = req.body;
           
            mysqlConnection.query("Select * from pmcq where testid= ? ",[emp.test] , (err, rows, fields) => {
                if (!err)
                    {
                        console.log("hello");
                        console.log(rows);
                        res.send(rows);
                    }
                else
                    console.log(err);
            })
        });













