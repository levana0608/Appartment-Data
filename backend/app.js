const express = require("express");
const morgan = require("morgan");
const apartments = require("./routes/apartments");
const user = require("./routes/users");
const authRouter = require("./routes/auth");
const exImage = require("./routes/image");
// const exImage = require("./images");
var path = require("path");

const app = express();
app.use(express.json());
// app.use(express.static(__dirname + '/images'));
// app.use(express.static(path.join(__dirname, '/images')));

app.use(morgan("dev"));
app.use('/images',express.static(__dirname + '/images'));

app.use("/api", apartments);
app.use("/api", user);
app.use("/api", authRouter);
app.use("/api", exImage);

const PORT = 3000;
app.listen(PORT, () => console.log(`click http://localhost:${PORT}`));
