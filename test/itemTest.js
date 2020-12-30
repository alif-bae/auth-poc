let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Test Items as Global Manager", () => {
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

  it("should GET all the items", (done) => {
    chai
      .request(app)
      .get("/item")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should GET item with id 2", (done) => {
    chai
      .request(app)
      .get("/item/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should POST a new item", (done) => {
    chai
      .request(app)
      .post("/item/")
      .set("Authorization", jwt)
      .send({ name: "new item", collectionId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should PUT item with id 9", (done) => {
    chai
      .request(app)
      .put("/item/9")
      .set("Authorization", jwt)
      .send({ name: "updated item"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should DELETE item with id 9", (done) => {
    chai
      .request(app)
      .delete("/item/9")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});


describe("Test Items as Group Manager", () => {
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

  it("should GET all items in group1", (done) => {
    chai
      .request(app)
      .get("/item")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should GET item with id 2 in group1, collection1", (done) => {
    chai
      .request(app)
      .get("/item/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should CREATE a new item in group1, collection1", (done) => {
    chai
      .request(app)
      .post("/item/")
      .set("Authorization", jwt)
      .send({ name: "new item", collectionId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should NOT CREATE a new item in group2, collection2", (done) => {
    chai
      .request(app)
      .post("/item/")
      .set("Authorization", jwt)
      .send({ name: "new item", collectionId: 2 })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should EDIT item with id 10", (done) => {
    chai
      .request(app)
      .put("/item/10")
      .set("Authorization", jwt)
      .send({ name: "updated item" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should NOT EDIT item with id 8", (done) => {
    chai
      .request(app)
      .put("/item/8")
      .set("Authorization", jwt)
      .send({ item: "updated item" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should DELETE item with id 10", (done) => {
    chai
      .request(app)
      .delete("/item/10")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it("should NOT DELETE item with id 8", (done) => {
    chai
      .request(app)
      .delete("/item/5")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
