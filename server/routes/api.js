const requester = require("request"),
  xss = require("xss");

module.exports = function (req, res) {
  const url = process.env.API + req.url.replace("/api", "");
  let options = {};
  options = {
    url: url,
    method: req.method,
    headers: {
      "X-FORWARDED-FOR": req.headers["x-forwarded-for"],
      "Content-Type": "application/json",
      "User-Agent": req.headers["user-agent"] || req.get("User-Agent"),
    },
    body: xss(JSON.stringify(req.body)),
    rejectUnauthorized: false,
  };

  if (req.headers["authorization"]) {
    options.headers["authorization"] = req.headers["authorization"];
  }

  if (req.headers['x-otp-token']) {
    options.headers['x-otp-token'] = req.headers['x-otp-token'];
  }

  if (req.headers['access-token']) {
    options.headers['access-token'] = req.headers['access-token'];
  }

  console.log(options);

  requester(options, function (error, response, body) {
    if (!error) {
      console.log(body);
      try {
        const obj = JSON.parse(xss(body));
        if (response.headers["x-total-page-count"]) {
          res.setHeader(
            "x-total-page-count",
            response.headers["x-total-page-count"]
          );
          res.setHeader(
            "x-total-elements",
            response.headers["x-total-elements"]
          );
        }
        res.status(response.statusCode).json(obj);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ code: "52401", message: "Response Parse Error" });
      }
    } else {
      console.log(error);
      res.status(500).json({
        code: "52400",
        message: "There is no API connection!",
        url: url,
        error: JSON.stringify(error),
      });
    }
  });
};
