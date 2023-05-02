<h1 align="center">botfactory</h1>

<p align="center">
  Minimalist bot framework for <a href="https://github.com/adamant-im/adamant">ADAMANT</a>.
</p>

## Installation

You can install it using one of the popular package managers, e.g. using npm:

```
npm install adamant-botfactory
```

## Example

```js
import { createBot } from "adamant-botfactory";

const nodes = [
  "http://localhost:36666",
  "https://endless.adamant.im",
  // ...
];

const bot = createBot(process.env.PASS_PHRASE, {
  nodes,
});

bot.command("start", async (usr) => {
  const res = await usr.balance();

  usr.reply(`Hello! Your balance is ${res.balance}.`);
});

bot.start();
```
