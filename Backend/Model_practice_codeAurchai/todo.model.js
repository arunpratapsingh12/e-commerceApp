
import mongoose from "mongoose";

const todoschema = mongoose.Schema(
  {
    content: {
      type: true,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

export const Todo = mongoose.model("Todo", todoschema);
