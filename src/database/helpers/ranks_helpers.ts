import db, { Collection } from "mongoose";
import { rankSchema } from "../models/ranks";

//declare models
const ranks = db.model('ranks', rankSchema);


//declare relevant interfaces
export interface rankObj {
    rankName: string;
    permissions: permsObj;
}

interface updateCB {
    (cb: {err: { bool: boolean, data: any}, completed: boolean}): void;
}

interface getCB {
    (cb: {err: { bool: boolean, data: any}, data: object}): void;
}

interface newCB {
    (cb: {err: { bool: boolean, data: any}, completed: boolean, data?: any}): void;
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
export async function newRank(data: rankObj, cb: newCB) {
    await ranks.find({rankName: data.rankName}, (err, docs) => {
        if(!docs[0]) {
            let perms: permsObj = new permsObj(data.permissions);
            const newRank = new ranks({ 
                rankName: data.rankName, 
                permissions: perms
            })
 
            newRank.save(function (err:any) { 
                cb({err: { bool: err ? true : false, data: err}, completed: true, data: newRank}); 
            })
        } else {
            cb({err: { bool: true, data: 'Rank name already exists'}, completed: false});
        }
    })
}

// export function for deleting a rank
export async function deleteRank(rankId: string, cb: newCB) {
    await ranks.findByIdAndDelete(rankId, null, (err, doc) => {
        if (doc) {
            cb({err: { bool: err ? true : false, data: err}, completed: true});
        } else {
            cb({err: { bool: err ? true : false, data: err}, completed: false});
        }
    })
}

// export function for updating the name
export async function updateName(rankId: string, name: string, cb: updateCB) {
    await ranks.find({rankName: name}, async (err, docs) => {
        if(!docs[0]) {
            await ranks.findByIdAndUpdate(rankId, {$set: {rankName: name}}, {useFindAndModify: false}, (err, doc) => {
                if (doc) {
                    cb({
                        err: 
                        { 
                            bool: err ? true : false, 
                            data: err
                        }, 
                        completed: true
                    });
                } else {
                    // ! This callback won't work for some reason
                    cb({
                        err: 
                        { 
                            bool: true,
                            data: 'Rank could not be found'
                        }, 
                        completed: false
                    });
                }
            })       
        } else {
            cb( {
                err: 
                { 
                    bool: true, 
                    data: 'Rank name already exists'
                }, 
                completed: false
            })
        }

    })
}

// export function for updating the permissions
export async function updatePerms(rankId: string, data: permsObj, cb: updateCB) {
    let perms: permsObj = new permsObj(data);
    await ranks.findByIdAndUpdate(rankId, {$set: {permissions: perms}}, {useFindAndModify: false}, (err, doc) => {
        if (doc) {
            cb({err: { bool: err ? true : false, data: err}, completed: true});
        } else {
            cb({err: { bool: err ? true : false, data: err}, completed: false});
        }
    })
}

// export function for getting and returning a rank in a cb
export async function getRank(rankId: string, cb: getCB) {
    await ranks.findById(rankId, '', null, (err, doc) => {
        cb({err: { bool: err ? true : false, data: err}, data: doc});
    })
}