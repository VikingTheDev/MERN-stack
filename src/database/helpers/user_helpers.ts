import db, { Collection } from "mongoose";
import { userSchema } from "../models/user"

// Todo: Finish todos in the file and start doing jsdocs

//declare models
const users = db.model('users', userSchema);


// declare all interfaces used for helpers

interface ranks extends Array<String>{};

interface tags extends Array<String>{};

interface userObj {
    username: string;
    password: string;
    email?: string;
    userinfo: {
        discordId?: string;
        registerDate: number;
        ranks?: ranks;
        tags?: tags;
    };
}


// Declare and export all functions needed for adding, updating and removing users.

export function newUser (data: userObj) {
    // Todo - Add a check to see if the username is taken
    const newUser = new users({
        username: data.username,
        password: data.password,
        userinfo: {
            registerDate: data.userinfo.registerDate
        }
    })

    newUser.save(function (err:any) {
        if (err) return console.log(err);
        console.log(`Saved document`) 
    })
}

export async function updateUserDiscordId (name: string, data: string) {
    // Todo: add check to see if discord id already exists
    const id = await findId(name);
    users.findByIdAndUpdate(id, {$set: {'userinfo.discordId': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s ID`)
    });
}

export async function addUserRanks (name: string, tempdata: ranks) {
    const id = await findId(name);
    const data: any = tempdata;
    users.findByIdAndUpdate(id, {$addToSet: {'userinfo.ranks': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s roles`);
    })
}

export async function removeUserRank (name: string, rankId: string) {

}

export async function addUserTags (name: string, tempdata: tags) {
    const id = await findId(name);
    const data: any = tempdata;
    users.findByIdAndUpdate(id, {$addToSet: {'userinfo.tags': data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated tags for ${name}`);
    })
}

export async function updateUserName (name: string, data: string) {
    // Todo: add check to see if username exists before changing
    const id = await findId(name);
    users.findByIdAndUpdate(id, {$set: {username: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s username to: ${data}`);
    });
}

export async function updateUserPassword (name: string, data: string) {
    const id = await findId(name);
    users.findByIdAndUpdate(id, {$set: {password: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s password`)
    })
}

export async function updateUserEmail (name: string, data: string) {
    // Todo: add check to see if email exists
    const id = await findId(name);
    users.findByIdAndUpdate(id, {$set: {email: data}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        console.log(`Updated ${name}'s email`)
    })
}

export async function deleteUser (name: string) {
    const id = await findId(name);
    users.findByIdAndDelete(id, null, (err) => {
        if (err) return console.log(err);
        console.log(`User ${name} has been deleted`)
    })
}

export async function removeRank (name: string, rankId: number) {
    const id = await findId(name);
}

export async function removeTag(name: string, tag: string) {

}

async function findId (name: string) {
    return await users.find({username: name}, '_id');
}