const server = require("./src/Server.js");
const { conn } = require("./src/DB-Config.js");
const initalUpload = require("./src/helpers/initDB.js");
const PORT = 3001;

const Reset = "\x1b[0m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";

conn
  .sync({ force: true })
  .then(async () => {
    await initalUpload();
    server.listen(PORT, async () => {
      console.log(FgGreen, "Server listening on port:", FgYellow, PORT, Reset);
    });
  })
  .catch((error) => console.error(error));
