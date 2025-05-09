var con= require('./../dbconnection');
var fs=require('fs');
module.exports.phone= async function(req,res)
{
    console.log("**"+req.query.tId+"**");
    con.query("SELECT tpno FROM teacher WHERE temail = ?",req.query.tId,function(err,data){
        console.log(data[0]);
        if(err)
        console.log(err);
        else res.json(data[0]);
    })
}
module.exports.settings= async function(req,res){
    console.log(req.body.name+" "+req.body.ph_num+" "+req.body.email);
    var sql="UPDATE teacher SET tname =? , tpno =?  WHERE temail = ?";
    con.query(sql,[req.body.name,req.body.ph_num,req.body.email],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('profile updated');
        }
    })
}

module.exports.phone1= async function(req,res)
{
    console.log("**"+req.query.tId+"**");
    con.query("SELECT spno FROM student WHERE semail = ?",req.query.tId,function(err,data){
        console.log(data[0]);
        if(err)
        console.log(err);
        else res.json(data[0]);
    })
}
module.exports.settings1= async function(req,res){
    console.log(req.body.name+" "+req.body.ph_num+" "+req.body.email);
    var sql="UPDATE student SET sname =? , spno =?  WHERE semail = ?";
    con.query(sql,[req.body.name,req.body.ph_num,req.body.email],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('profile updated');
        }
    })
}
module.exports.addskill = async function(req,res){
    var users={
         "email":req.body.email,
         "name":req.body.name,
         "val":req.body.val
       }
              var sql = "INSERT INTO `skill` (`email`, `name`, `percentage`) VALUES ('" + users.email + "','" + users.name + "','" + users.val + "')";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  console.log(err);
                  return res.json({code:0});
                } else {
                  return res.status(400).json({code:1});
                  }
              });                  
  }
// module.exports.setskill=function(req,res)
// {
//     var email=req.query.semail;
//     var arr=[];
//     con.query("SELECT * FROM skill WHERE email=?",email,function(err,data)
//     {
//         if(err)
//         console.log(err)
//         else
//         res.send(data)
        // if(err)
        // console.log(err);
        // else
        // {
        //     if(data=="")
        //     arr.push(req.body.skill);
        //     else
        //     {
        //         arr=data[0].Skills.split("*");
        //         arr.push(req.body.skill);
        //         arr=arr.join("*");
        //     }
        //     var sql="UPDATE student SET Skills=? WHERE semail=?";
        //     con.query(sql,[arr,email],function(err,result){
        //         if(err)
        //         console.log(err);
        //         else 
        //         {
        //             con.query("SELECT Skills from student WHERE semail=?",email,function(err,result)
        //             {
        //                 if(err)
        //                 console.log(err)
        //                 else 
        //                 {
        //                     arr=result[0].Skills;
        //                     arr=arr.split("*");
        //                     res.send(arr);
        //                 }
        //             })
        //         }
        //     })
        // }
//     })
// }
module.exports.getSkills=function(req,res)
{
  //  console.log("to get skill");
    con.query("SELECT * FROM skill WHERE email=?",req.query.semail,function(err,data)
    {
        //console.log(data[0].Skills)
        if(err)
        console.log(err);
        else 
        {
            // var arr=data[0].Skills.split("*");
            res.send(data);
        }
    })
}
module.exports.setexp=function(req,res)
{
    var email=req.query.temail;
    var arr=[];
    con.query("SELECT experience FROM teacher WHERE temail=?",email,function(err,data)
    {
        if(err)
        console.log(err);
        else
        {
            if(data=="")
            arr.push(req.body.exp);
            else
            {
                arr=data[0].experience.split("*");
                arr.push(req.body.exp);
                arr=arr.join("*");
            }
            var sql="UPDATE teacher SET experience=? WHERE temail=?";
            con.query(sql,[arr,email],function(err,result){
                if(err)
                console.log(err);
                else 
                {
                    con.query("SELECT experience from teacher WHERE temail=?",email,function(err,result)
                    {
                        if(err)
                        console.log(err)
                        else 
                        {
                            arr=result[0].experience;
                            arr=arr.split("*");
                            res.send(arr);
                        }
                    })
                }
            })
        }
    })
}
// Find this code around line 177 and modify:
module.exports.getExp = function(req, res) {
    const email = req.query.temail;
    
    con.query("SELECT experience FROM teacher WHERE temail = ?", [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (!results[0]?.experience) {
        return res.json([]); // Return empty array if no experience
      }
  
      try {
        const experienceArray = results[0].experience.split('*');
        res.json(experienceArray);
      } catch (error) {
        console.error('Error processing experience:', error);
        res.status(500).json({ error: 'Error processing experience data' });
      }
    });
  };
module.exports.getEdu=function(req,res)
{
    con.query("SELECT tenth,twelth,graduation FROM student WHERE semail=?",req.query.semail,function(err,data)
    {
        if(err)
        console.log(err);
        else
        {
            res.send({ten:data[0].tenth,twel:data[0].twelth,grad:data[0].graduation});
        }
    })
}
module.exports.saveEdu=function(req,res)
{
    console.log(req.body);
    var sql="UPDATE student SET tenth =? , twelth =? ,graduation = ? WHERE semail=?";
    con.query(sql,[req.body.tenth,req.body.twelth,req.body.gradu,req.query.semail],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('edu updated');
        }
    })
}
module.exports.setPic=async function(req,res)
{
   var img=fs.readFileSync('C:\\Users\\hp\\Pictures\\Saved Pictures\\'+req.body.pict); //give ur folder path here
    var sql="UPDATE student SET profileImage=? WHERE semail=?";
    con.query(sql,[img,req.query.semail],function(err,data)
    {
        if(err)
        console.log(err)
        else
        {
            con.query("SELECT profileImage FROM student WHERE semail=?",req.query.semail,function(err,result){
                console.log(result[0].profileImage)
                if(err)
                console.log(err);
                else 
                {
                    res.contentType('json');
                    var obj={buff:result[0].profileImage}
                    res.send(obj);
                }
            })
        }
    })
}
module.exports.settPic=async function(req,res)
{
    var img=fs.readFileSync('C:\\Users\\hp\\Pictures\\Saved Pictures\\'+req.body.pict);
    var sql="UPDATE teacher SET profileImage=? WHERE temail=?";
    con.query(sql,[img,req.query.temail],function(err,data)
    {
        if(err)
        console.log(err)
        else
        {
            con.query("SELECT profileImage FROM teacher WHERE temail=?",req.query.temail,function(err,result){
                console.log(result[0].profileImage)
                if(err)
                console.log(err);
                else 
                {
                    res.contentType('json');
                    var obj={buff:result[0].profileImage}
                    res.send(obj);
                }
            })
        }
    })
}
module.exports.getPhoto=function(req,res)
{
    con.query("SELECT profileImage FROM student WHERE semail=?",req.query.semail,function(err,result){
        if(err)
                console.log(err);
                else 
                {
                    res.contentType('json');
                    var obj={buff:result[0].profileImage}
                    res.send(obj);
                }
    })
}
module.exports.gettPhoto=function(req,res)
{
    con.query("SELECT profileImage FROM teacher WHERE temail=?",req.query.temail,function(err,result){
        if(err)
                console.log(err);
                else 
                {
                    res.contentType('json');
                    var obj={buff:result[0].profileImage}
                    res.send(obj);
                }
    })
}