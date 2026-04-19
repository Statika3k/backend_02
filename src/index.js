const http = require("http");
const getUsers = require("./modules/users");

const PORT = 3003;
const HOST = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);
  const userName = url.searchParams.get("hello");

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(getUsers()));
    response.end();
    return;
  }

  else if (userName) {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${userName}`);
    response.end();
    return;
  }

  else if (request.url === "/?hello" || request.url === "/?hello=") {
    response.statusCode = 400;
    response.statusMessage = "Bad request";
    response.setHeader("Content-Type", "text/plain");
    response.write("Enter a name");
    response.end();
    return;
  }

  else if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
    return;
  }

  else {
    response.statusCode = 500;
    response.statusMessage = "Server error";
    response.setHeader("Content-Type", "text/plain");
    response.write("");
    response.end();
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу: http://${HOST}:${PORT}`);
});