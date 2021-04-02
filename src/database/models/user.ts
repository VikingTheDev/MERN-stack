import {Schema} from "mongoose";

export const userSchema = new Schema({
    username: { type: String, "default": "" },
    password: { type: String, "default": "" },
    email: { type: String, "default": "" },
    userinfo: {
        discordId: { type: String, "default": "" },
        registerDate: { type: Number, "default": Date.now },
        ranks: { type: Array, "default": [] },
        tags: { type: Array, "default": [] }
    }
});