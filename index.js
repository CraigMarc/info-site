

const http = require("http");
const url = require("url");
const fs = require("fs");

const page404 = fs.readFileSync("404.html", (err, data) => {
  if (err) throw err;
  return data;
});


http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    //console.log(q.pathname)
    let filename = "";
    if (q.pathname === "/") {
      filename = "." + "/index.html";
    } 
  
    else {
      filename = "." + q.pathname;
    }
    console.log(filename)
    fs.readFile(filename, function (err, data) {
        
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(page404);
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
