const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Den not exists" });
    }

    if(targetDev.likes.includes(loggedDev._id)){
      console.log('DEU MATCH')
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    res.json(loggedDev);

  }
};
