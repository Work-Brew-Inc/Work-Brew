const { Router } = require("express");
const CafeShop = require("../Controller/CafeShop");
const FindCoffeeShops = require("../Controller/FindCoffeeShops");
const user = require("../Controller/User");
const router = Router();

router.post("/BrewCoffee", CafeShop.BrewingCoffee, (req, res) =>
  res.status(200).json(res.locals.Coffee)
);

router.get("/OrderCoffee", CafeShop.FindCoffee, (req, res) => {
  res.status(200).json(res.locals.CafeShop);
});

router.patch("/EnchantCoffee", CafeShop.EnchantCoffee, (req, res) => {
  if (req.enchantError) {
    return res.status(500).json({ success: false, message: req.enchantError });
  }
  res.status(200).json({ success: true, message: "Coffee enchanted successfully!" });
});

router.delete("/DumpCoffee", CafeShop.DumpCoffee, (req, res) => {
  res.status(200).send("Coffee has been dumped");
});

router.get("/WakeMeUp", FindCoffeeShops.getUsersLocation, (req, res) => {
  res.status(200).json(res.locals.coffeeShops);
});

router.get("/speed", user.speed, (req, res) => {
  res.status(200).json(res.locals.test);
});

module.exports = router;
