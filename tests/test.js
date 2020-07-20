'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../app.js');

const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/catalog/search?Test').expect(200).end(function(err, result) {
        console.log("result.body: " + JSON.stringify(result.body));
        test.string(JSON.stringify(result.body)).contains('results');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
    });
  });  
});
