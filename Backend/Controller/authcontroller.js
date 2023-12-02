import OrderModel from "../Models/OrderModel.js";
import Usermodel from "../Models/Usermodel.js";
import { comparepassward, hashpassward } from "../helper/authhelper.js";
import Jwt from "jsonwebtoken";

export const registercontroller = async (req, res) => {
  try {
    const { name, email, passward, phone, address, answer } = req.body;

    //validation perform

    if (!name) {
      return res.send({ massage: "Name is required" });
    }

    if (!email) {
      return res.send({ massage: "email is required" });
    }

    if (!passward) {
      return res.send({ massage: "passward is required" });
    }

    if (!phone) {
      return res.send({ massage: "Phone is required" });
    }

    if (!address) {
      return res.send({ massage: "Address is required" });
    }

    if (!answer) {
      return res.send({ massage: "Answer is required" });
    }

    //check that user already present or not
    const existinguser = await Usermodel.findOne({ email });

    //validate above
    if (existinguser) {
      return res.send({
        success: false,
        massage: "user already register please login in app",
      });
    }
    //register user
    const hashedpassward = await hashpassward(passward);

    //save

    const user = await new Usermodel({
      name,
      email,
      phone,
      address,
      password: hashedpassward,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      massage: "you are successfully register",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        success: false,
        massage: "error in registration",
        error,
      });
  }
};

//login

export const logincontroller = async (req, res) => {
  try {
    const { email, passward } = req.body;

    //validation

    if (!email || !passward) {
      return res.status(404).send({
        success: false,
        massage: "invailed email || passward",
      });
    }

    //check user

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        massage: "Email is not registered",
      });
    }

    // compare passward
    const match = comparepassward(passward, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        massage: "passward is not matched",
      });
    }

    //generate token
    const token = await Jwt.sign({ _id: user._id }, "HSTFHNVKFG44", {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      massage: "login is successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });

    req.headers.authorization = token;
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      massage: "Invailed passward and email",
      error,
    });
  }
};

//test controller

export const testcontroller = (req, res) => {
  res.send("test is running");
};

//forgot passwardcontroller

export const forgotcontroller = async (req, res) => {
  try {
    const { email, Newpassward, answer } = req.body;

    // validate
    if (!email) {
      res.status(500).send({
        success: false,
        massage: "Email is required",
      });
    }

    if (!Newpassward) {
      res.status(500).send({
        success: false,
        massage: "Newpassward is required",
      });
    }

    if (!answer) {
      res.status(500).send({
        success: false,
        massage: "answer is required",
      });
    }

    //check
    const user = await Usermodel.findOne({ email });

    if (!user) {
      res.status(500).send({
        success: false,
        massage: "email and answer wrong",
      });
    }

    const hashedp = await hashpassward(Newpassward);
    await Usermodel.findByIdAndUpdate(user._id, { password: hashedp });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "something went wrong",
      error,
    });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await Usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
