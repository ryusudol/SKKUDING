const utilsMiddleware = {
  printIPAddress: (req, _, next) => {
    console.log(req.ip);
    next();
  },

  sendNotFound: (_, res) => {
    res.status(404);
    res.send({ error: "Page Not Found" });
  },
};

export default utilsMiddleware;
