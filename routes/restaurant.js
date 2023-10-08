import fs from "fs";

const restaurantDataByte = fs.readFileSync("./data/restaurants.json", "utf-8");
const restaurantData = JSON.parse(restaurantDataByte);

export const restaurants = restaurantData.restaurants;

const restaurantMiddleware = {
  findAllRestaurants: (_, res) => {
    res.send(restaurantData);
    res.status(200);
  },

  findRestaurantByName: (req, res) => {
    const name = req.params.name;
    for (const restaurant of restaurants) {
      if (name === restaurant.name) {
        res.status(200);
        res.send(restaurant);
        return;
      }
    }
    const errObj = { error: "해당 맛집 정보가 존재하지 않습니다." };
    res.status(404);
    res.send(errObj);
  },

  addNewRestaurant: (req, res) => {
    const data = req.body;
    if (!data.name || !data.address || !data.phone) {
      const errObj = {
        error: "전달한 맛집 정보가 완전하지 않습니다.",
        body: data,
      };
      res.status(400);
      res.send(errObj);
    } else {
      for (const restaurant of restaurants) {
        if (data.name === restaurant.name) {
          const errObj = { error: "이미 해당 맛집 정보가 존재합니다." };
          res.status(409);
          res.send(errObj);
          return;
        }
      }
      res.status(201);
      res.send(data);
    }
  },

  deleteRestaurant: (req, res) => {
    const name = req.body.name;
    for (const restaurant of restaurants) {
      if (name === restaurant.name) {
        res.status(200);
        res.send(restaurant);
        return;
      }
    }
    const errObj = { error: "해당 맛집 정보가 존재하지 않습니다." };
    res.status(404);
    res.send(errObj);
  },

  changeRestaurantData: (req, res) => {
    const name = req.params.name;
    const modifiedData = req.body;
    for (const restaurant of restaurants) {
      if (name === restaurant.name) {
        res.status(200);
        res.send(modifiedData);
        return;
      }
    }
    const errObj = { error: "해당 맛집 정보가 존재하지 않습니다." };
    res.status(404);
    res.send(errObj);
  },
};

export default restaurantMiddleware;
