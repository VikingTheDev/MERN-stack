import db, { Collection } from "mongoose";
import { rankSchema } from "../models/ranks";

// ! Consider adding CBs to the mongoose callbacks instead of logging in console (for API purposes), maybe an object: {err: bool, completed: bool, msg: string}

//declare models
const ranks = db.model('ranks', rankSchema);


//declare relevant interfaces
export interface rankObj {
    rankName: string;
    permissions: permsObj;
}

interface permsObj {
    master_user?: boolean;
    manage_users?: boolean;
    manage_site?: boolean;
    manage_shop?: boolean;
    access_tickets?: boolean;
    access_order_logs?: boolean;
}


// Define class used to construct the permission object
class permsObj {
    constructor (data: permsObj) {
        this.master_user = data.master_user ? true : false;
        this.manage_users = data.manage_users ? true : false;
        this.manage_site = data.manage_site ? true : false;
        this.manage_shop = data.manage_shop ? true : false;
        this.access_tickets = data.access_tickets ? true : false;
        this.access_order_logs = data.access_order_logs ? true : false; 
    }
}

// export function for creating a new rank
export async function newRank(data: rankObj) {
    await ranks.find({rankName: data.rankName}, (err, docs) => {
        if(err) return console.log(err);
        if(!docs[0]) {
            let perms: permsObj = new permsObj(data.permissions);
            const newRank = new ranks({ 
                rankName: data.rankName, 
                permissions: perms
            })
 
            newRank.save(function (err:any) { 
                if (err) return console.log(err);
                console.log(`Saved document`); 
            })
        } else {
            console.log(`A rank with the name ${data.rankName} already exists`);
        }
    })
}

// export function for deleting a rank
export async function deleteRank(rankId: string) {
    await ranks.findByIdAndDelete(rankId, null, (err, doc) => {
        if(err) return console.log(err);
        if(doc) {
            console.log(`Rank has been deleted`);
        } else {
            console.log(`The rank could not be found`);
        }
    });
}

// export function for updating the name
export async function updateName(rankId: string, name: string) {
    await ranks.findByIdAndUpdate(rankId, {$set: {rankName: name}}, {useFindAndModify: false}, (err, doc) => {
        if(err) return console.log(err);
        if(doc) {
            console.log(`Name has been updated`);
        } else {
            console.log(`Rank could not be found`);
        }
    })
}

export async function updatePerms(rankId: string, data: permsObj) {
    let perms: permsObj = new permsObj(data);
    await ranks.findByIdAndUpdate(rankId, {$set: {permissions: perms}}, {useFindAndModify: false}, (err, doc) => {
        if (err) return console.log(err);
        if(doc) {
            console.log(`Permissions have been updated`);
        } else {
            console.log(`Rank could not be found`);
        }
    })
}