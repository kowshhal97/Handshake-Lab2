var assert = require('chai').assert;
var app = require('./../server');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Handshake", function () {
    describe('Login Test', function () {

        it('Incorrect Password', () => {
            agent.post("/student/login")
                .send({ email_id: "customer@sjsu.edu", password: "password" })
                .then(function (res) {
                    
                    expect(res.status).to.equal(400);
                })
                .catch(error => {
                    
                });
        });

        it('Invalid User', () => {
            agent.post("/student/login")
                .send({ email_id: "user@sjsu.edu", password: "password" })
                .then(function (res) {
                    
                    expect(res.status).to.equal("404");
                })
                .catch(error => {
                    
                });
        });

        it('Successful Login', () => {
            agent.post("/student/login")
                .send({ email_id: "rachel.greer@gmail.com", password: "qwerty" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    
                });
        });
    });
});