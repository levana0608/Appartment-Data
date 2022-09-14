const router = require('express').Router();
const multer = require('multer');
const sql = require("../utils/sqlConnection");
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
  //var upload = multer({ dest: "uploads/" });
  
  var upload = multer({ storage: storage });
  
  router.post("/file", upload.single("file"), function (req, res, next) {
    const file = req.file;
    if (file) {
      console.log(req.file.filename);
      sql.query("update apartment set img_src = ? WHERE idapartment = LAST_INSERT_ID()",[req.file.filename])
      res.json(req.file);
    } else throw "error";
  });


  router.post("/fileEdit/:idapartment", upload.single("file"), function (req, res, next) {
    const file = req.file;

    
    if (file) {

      // Delete a file.
      sql.query("SELECT img_src FROM apartment where idapartment = ?",[req.params.idapartment]),
      function (err, result) {
        if (err) console.log("problem in sql");
        else {
          // Unlink the file.
          fs.unlink("images/" + result, (error) => {
            if (!error) {
              console.log("the file deleted");
            } else {
              console.log('Error deleting the file');
            }
          })
        }
      }
      // console.log(req.file.filename);
      sql.query("update apartment set img_src = ? WHERE idapartment = ?",[req.file.filename, req.params.idapartment])
      res.json(req.file);


    } else throw "error";


  });

module.exports = router