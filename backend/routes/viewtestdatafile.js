var express = require('express');
var con= require('./../dbconnection');

module.exports.viewtestdata = async function(req,res){
    var users={
      "testid":req.body.testid,
    }
    con.query("SELECT * FROM `result` WHERE `testid`='"+users.testid+"'", function(err , data){
      if (err) {
        console.log(err);
        return res.json({code:0});
      } else {
        // console.log(data)
        return res.json({code:data});
        } 
    });
}

module.exports.studenttesthistory = async function(req,res){
  var users={
    "email":req.body.email,
  }
  con.query("SELECT * FROM `result` WHERE `semail`='"+users.email+"'", function(err , data){
    if (err) {
      console.log(err);
      return res.json({data:null});
    } else {
      return res.json({data:data});
      } 
  });
}

module.exports.viewTestanalysis = async function(req,res){
  var users={
    "testid":req.body.testid,
  }
  con.query("SELECT `question`, `answer` FROM `mcq` WHERE  `testid`='"+users.testid+"'", function(err , data){
    if (err) {
      console.log(err);
      return res.json({data:null});
    } else {
      console.log(data)
      return res.json({data:data});
      } 
  });
}


module.exports.studenttestparticular = async function(req,res){
  var users={
    "email":req.body.email,
    "Testid":req.body.testid,

  }
  console.log(users.testid)
  con.query("SELECT `answers`,`marks` FROM `result` WHERE `semail`='"+users.email+"' And `testid`='"+users.Testid+"'", function(err , data){
    if (err) {
      console.log(err);
      return res.json({data:null});
    } else {
      console.log(data);
      return res.json({data:data});
      } 
  });
}

module.exports.teachercurrentresult = async function(req,res){
  var users={
    "email":req.body.email,
  }
  console.log(users.testid)
  con.query("SELECT COUNT(*) as total,AVG(marks) as avg,Max(marks) as max,Min(marks) as min from result where testId=(select testid from test where temail='"+users.email+"' ORDER BY Date LIMIT 0, 1)", function(err , data){
    if (err) {
      console.log(err);
      return res.json({data:null});
    } else {
      console.log(data);
      return res.json({data:data});
      } 
  });
}

module.exports.studentcurrentresult = async function(req,res){
  var users={
    "email":req.body.email,
  }
  con.query("SELECT COUNT(*) as total,AVG(marks) as avg,Max(marks) as max,Min(marks) as min FROM `result` WHERE `semail`='"+users.email+"'", function(err , data){
    if (err) {
      console.log(err);
      return res.json({data:null});
    } else {
      console.log(data);
      return res.json({data:data});
      } 
  });
}

