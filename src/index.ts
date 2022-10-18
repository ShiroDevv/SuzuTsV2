//! Shiro discord bot not being added till the end of spookcord
//* Importing external modules
import { terminal } from "terminal-kit";
import glob from "glob";
import dotenv from "dotenv";
import fs from "fs";

//* Importing my modules
//! This is a custom library made by my, and implements Eris too
import Shiro from "shirojs";
import { SetupSuzu } from "./suzu/suzu";

//* Getting env variables
dotenv.config();

//* Checking the environment variables
if (process.env.SUZU_TOKEN === undefined) throw new Error("Missing suzu token");
if (process.env.SHIRO_TOKEN === undefined) throw new Error("Missing shiro token");

const suzu = new Shiro.CommandClient(process.env.SUZU_TOKEN, {
    intents: ["all"]
}, {
    ignoreBots: true,
    ignoreSelf: true,
    prefix: ".",
    name: "suzu",
    description: "Suzu, a general purpose discord bot"
});

//* Shiro discord bot, not available rn
// const shiro = new Shiro.CommandClient(process.env.SHIRO_TOKEN, {
//     intents : ["all"]
// }, {
//     ignoreBots : true,
//     ignoreSelf : true,
//     prefix : "s!",
//     name : "shiro",
//     description : "Shiro, a helper for Suzu"
// });

//* Once the suzu bot is ready.
suzu.on("ready", () => {
    //? Logging an info table to the console
    LogTable();
})

//* Variables for the table
let suzuLatestError = "None";
let lines = 0;

SetupSuzu(suzu);

//* If there is an error for the bot, update the table
suzu.on("error", (err, id) => {
    suzuLatestError = err.message;
    LogTable();
})

//* Resize the table when the console is resized
process.stdout.on("resize", () => {
    LogTable();
})

//* Extra functions
async function LogTable() {
    console.clear();
    terminal.table([
        ["Bot info", "Shiro & Suzu"],
        ["Suzu Tag", suzu.user.username + "#" + suzu.user.discriminator],
        ["Suzu Server Counr", `${suzu.guilds.size}`],
        ["Suzu Members", getSuzuMembers()],
        ["Suzu Status", "Online"],
        ["Website Status", "Not created"],
        ["Developed by", "SuzuDev/Shiro"],
        ["Github", "github.com/SuzzuDev/Suzu.ts"],
        ["Suzu : Latest Error", suzuLatestError],
        ["Total code size", `${lines}`],
        ["Shiro.js Library Link", "https://github.com/Suzzudev/Shiro.js"]
    ], {
        hasBorder: true,
        contentHasMarkup: true,
        borderChars: "lightRounded",
        borderAttr: { color: "blue" },
        textAttr: { bgColor: "default" },
        wordWrap: true
    })
}

function getSuzuMembers() {
    let memberCount = 0;
    suzu.guilds.forEach((guild) => {
        memberCount += guild.memberCount;
    });

    return `${memberCount}`;
}