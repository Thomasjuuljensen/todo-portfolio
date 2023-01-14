import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    description: {type: String},
    completed: {type: Boolean},
    deleted: {type: Boolean}
})


export default mongoose.model("Client", TodoSchema);
  