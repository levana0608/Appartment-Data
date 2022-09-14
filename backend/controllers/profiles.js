const sql = require("../utils/sqlConnection");


exports.postProfile = async (req, res) => {
    const { name } = req.body;
    const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
// console.log(req.body);
    const createdProfile = await sql.query("INSERT INTO images (name, image) VALUES (?,?)",
    [name, imagePath],function (err, result) {
        if (err) throw err
        else {
          // console.log("1 record inserted, ID: " + result.insertId);
          // console.log(result);
          return res.send("added user success!");
          
        }
    })
  };