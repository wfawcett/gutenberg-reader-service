var express = require('express');
var app = express();
const axios = require('axios');
const CatalogController = require("./controllers/catalog.controller");
const catalog = new CatalogController();
const GutenbergController = require("./controllers/gutenberg.controller");
const gutenberg = new GutenbergController();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/catalog/search', async (req, res)=>{
  try{
    return await catalog.search(req,res)  
  } catch (error){
    return res.status(500).sent("Something broke: " + error.message);
  }
  
});

app.get('/files/:bookId/:fileId', async (req,res)=> {
  try{
    return await gutenberg.getFile(req,res);
  } catch (error){
    return res.status(500).sent("Something broke: " + error.message);
  }
});

module.exports = app;