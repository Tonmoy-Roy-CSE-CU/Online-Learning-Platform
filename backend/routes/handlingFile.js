var express = require("express");
const router = require("express").Router();
var app = express();
var con = require("./../dbconnection");
var testId;
var testName = "";
var teachId = "";

module.exports.checkTestId = async function (req, res, next) {
  con.query(
    "SELECT COUNT(*) AS cnt from test WHERE testid = ?",
    req.body.testid,
    function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      } else {
        if (data[0].cnt > 0) return res.json({ resType: 0 });
        else {
          testId = req.body.testid;
          testName = req.body.testname;
          return res.json({ resType: 1 });
        }
      }
    }
  );
};

module.exports.handleFile = async function (req, res, next) {
  try {
    const temp = req.body;
    console.log("TestID:", testId);
    console.log("Data:", temp);

    // Step 1: Get teacher info
    const teacherResult = await new Promise((resolve, reject) => {
      con.query(
        "SELECT tid FROM teacher WHERE temail=?",
        req.query.temail,
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    // Check if teacher exists
    if (!teacherResult || teacherResult.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const teachId = teacherResult[0].tid;
    const d = new Date().toISOString().slice(0, 19).replace("T", " ");
    const link =
      "http://localhost:3000/testlogin?name=" +
      testName +
      "&id=" +
      teachId +
      "&code=" +
      testId;

    // Step 2: Insert test record FIRST
    await new Promise((resolve, reject) => {
      const testSql =
        "INSERT INTO `test`(`temail`,`tid`,`testid`,`testName`,`Date`,`url`) VALUES(?, ?, ?, ?, ?, ?)";
      con.query(
        testSql,
        [req.query.temail, teachId, testId, testName, d, link],
        (err, result) => {
          if (err) {
            console.log("Test insert error:", err);
            reject(err);
          } else {
            console.log("Test table updated successfully");
            resolve(result);
          }
        }
      );
    });

    // Step 3: Only after test record is inserted, insert MCQs
    for (let i = 0; i < temp.length; i++) {
      const t = temp[i];
      await new Promise((resolve, reject) => {
        const mcqSql =
          "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        con.query(
          mcqSql,
          [
            i + 1, // sno
            testId,
            t[0], // question
            t[1], // option1
            t[2], // option2
            t[3], // option3
            t[4], // option4
            t[5], // answer
          ],
          (err, result) => {
            if (err) {
              console.log("MCQ insert error:", err);
              reject(err);
            } else {
              console.log(`MCQ ${i + 1} inserted successfully`);
              resolve(result);
            }
          }
        );
      });
    }

    // All done - return result
    console.log("Final link:", link);
    res.send({ ln: link });
  } catch (error) {
    console.error("Error in handleFile:", error);
    res
      .status(500)
      .json({ error: "Database operation failed: " + error.message });
  }
};

module.exports.updateMcqSub = async function (req, res, next) {
  try {
    var email = req.query.semail;
    var testid = req.query.testid;
    console.log(email + " " + testid + " " + req.body);
    var arr = req.body.join("*");
    var sql = "UPDATE result SET answers=? WHERE semail=? AND testid=?";
    con.query(sql, [arr, email, testid], function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database update failed" });
      } else {
        console.log("RESULT ARRAY UPDATED!!");
        return res.json({ success: true });
      }
    });
  } catch (error) {
    console.error("Error in updateMcqSub:", error);
    return res.status(500).json({ error: "Operation failed: " + error.message });
  }
};

module.exports.submittedQues = async function (req, res, next) {
  try {
    var str = [];
    var arr = req.body.res;
    var s = arr.join("*");
    console.log(s);
    con.query(
      "SELECT answer FROM mcq WHERE testid = ? ",
      req.body.testid,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(400).json({ pass: 0 });
        } else {
          for (var i = 0; i < data.length; i++) {
            str.push(parseInt(data[i].answer));
          }
          var s1 = str.join("*");
          var a1 = s.split("*");
          var a2 = s1.split("*");
          var count = 0;
          console.log(a1);
          console.log(a2);
          if (a1.length == a2.length) {
            for (var j = 0; j < a1.length; j++) {
              if (a1[j] == a2[j]) count++;
            }
            console.log("marks" + count);
            
            con.query(
              "SELECT srollno, syear FROM student WHERE semail=?",
              [req.body.semail],
              function (err, resultss) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ error: "Database query failed" });
                } else {
                  if (!resultss || resultss.length === 0) {
                    return res.status(404).json({ error: "Student not found" });
                  }
                  
                  var roll = resultss[0].srollno;
                  var year = resultss[0].syear;
                  console.log(year);
                  console.log(roll);
                  
                  var sql = "UPDATE result SET marks=?, year=?, rollno=? WHERE semail=? AND testid=?";
                  con.query(
                    sql,
                    [count, year, roll, req.body.semail, req.body.testid],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Failed to update results" });
                      } else {
                        console.log("Result updated with marks");
                        return res.json({ success: true, marks: count });
                      }
                    }
                  );
                }
              }
            );
          } else {
            return res.status(400).json({ error: "Answer length mismatch" });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error in submittedQues:", error);
    return res.status(500).json({ error: "Operation failed: " + error.message });
  }
};

module.exports.checkt = async function (req, res) {
  try {
    var users = {
      email: req.body.email,
      testid: req.body.testid,
    };
    console.log(users);
    
    con.query(
      "SELECT COUNT(*) AS cnt FROM result WHERE semail = ? AND testid = ?",
      [users.email, users.testid],
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database query failed" });
        }
        
        if (data[0].cnt >= 1) {
          con.query(
            "SELECT marks FROM result WHERE semail = ? AND testid = ?",
            [users.email, users.testid],
            function (err, data) {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database query failed" });
              } else if (data[0].marks == "" || data[0].marks == null) {
                return res.status(200).json({ pass: 1 });
              } else {
                console.log("already test");
                return res.status(200).json({ pass: 0 });
              }
            }
          );
        } else {
          return res.status(200).json({ pass: 1 });
        }
      }
    );
  } catch (error) {
    console.error("Error in checkt:", error);
    return res.status(500).json({ error: "Operation failed: " + error.message });
  }
};

module.exports.initialRes = async function (req, res) {
  try {
    var email = req.body.semail;
    var testid = req.body.testid;
    var len = req.body.len;
    console.log("e:" + email + " tid:" + testid);
    
    con.query(
      "SELECT COUNT(answers) AS cnt FROM result WHERE semail = ? AND testid = ?",
      [email, testid],
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database query failed" });
        } else {
          if (data[0].cnt > 0) {
            con.query(
              "SELECT answers FROM result WHERE semail = ? AND testid = ?",
              [email, testid],
              function (err, data) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ error: "Database query failed" });
                } else {
                  var ans = data[0].answers.split("*");
                  res.send({ resType: 0, arr: ans });
                }
              }
            );
          } else {
            var arr = [];
            for (var i = 0; i < len; i++) arr.push(-1);
            arr = arr.join("*");
            
            con.query(
              "INSERT INTO `result`(`semail`,`testid`,`answers`) VALUES (?, ?, ?)",
              [email, testid, arr],
              function (err, data) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ error: "Database insert failed" });
                }
                res.send({ resType: 1 });
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.error("Error in initialRes:", error);
    return res.status(500).json({ error: "Operation failed: " + error.message });
  }
};

module.exports.deleteTest = async function (req, res) {
  try {
    const testid = req.body.testid;

    // Begin transaction to ensure all related data is deleted together
    await new Promise((resolve, reject) => {
      con.beginTransaction((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Step 1: Delete associated results first (foreign key constraint)
    await new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM result WHERE testid = ?",
        [testid],
        (err, result) => {
          if (err) {
            console.log("Error deleting results:", err);
            return con.rollback(() => reject(err));
          }
          console.log("Results deleted successfully");
          resolve(result);
        }
      );
    });

    // Step 2: Delete associated MCQs (foreign key constraint)
    await new Promise((resolve, reject) => {
      con.query("DELETE FROM mcq WHERE testid = ?", [testid], (err, result) => {
        if (err) {
          console.log("Error deleting MCQs:", err);
          return con.rollback(() => reject(err));
        }
        console.log("MCQs deleted successfully");
        resolve(result);
      });
    });

    // Step 3: Delete the test itself
    await new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM test WHERE testid = ?",
        [testid],
        (err, result) => {
          if (err) {
            console.log("Error deleting test:", err);
            return con.rollback(() => reject(err));
          }
          console.log("Test deleted successfully");
          resolve(result);
        }
      );
    });

    // Commit the transaction
    await new Promise((resolve, reject) => {
      con.commit((err) => {
        if (err) {
          return con.rollback(() => reject(err));
        }
        resolve();
      });
    });

    return res.json({
      success: true,
      message: "Test and all related data deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteTest:", error);
    
    // Attempt to rollback transaction if an error occurs
    try {
      await new Promise((resolve) => {
        con.rollback(() => resolve());
      });
    } catch (rollbackErr) {
      console.error("Rollback error:", rollbackErr);
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to delete test: " + error.message,
    });
  }
};