import mongoose from "mongoose";

const subtodoschema = mongoose.Schema({
    subtodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "todo"
    },

}, { timestamp: true });

export const Todo = mongoose.model("subTodo", subtodoschema);
