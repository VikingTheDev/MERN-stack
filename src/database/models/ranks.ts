import {Schema, Types} from "mongoose";

export const rankSchema = new Schema({
    _id: { type: String, "default": Types.ObjectId().toHexString() },
    rankName: String,
    permissions: Object
});

// I'm so proud of you, you managed to write 5 lines of code without a single error :)