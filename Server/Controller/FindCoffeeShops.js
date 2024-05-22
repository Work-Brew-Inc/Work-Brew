const fetch = require('node-fetch');

const FindCoffeeShops = {};

FindCoffeeShops.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

FindCoffeeShops.findNearbyCoffeeShops = async (latitude, longitude) => {
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="cafe"](around:1000,${latitude},${longitude});out body 10;`;

  try {
    const response = await fetch(overpassUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.elements.map(shop => ({
      name: shop.tags.name || "Unknown",
      latitude: shop.lat,
      longitude: shop.lon,
      distance: FindCoffeeShops.calculateDistance(latitude, longitude, shop.lat, shop.lon).toFixed(2),
      tags: shop.tags,
    })).slice(0, 5); // Limit to 5 results
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

FindCoffeeShops.getUsersLocation = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  try {
    const coffeeShops = await FindCoffeeShops.findNearbyCoffeeShops(lat, lon);
    res.locals.coffeeShops = coffeeShops;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = FindCoffeeShops;
