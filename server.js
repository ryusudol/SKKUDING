// server.js
const { exec } = require("child_process");
const fs = require("fs");
const http = require("http");

// create server
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/code") {
    let code = "";

    // 데이터 받아서 code 변수에 추가
    req.on("data", (chunk) => {
      code += chunk;
    });

    // myPy.py 파일에 전달받은 Python 코드 저장한 후 실행한 결과로 응답
    req.on("end", () => {
      fs.writeFileSync("myPy.py", code);

      exec("python myPy.py", (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ result: stdout.trim() }));
      });
    });
  }
});

// 3000번 port로 listen
server.listen(3000, () => {
  console.log("The server is listening on port 3000 . . .");
});
