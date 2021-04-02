import db, { Collection } from "mongoose";
import { userSchema } from "../models/user"

// Todo: Finish todos in the file, add functions to get and remove stuff and start doing jsdocs

//declare models
const users = db.model('users', userSchema);

// declare all interfaces used for helpers

interface rank {
    rankName: string;
    rankId: number;
    permissions: string[];
}
interface ranks extends Array<rank>{};
interface tags extends Array<String>{};
interface userObj {
    username: string;
    password: string;
    email?: string;
    userinfo?: {
        discordId?: string;
        registerDate?: number;
        ranks?: ranks;
        tags?: string[];
    };
}

export function newUser (data: userObj) {
    // Todo - Add a check to see if the username is taken
    const newUser = new users({
        username: data.username,
        password: data.password,
        userinfo: {
            registerDate: data.userinfo?.registerDate
        }
    })

    newUser.save(function (err:any) {
        if (err) return console.log(err);
        console.log(`Saved document`) 
    })
}

export async function updateUserDiscordId (name: string, data: string) {
    // Todo: add check to see if discord id already exists
    const id = await users.find({username: name}, '_id');
    users.findByIdAndUpdate(id, {$set: {'userinfo.discordId': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s dID`)
    });
}

export async function pushUserRanks (name: string, tempdata: ranks) {
    const id = await users.find({username: name}, '_id');
    const data: any = tempdata;
    users.findByIdAndUpdate(id, {$addToSet: {'userinfo.ranks': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s roles`);
    })
}

export async function pushUserTags (name: string, tempdata: tags) {
    const id = await users.find({username: name}, '_id');
    const data: any = tempdata;
    users.findByIdAndUpdate(id, {$addToSet: {'userinfo.tags': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated tags for ${name}`);
    })
}

export async function updateUserName (name: string, data: string) {
    // Todo: add check to see if username exists before changing
    const id = await users.find({username: name}, '_id');
    users.findByIdAndUpdate(id, {$set: {username: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s username to: ${data}`);
    });
}

export async function updateUserPassword (name: string, data: string) {
    // Todo: - add check to ensure old password != new password
    //        - a password strength checker 
    //          (strenght checker might be done in front end)
    const id = await users.find({username: name}, '_id');
    users.findByIdAndUpdate(id, {$set: {password: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s password`)
    })
}

export async function updateUserEmail (name: string, data: string) {
    // Todo: add check to see if email exists
    const id = await users.find({username: name}, '_id');
    users.findByIdAndUpdate(id, {$set: {email: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s email`)
    })
}