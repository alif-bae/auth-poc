let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Test Collections as Global Manager", () => {
  let jwt = "";
  before((done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        email: "global_manager@example.com",
        password: "hello123",
      })
      .end((err, res) => {
        jwt = res.body.token;
        done();
      });
  });

  it("should GET all the collections", (done) => {
    chai
      .request(app)
      .get("/collection")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should GET collection with id 2", (done) => {
    chai
      .request(app)
      .get("/collection/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should POST a new collection", (done) => {
    chai
      .request(app)
      .post("/collection/")
      .set("Authorization", jwt)
      .send({ name: "new collection", groupId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should PUT collection with id 5", (done) => {
    chai
      .request(app)
      .put("/collection/5")
      .set("Authorization", jwt)
      .send({ name: "updated collection"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should DELETE collection with id 5", (done) => {
    chai
      .request(app)
      .delete("/collection/5")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});


describe("Test Collections as Group Manager", () => {
  let jwt = "";
  before((done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        email: "manager_g1@example.com",
        password: "hello123",
      })
      .end((err, res) => {
        jwt = res.body.token;
        done();
      });
  });

  it("should GET all collections in group 1", (done) => {
    chai
      .request(app)
      .get("/collection")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should GET collection with id 2 in group 1", (done) => {
    chai
      .request(app)
      .get("/collection/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should CREATE a new collection in group 1", (done) => {
    chai
      .request(app)
      .post("/collection/")
      .set("Authorization", jwt)
      .send({ name: "new collection", groupId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should NOT CREATE a new collection in group 2", (done) => {
    chai
      .request(app)
      .post("/collection/")
      .set("Authorization", jwt)
      .send({ name: "new collection", groupId: 2 })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should EDIT collection with id 6", (done) => {
    chai
      .request(app)
      .put("/collection/6")
      .set("Authorization", jwt)
      .send({ name: "updated collection" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should NOT EDIT collection with id 5", (done) => {
    chai
      .request(app)
      .put("/collection/5")
      .set("Authorization", jwt)
      .send({ collection: "updated collection" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should DELETE collection with id 6", (done) => {
    chai
      .request(app)
      .delete("/collection/6")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it("should NOT DELETE collection with id 5", (done) => {
    chai
      .request(app)
      .delete("/collection/5")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
