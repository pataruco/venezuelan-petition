const should  = require("chai").should();
const expect = require("chai").expect;
const supertest = require("supertest");
const api  = supertest("http://localhost:3000");

describe("Controller", () => {

    describe("GET /", () =>{
        it ("should return 200 OK", (done)=>{
            api
            .get("/")
            .set("Accept", "application/json")
            .expect(200, done);
        });
    });

    describe("post /getMPby=Westminster North", () =>{
        it ("should return 200 OK", (done)=>{
            api
            .post("/getMPby=Westminster North")
            .set("Accept", "application/json")
            .expect(200, done);
        });
    });
});
