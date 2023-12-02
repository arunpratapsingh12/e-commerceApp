import  jwt  from "jsonwebtoken";
import Usermodel from "../Models/Usermodel.js";

export const requiresignIn = (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {

    const jwtSECRETE = process.env.jwtSECRETE;
      const decoded = jwt.verify(token, jwtSECRETE);
    req.user = decoded;
    // console.log(decoded); // You can now access the user data in your routes
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usermodel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};