const fs = require('fs');

// create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    fs.writeFile("data.json", JSON.stringify(data), function(err) {
        if (err) return res.send("write file error!")
        
        return res.redirect("/teachers")
    });  
}