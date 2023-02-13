import bcrypt from "bcryptjs";
import user from "./models/user.js";
import cookieParser from "cookie-parser";
import { createToken, requireAuth } from "./JWT.js";
app.use(cookieParser());

//AUTHENTICATION
app.post("/signup", async (req, res) => {
  try {
    //get email and password from req.body
    const { email, password } = req.body;

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //create a user with the data
    await user.create({ email, password: hashedPassword });
    //respond to frontend
    res.json("user registered");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    //get the email and password from req.body
    const { email, password } = req.body;

    //find the user with requested email
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      return res.sendStatus(401).json("user doesn't exist");
    }
    //compare submitted password with the hashed password for user
    const passwordMatch = bcrypt.compareSync(password, foundUser.password);
    if (!passwordMatch) {
      return res.sendStatus(401).json("password doesn't match");
    } else {
      //create a jwt token. This is how we can tell which user is logged in.  -----
      const accessToken = createToken(foundUser);
      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
      //create cookie to store in users browser
      res.cookie("authorization", accessToken, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
      });

      //send the jwt token
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/logout", (req, res) => {
  try {
    res.clearCookie("authorization");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/checkAuth", requireAuth, (req, res) => {
  console.log(req.userById);
  res.sendStatus(200);
});
