var express = require('express');
var app = express();
const axios = require('axios');
const CatalogController = require("./controllers/catalog.controller");
const catalog = new CatalogController();
const GutenbergController = require("./controllers/gutenberg.controller");
const gutenberg = new GutenbergController();

app.get('/catalog/search', async (req, res)=>{
  return await catalog.search(req,res)  
});

app.get('/files/:bookId/:fileId', async (req,res)=> {
  return await gutenberg.getFile(req,res);
});

module.exports = app;