const router = require("express").Router();
const sql = require("../utils/sqlConnection");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const bcrypt = require("bcrypt");

const schema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().min(2).email(),
  password: Joi.string().required().min(2),
});

router.post("/add-user", validator.body(schema), async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt); //Password encryption

  let user = await sql.query(
    "SELECT * FROM users WHERE email= ?",
    [req.body.email],
    function (err, result) {
      if (err) throw err;
      // user exist
      if (result != 0) {
        console.log(result);
        return res.status(400)
        .send("User already registered");
      }
      //user doesn't exist yet
      else {
        user = sql.query(
          "INSERT INTO users( name, email, password) VALUES (?,?,?)",
          [req.body.name, req.body.email, req.body.password],
          function (err, result) {
            if (err) res.send(err);
            else {
              return res.send("added user success!");
              
            }
          }
        );
      }
    }
  );
});

module.exports = router;

// router.post('/add-user', (req, res, ) => {
//   sql.query("INSERT INTO apartment( price, img_src, phone, city, for_sale) VALUES (?,?,?,?,?)",[req.body.price, req.body.img_src, req.body.phone, req.body.city, req.body.for_sale], function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted, ID: " + result.insertId);
//   });
// });

// router.post("/add-user", (req, res) => {
//   sql.query(
//     "INSERT INTO users( name, email, password) VALUES (?,?,?)",
//     [req.body.name, req.body.email, req.body.password],
//     function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted, ID: " + result.insertId);
//     }
//   );
// });
