const express = require("express");
const router = express.Router();
const FormSchema = require("../models/Schemas/FormSchema");
const products = require("../assets/products.json");

router.post("/saveForm", async (req, res) => {
  try {
    const formData = new FormSchema(req.body);
    const savedData = await formData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
});

router.post("/fetchBannedProduct", async (req, res) => {
  try {
    const { bloodType } = req.body;
    const bannedProduct = products.filter((product) => {
      const groupBloodNotAllowed = product.groupBloodNotAllowed;
      return groupBloodNotAllowed.some(
        (forbiddenGroup, index) => forbiddenGroup && bloodType[index]
      );
    });
    bannedProduct.forEach((product) => {
      console.log("Title:", product.title);
    });

    res.status(200).json({ bannedProduct });
  } catch (error) {
    console.error("Error to fetch :", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
