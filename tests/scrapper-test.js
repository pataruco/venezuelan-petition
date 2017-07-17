const should  = require("chai").should();
const expect = require("chai").expect;
const supertest = require("supertest");
const api  = supertest("http://www.parliament.uk");
const assert = require("assert");
const cheerio = require('cheerio');

describe("Scrapper", () => {
     describe("GET http://www.parliament.uk", () =>{
          it ("should return 200 OK", (done)=>{
               api
               .get("/")
               .set("Accept", "application/json")
               .expect(200, done);
          });
     });

     describe("GET MPs index page", () =>{
          it ("should return 200 OK", (done)=>{
               api
               .get("/mps-lords-and-offices/mps/")
               .set("Accept", "application/json")
               .expect(200, done);
          });

     });


          // it ("should return an array of MP show pages links OK", ( )=>{
          //      api
          //      .get("/mps-lords-and-offices/mps/")
          //      .set("Accept", "application/html")
          //      .expect(200)
          //      .then( response  => {
          //           // console.log( response );
          //           let $ = cheerio.load( response.body );
          //           let links = $('table > tbody > tr > td > a');
          //           console.log( links );
          //      })
          // });
});
