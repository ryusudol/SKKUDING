import express from "express";

import restaurantMiddleware from "./routes/restaurant.js";
import userMiddleware from "./routes/user.js";
import utilsMiddleware from "./routes/utils.js";

const app = express();
app.use(express.json());

/* IP Address */
/************ */
app.use(utilsMiddleware.printIPAddress);

/* Restaurant */
/************ */
app.get("/", restaurantMiddleware.findAllRestaurants); // 모든 식당 데이터 검색
app.get("/restaurant/:name", restaurantMiddleware.findRestaurantByName); // 특정 식당 데이터 검색
app.post("/restaurant", restaurantMiddleware.addNewRestaurant); // 식당 데이터 추가
app.delete("/restaurant", restaurantMiddleware.deleteRestaurant); // 식당 정보 삭제
app.patch("/restaurant/:name", restaurantMiddleware.changeRestaurantData); // 식당 정보 변경

/* User */
/****** */
app.post("/login", userMiddleware.tryLogin); // 로그인
app.post("/signup", userMiddleware.trySignUp); // 회원가입

app.get("*", utilsMiddleware.sendNotFound);

app.listen(4000, () => {
  console.log("Server is listening to 4000 . . .");
});
