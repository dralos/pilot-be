const http = require("http");
require("dotenv").config();
const app = require("./app");
const server = http.createServer(app);


const port = parseInt(process.env.PORT) || 8080;


// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});