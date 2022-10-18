# Suzu Setup

## Parameters
```diff
- @param { Shiro.CommandClient } suzu
+ Discord bot to setup
```

## Use
Setup another discord bot like how I have suzu set up.

## Example
```js
// Importing the library
const Shiro = require("shirojs"); // import Shiro from "shirojs";
const SetupSuzu = require("./src/suzu/suzu.ts"); // import SetupSuzu from "./src/suzu/suzu.ts";

const bot = new Shiro.CommandClient("TOKEN", {
    intents : []
}, {
    name : "",
    prefix : ""
    //Put options here
});

SetupSuzu(bot);
```