import {Schema} from "mongoose";

export const rankSchema = new Schema({
    rankName: { type: String, "default": "" },
    permissions: { type: Array, "default": [] }
});

// I'm so proud of you, you managed to write 6 lines of code without a single error :)