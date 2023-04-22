// configuration Variables
const config = require('config');

// Importing project model
const Project = require("../../models/project");
const Log = require('../../models/log');

// Importing necessary packages
const chai = require("chai")
const chaiHttp = require("chai-http");
const app = require("../../app");

chai.should();
chai.use(chaiHttp);

describe("Project", () => {
    afterEach((done) => {
        Project.deleteMany({
            title: { $regex:'.*', $options:'i' }
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
     * Test the get all route
     */
    describe("Get all projects", () => {
        it("Should return all projects", (done) => {
            chai.request(app)
                .get('/api/projects')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                done();
                });
        });
    });

    /**
     * Test posting a project
     */
    describe("Post projectpost", () => {
        it("Should be able to post a project", (done) => {
            const projectpost = {
                "title": "A closer look at the most conventional but useless practices in delelopment",
                "body": "llksajdf ldsfjalkdsfjasdf safdkjflasjdfklsa fsklfjsdlfjs dflkdsjfls fd…",
                "coverPhoto": "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
              };
            
            chai.request(app)
              .post('/api/projects')
              .set("jwt",`${config.TOKEN}`)
              .send(projectpost)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('id');
                done();
              });
        });
    });

    /**
     * Test retrieving a projectpost by ID
     */
    describe('Retrieving a project by ID', () => {
        it("Should be able to get post by ID", (done) => {
            const projectpost = {
                title: "A closer look at the most conventional but useless practices in delelopment",
                body: "llksajdf ldsfjalkdsfjasdf safdkjflasjdfklsa fsklfjsdlfjs dflkdsjfls fd…",
                coverPhoto: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
                rest: "jsadkjfldksajf dsflsjdafl sdaofeuwlr qwejoirewquyoqrewqoreywrqwjl ewoiryuqweruwoeqrowqe roiweroilkdsfoiewq ewrfnweqkrhkn,sdnrfoi se",
                shortDescr: 'flksdjflkjsdlkfjsdlf',
                publish: false
              };
            
            project = new Project(projectpost);
            project.save()
              .then(result => {
                const id = result._id;
                chai.request(app)
                    .get('/api/projects/' + id)
                    .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.should.be.a('object');
                            res.body.data.should.have.property('title');
                            res.body.data.should.have.property('body');
                            res.body.data.should.have.property('coverPhoto');
                        done();
                    })
              })
              .catch(err => {
                console.log(err);
              })
        });
    });
    /**
     * Test deleting a projectpost by ID
     */
    describe('Deleting a project by ID', () => {
        it("Should be able to delete post by ID", (done) => {
            const projectpost = {
                title: "A closer look at the most conventional but useless practices in delelopment",
                body: "llksajdf ldsfjalkdsfjasdf safdkjflasjdfklsa fsklfjsdlfjs dflkdsjfls fd…",
                coverPhoto: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
                rest: "Etienne kagaba",
                shortDescr: 'flksdjflkjsdlkfjsdlf',
                publish: false
              };
            
            project = new Project(projectpost);
            project.save()
              .then(result => {
                const id = result._id;
                chai.request(app)
                    .delete('/api/projects/' + id)
                    .set("jwt",`${config.TOKEN}`)
                    .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.should.be.a('object');
                            res.body.data.should.have.property('id');
                            res.body.data.id.should.be.eql(`${id}`);
                        done();
                    })
              })
              .catch(err => {
                console.log(err);
              })
        });
    });
    /**
     * Test updating a project
     */
    describe("Project Updating", () => {
        it("Should be able to update a project", (done) => {
            const projectpost = {
                title: "A closer look at the most conventional but useless practices in delelopment",
                body: "llksajdf ldsfjalkdsfjasdf safdkjflasjdfklsa fsklfjsdlfjs dflkdsjfls fd…",
                coverPhoto: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
                rest: "dsafkdjfakdsfsdlkjfldjsf ldsfj dflkjsdfla fj sdkjfhsdkfhs af asdnf,sdnfiaseudhriuewjr we huidfsd",
                shortDescr: 'flksdjflkjsdlkfjsdlf',
                publish: false
            };
            project = new Project(projectpost);
            project.save()
                .then(result => {
                    const id = result._id;
                    const update = {
                        title: "update",
                        body: "llksajdf ldsfjalkdsfjasdf safdkjflasjdfklsa fsklfjsdlfjs dflkdsjfls fd…",
                        coverPhoto: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                    };
                    chai.request(app)
                        .patch('/api/projects/' + id)
                        .set("jwt",`${config.TOKEN}`)
                        .send(update)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.should.have.property('id');
                            res.body.data.id.should.be.eql(`${id}`);
                            done();
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});