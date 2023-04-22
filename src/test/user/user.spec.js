// configuration Variables
const config = require('config');

// Importing user model
const User = require("../../models/user");
const Log = require('../../models/log');

// Importing necessary packages
const chai = require("chai")
const chaiHttp = require("chai-http");
const app = require("../../app");

chai.should();
chai.use(chaiHttp);

describe("User", () => {
    afterEach((done) => {
        User.deleteMany({
            email: { $regex:'.*', $options:'i' }
        })
        .then(result => {
            Log.deleteMany({ action: { $regex:'.*', $options:'i' } })
                .then(result3 => {
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        });
    });

    /**
     * Test posting a user
     */
    describe("Post user", () => {
        it("Should be able to sign up a user", (done) => {
            const userpost = {
                "name": "Dwayne Campbell",
                "email": "juankirkland04@gmail.com",
                "password": "T3st!234"
              };
            
            chai.request(app)
              .post('/api/user/signup')
              .set("jwt",`${config.TOKEN}`)
              .send(userpost)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('user');
                    res.body.data.should.have.property('token');
                done();
              });
        });
        it("Should be able to login a user", (done) => {
            const userpost = {
                "name": "Dwayne Campbell",
                "email": "juankirkland05@gmail.com",
                "password": "T3st!234"
              };
            const user = new User(userpost);

            user.save()
            .then(result => {
                const credentials = {
                    "email": "juankirkland05@gmail.com",
                    "password": "T3st!234"
                  };
                chai.request(app)
                .post('/api/user/login')
                .send(credentials)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('user');
                        res.body.data.should.have.property('token');
                    done();
                });
            });
        });
    });
});