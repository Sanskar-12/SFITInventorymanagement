const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  try {
    const newStore = new Store({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
      image: req.body.image
    });

    const result = await newStore.save();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).send("Error adding store");
  }
};


// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores };
