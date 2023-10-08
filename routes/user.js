import fs from "fs";

const userByte = fs.readFileSync("./data/users.json", "utf-8");
const userData = JSON.parse(userByte);
const users = userData.users;

const userMiddleware = {
  tryLogin: (req, res) => {
    const loginData = req.body;
    for (const user of users) {
      if (loginData.id === user.id && loginData.password === user.password) {
        res.status(200);
        res.send("Successfully logged in !");
        return;
      }
    }
    const errObj = { error: "Invalid id or password . . ." };
    res.status(404);
    res.send(errObj);
  },
  trySignUp: (req, res) => {
    const newUser = req.body;
    for (const user of users) {
      if (user.id === newUser.id) {
        res.status(409);
        res.send(
          "입력하신 아이디는 이미 존재합니다. 다른 아이디를 입력해주세요."
        );
        return;
      }
    }
    res.status(201);
    res.send("Successfully created a new user !");
  },
};

export default userMiddleware;
