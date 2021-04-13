import {Schema, Types} from "mongoose";

export const rankSchema = new Schema({
    _id: { type: String, "default": Types.ObjectId().toHexString() },
    rankName: String,
    permissions: Object
});