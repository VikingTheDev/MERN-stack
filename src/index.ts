import express from "express";
const app = express();
const port = 3000;
import * as config from "./config.json";
import { dbConnect } from "./database/db"
import { 
    newUser, 
    updateUserDiscordId, 
    addUserRanks, 
    addUserTags,
    updateUserName,
    updateUserPassword,
    updateUserEmail,
    deleteUser
} from "./database/helpers/user_helpers"
import {
    newRank,
    rankObj,
    deleteRank,
    updateName,
    updatePerms
} from "./database/helpers/ranks_helpers"

dbConnect(config.dataBase.connectionUrl);

const user = {
    username: 'VikingTheDev',
    password: 'iamcool123',
    email: 'augshin2002@gmail.com',
    userinfo: {
        discordId: '230347924951793664',
        registerDate: Date.now(),
        ranks: [
            {
                rankName: 'Admin',
                rankId: 1,
                permissions: ['site_control', 'shop_settings', 'manage_users']
            },
            {
                rankName: 'Owner',
                rankId: 2,
                permissions: ['master_user', 'api_control']
            },
            {
                rankName: 'Support',
                rankId: 3,
                permissions: ['ticket_access', 'order_log_access']
            }
        ],
        tags: ['#discord', '#fivem', '#bot_owner', '#owner', '#support_team']
    },
}

const rank: rankObj = {
    rankName: "Owner",
    permissions: {
        master_user: true,
        manage_site: true,
    }
}

const perms = {
    master_user: false,
    access_tickets: true
}

// newRank(rank);

// updateName("6074a5a39b9e32269c95766d", "Cool Guy");

// updatePerms("6074a5a39b9e32269c95766d", perms);

// deleteRank("6074a5a39b9e32269c95766d")

app.get("/", (req, res) => {
    res.send("Hello World"); 
});

app.listen(port, () => {
    console.log(`Website is listening on localport:${port}`);
});