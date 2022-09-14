const router = require("express").Router();
const sql = require("../utils/sqlConnection");
const multer = require("multer");
const profilesController = require("../controllers/profiles");
const fs = require("fs");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
// var path = require("path");

const schema = Joi.object({
  price: Joi.number().required().min(4),
  phone: Joi.string().required().min(9).max(10),
  city: Joi.string().required().min(3),
  street: Joi.string().min(3),
  status: Joi.boolean().required(),
  userid: Joi.number().required(),
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// var upload = multer({ storage: storage });

//add new apartment
router.post("/apartment", validator.body(schema), async (req, res, next) => {
  await sql.query(
    "INSERT INTO apartment(price,phone,city,street,userid,for_sale) VALUES (?,?,?,?,?,?)",
    [
      req.body.price,
      req.body.phone,
      req.body.city,
      req.body.street,
      req.body.userid,
      req.body.status,
    ],
    function (err, result) {
      if (err) res.status(404).send("no success");
      else {
        return res.status(200).send("success");
      }
    }
  );
});

//all for-sale apartments
router.get("/apartment-sale", (req, res) => {
  sql.query("SELECT * FROM apartment WHERE for_sale = 1", (err, result) => {
    if (err) res.status(404).send("no success");
    res.status(200).send(result);
  });
});

router.get("/apartment-rent", (req, res) => {
  //all for-rent apartments
  sql.query("SELECT * FROM apartment WHERE for_sale = 0", (err, result) => {
    if (err) res.status(404).send("no success");
    res.status(200).send(result);
  });
});

//delete specific apartment
router.delete("/apartment-delete/:idapartment", (req, res) => {

  // // Delete a file.
  // sql.query("SELECT img_src FROM apartment WHERE idapartment = ?",[req.params.idapartment]),
  // function (err, result) {
  //   if (err) console.log("problem in sql");
  //   else {
  //     // Unlink the file.
  //     fs.unlink("images/" + result, (error) => {
  //       if (!error) {
  //         console.log("the file deleted");
  //       } else {
  //         console.log('Error deleting the file');
  //       }
  //     })
  //   }
  // }


  sql.query(
    "DELETE FROM apartment WHERE idapartment = ?",
    [req.params.idapartment],
    (err, result) => {
      if (err) res.status(404).send("no success");
      res.status(200).send("deleted");
    }
  );
});

//display one apartment - edit page
router.get("/getApartment/:idapartment", async (req, res, next) => {
  await sql.query(
    "SELECT * FROM apartment WHERE idapartment = ?",
    [req.params.idapartment],
    function (err, result) {
      if (err) res.status(404).send("no success");
      else {
        return res.status(200).send(result);
      }
    }
  );
});

// update apartment
router.put("/apartment-edit/:idapartment", (req, res) => {
  if(req.body.status === "false"){
    req.body.status = false;
  }
  if(req.body.status === "true"){
    req.body.status = true;
  }
  console.log(req.body.status);
  sql.query(
    "UPDATE apartment SET price = ?, phone = ?, city = ?, street = ?, for_sale = ? WHERE idapartment = ?",
    [
      req.body.price,
      req.body.phone,
      req.body.city,
      req.body.street,
      req.body.status,
      req.params.idapartment,
    ],
    (err, result) => {
      if (err) res.status(404).send("no success");
      res.status(200).send("updated");
    }
  );
});

//get all apartments
router.get('/all-apartments', (req, res, ) => {

  sql.query("SELECT * FROM apartment",
  (err, result) => {
    if (err) res.status(404).send("no success get all apartment");
    return res.status(200).send(result);
  })
  
})

//********************************************************************** */

// router.get("/image", (req, res) => {
//   res.sendFile(
//     path.join(
//       __dirname,
//       "../images/1622103406517_pexels-pixabay-65894.jpg"
//     )
//   )
// });

// await sql.query("SELECT img_src FROM apartment",
//   (err, result) => {
//     if (err) res.status(404).send("no success");
//     else {
//       return res.send(result);
//     }
//   });

//****************************************** */

// router.post("/profils", storage, profilesController.postProfile);

module.exports = router;
