// configuration Variables
const config = require('config');

// Importing subscriber model
const Subscriber = require("../../models/subscriber");
const Log = require('../../models/log');

// Importing necessary packages
const chai = require("chai")
const chaiHttp = require("chai-http");
const app = require("../../app");

chai.should();
chai.use(chaiHttp);

describe("Subscriber", () => {
    afterEach((done) => {
        Subscriber.deleteMany({
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
     * Test posting a subscriber
     */
    describe("Post subscriber", () => {
        it("Should be able to enlist a subscriber", (done) => {
            const subscriberpost = {
                "name": "Dwayne Campbell",
                "email": "juankirkland04@gmail.com"
              };
            
            chai.request(app)
              .post('/api/subscriber')
              .send(subscriberpost)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status');
                    res.body.status.should.be.eql('success');
                done();
              });
        });
    });
});