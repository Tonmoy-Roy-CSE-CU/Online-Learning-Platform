var con = require('./../dbconnection');

// Fixed getmocktest endpoint
module.exports.getmocktest = function(req, res) {
    con.query("SELECT * FROM mocktest", function(err, data) { // Changed table name to mocktest
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ 
                code: [],
                error: "Database query failed"
            });
        }
        
        // Ensure we always return an array
        const result = Array.isArray(data) ? data : [];
        return res.status(200).json({ 
            code: result 
        });
    });
};

// Fixed gettest endpoint
module.exports.gettest = function(req, res) {
    const testid = req.body.testid;
    
    if (!testid) {
        return res.status(400).json({
            code: [],
            error: "Missing testid parameter"
        });
    }

    con.query("SELECT * FROM mocktest WHERE testid = ?", [testid], function(err, data) {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                code: [],
                error: "Database query failed"
            });
        }
        
        // Always return an array even for single results
        const result = Array.isArray(data) ? data : [];
        return res.status(200).json({
            code: result
        });
    });
};