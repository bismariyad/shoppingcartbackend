var express = require("express");
var router = express.Router();
var productmodel = require("../models/product.js");
const fs = require("fs");
const path = require("path");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017";


const products = require("../bin/database/Product.js");
const datafile = path.join(__dirname, "../bin/database/product.json");


router.get("/Product", (req, res) => {
  return res.send(products);
});
router.post("/add", async(req, res) => {
  const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;

  const newproduct = new productmodel({
    // "productId" : products.length+1,
    productName: productname,
    productWeight: productweight,
    productWeightMetrics: productweightmetrics,
    productHeight: productheight,
    productHeightMetrics: productheightmetrics,
    productColors: productcolors,
    productDescription: productdescription,
  });
  const validatedproduct = newproduct.validator();
  const newProduct = new products(newproduct);
  if (validatedproduct.status) {
    //products.push(newproduct);
    try {
      console.log("bisma");
      await newProduct.save();
    res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.send(JSON.stringify(validatedproduct));
  }
});

router.get("/Product/:id", (req, res) => {
  const idmatch = products.find((s) => s.productId === parseInt(req.params.id));
  console.log(idmatch);
  if (!idmatch) {
    return res.status(200).send("id not found");
  }
  return res.send(idmatch);
});

router.put("/Product/:id", (req, res) => {
  const {
    productname,
    productweight,
    productweightmetrics,
    productheight,
    productheightmetrics,
    productcolors,
    productdescription,
  } = req.body;
  const id = products.find((s) => s.productId === parseInt(req.params.id));
  const newproduct = new productmodel({
    // "productId" : products.length+1,
    productName: productname,
    productWeight: productweight,
    productWeightMetrics: productweightmetrics,
    productHeight: productheight,
    productHeightMetrics: productheightmetrics,
    productColors: productcolors,
    productDescription: productdescription,
  });

  const editvalidate = newproduct.validator();
  if (editvalidate.status) {
    id.productName = productname;
    id.productWeight = productweight;
    id.productWeightMetrics = productweightmetrics;
    id.productHeight = productheightmetrics;
    id.productHeightMetrics = productheightmetrics;
    id.productColors = productcolors;
    id.productDescription = productdescription;

    return res.status(200).send(id);
    writedata(products);
  } else {
    return res.send(JSON.stringify(editvalidate));
  }
});

router.delete("/Product/:id", (req, res) => {
  const id = products.find((u) => u.productId === parseInt(req.params.id));
  const index = products.findIndex(
    (b) => b.productId === parseInt(req.params.id)
  );
  if (index >= 0) {
    products.splice(index, 1);
  }

  return res.send(id);
});

function writedata(products) {
  const jsonstring = JSON.stringify(products, null, 2);
  fs.writeFile(datafile, jsonstring, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("file write successfully");
    }
  });
}

module.exports = router;
