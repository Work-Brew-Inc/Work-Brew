const supabase = require("../Models/model.js");
const CafeShop = {};

CafeShop.BrewingCoffee = async (req, res, next) => {
  console.log("Brewing dear customer\'s coffee!");
  const {
    id,
    name,
    distance,
    price,
    products,
    time_visited,
    wifi,
    noise,
    outlets,
    ergononmics,
    standing_table,
    bathrooms,
    temperature,
    parking,
    accessibility,
    location,
  } = req.body;
  try{
  const { data, error } = await supabase
    .from("coffee_shop")
    .insert({
      id,
      name,
      distance,
      price,
      products,
      time_visited,
      wifi,
      noise,
      outlets,
      ergononmics,
      standing_table,
      bathrooms,
      temperature,
      parking,
      accessibility,
      location,
    })
    .select("*");

  if (error) {
    console.log(error);
    return next({
      log: "problem in CafeShop, we ran out of Coffee Beans",
      message: { err: error },
    });
  }

  res.locals.Coffee = data[0];

  next();
  } catch(error) {
    console.error("Unexpected error in Brewing Coffee:", error);
    return next(error);
  }
};

CafeShop.FindCoffee = async (req, res, next) => {
  console.log("Finding a coffee shop...");
  try {
    const { data, error } = await supabase.from("coffee_shop").select("*");
    console.log("Fetched coffee shop data:", data);
    res.locals.CafeShop = data;
    if (error) {
      console.error("Error Finding Coffee Shops", error);
      req.CafeShop = "Failed to Find your Coffee Shop ;(";

      return next();
    }
    next();
  } catch (error) {
    console.error("Unexpected error in Brewing Coffee:", error);
    return next(error);
  }
};

CafeShop.EnchantCoffee = async (req, res, next) => {
  console.log("Enchanting dear customer's Coffee!");
  const { id, column, newValue } = req.body;
  try {
    const { data, error } = await supabase
      .from("coffee_shop")
      .update({ [column]: newValue })
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error enchanting coffee:", error);
      req.enchantError = "Failed to Enchance your coffee ;(";

      next();
    }
    next();
  } catch (error) {
    console.error("Unexpected error in Enchant Coffee:", error);
    return next(error);
  }
};

CafeShop.DumpCoffee = async (req, res, next) => {
  console.log("Coffee splattered everywhere!");
  const { rowId } = req.body;
  try {
    const { data, error } = await supabase
      .from("coffee_shop")
      .delete()
      .eq('id', rowId)

      if (error) {
        console.log("Can't dump perfectly good coffee");
        return next({
          log: "Failed to dump coffee",
          message: { error },
        });
      };

    next();
  } catch (error) {
    console.Error("Can't dump perfectly good coffee", error);
    return next(error); // Pass the error object to the error handling middleware
  }
};

module.exports = CafeShop;
