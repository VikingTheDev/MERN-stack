import db, { Collection } from "mongoose";
import { rankSchema } from "../models/ranks" 

/**
 *  Honestly not sure what the best way to deal with updating perms would be. Could have a system for adding/removing individul perms, or maybe pass a object
 *  with all available perms and a true/false depending on whether or not they should have the permission or not, the latter would make more sense if ranks 
 *  will have a config page like discord (so i guess it depends if my ape brain will be able to create a system that's as intuitive as dicsord's with react)
 *  To future self: use your refreshed brain to think about this, I think my brain will melt if I think any harder than I've already done tonight.
 */

//TODO: Finish all the goddamn functions so that we can move on from this mess, and please get the JSdocs stuff done aswell


//declare models
const ranks = db.model('ranks', rankSchema);


//declare relevant interfaces
interface perms extends Array<String>{};


interface rankId{
    rankId: [
        {
            _id: string;
        }
   ];
}

interface rankObj {
    rankId: rankId;
    rankName: string;
    permissions: perms;
}

// export function for creating a new rank
export async function newRank(data: rankObj) {
    const newRank = new ranks({
        _id: data.rankId, //
        rankName: data.rankName,
        permissions: data.permissions
    })

    newRank.save(function (err:any) {
        if (err) return console.log(err);
        console.log(`Saved document`) 
    })
}

export async function deleteRank(rankId: rankId) {

}

export async function updateName(rankId: rankId, name: string) {

}

export async function addPermissions(rankId: rankId, permissions: perms) {

}

export async function removePermissions(rankId: rankId, permissions: perms) {

}