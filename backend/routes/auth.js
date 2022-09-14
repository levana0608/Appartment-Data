const router = require("express").Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const sql = require("../utils/sqlConnection");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = Joi.object({
  email: Joi.string().required().min(2).max(255).email(),
  password: Joi.string().required().min(2).max(255),
});

router.post("/connect", validator.body(schema), async (req, res) => {
  await sql.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    async function (err, result) {
      if (err) res.send(err);
      else {
        //invalid email
        if (result == 0) {
          return res.status(400).send("Invalid email or password.");
        }
        //valid email
        else {
          //Password matching check
          const validPassword = await bcrypt.compare(
            req.body.password,
            result[0].password
          );
          //invalid password
          if (!validPassword) return res.status(400).send("Invalid password.");
          //valid email and password
          else {
            //send the user a token
            const token = jwt.sign({ id: result[0].id }, config.get("jwtKey"));
            // res.send("the token is: " + token);
            res.json({ token: token, id: result[0].id });
            console.log(result[0].id);
          }
        }
      }
    }
  );
});

module.exports = router;
