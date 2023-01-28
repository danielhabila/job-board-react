import jwt from "jsonwebtoken";
import user from "./models/user.js";

//Date.now() returns the nos of milliseconds since Jan1,1970.
// +1000 (adding a second), x60(converting to a min), x60(conver to an hour), x24(to 24 hours), x30(to 30days)

const createToken = (user) => {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  // The first argument is the data we want to encryt within our token and the second argument is the secret key used to encrypt and decrypt it.
  const accessToken = jwt.sign(
    { subject: user._id, exp: exp },
    process.env.JWT_SECRET_KEY
  );
  return accessToken;
};

//--> Creating middleware. A middleware is a function that runs before a request. It decides whether to proceed with the request or not.
const requireAuth = async (req, res, next) => {
  try {
    // read token from cookies
    const token = req.cookies.authorization;

    //decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //find the right user using decoded subject
    const user = await user.findById(decoded.subject);
    if (!user) return res.sendStatus(401);

    //attach user to req
    req.user = user;

    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
export { createToken, requireAuth };
