let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Test Roles as Global Manager", () => {
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

  it("should GET all the roles", (done) => {
    chai
      .request(app)
      .get("/role")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should GET role with id 2", (done) => {
    chai
      .request(app)
      .get("/role/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should POST a new role", (done) => {
    chai
      .request(app)
      .post("/role/")
      .set("Authorization", jwt)
      .send({ role: "new role", groupId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should PUT role with id 6", (done) => {
    chai
      .request(app)
      .put("/role/6")
      .set("Authorization", jwt)
      .send({ role: "updated role"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should DELETE role with id 6", (done) => {
    chai
      .request(app)
      .delete("/role/6")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});


describe("Test Roles as Group Manager", () => {
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

  it("should GET all roles in group 1", (done) => {
    chai
      .request(app)
      .get("/role")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should GET role with id 2 in group 1", (done) => {
    chai
      .request(app)
      .get("/role/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should CREATE a new role in group 1", (done) => {
    chai
      .request(app)
      .post("/role/")
      .set("Authorization", jwt)
      .send({ role: "new role", groupId: 1 })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should NOT CREATE a new role in group 2", (done) => {
    chai
      .request(app)
      .post("/role/")
      .set("Authorization", jwt)
      .send({ role: "new role", groupId: 2 })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should EDIT role with id 7", (done) => {
    chai
      .request(app)
      .put("/role/7")
      .set("Authorization", jwt)
      .send({ role: "updated role" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should NOT EDIT role with id 5", (done) => {
    chai
      .request(app)
      .put("/role/5")
      .set("Authorization", jwt)
      .send({ role: "updated role" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should DELETE role with id 7", (done) => {
    chai
      .request(app)
      .delete("/role/7")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it("should NOT DELETE role with id 5", (done) => {
    chai
      .request(app)
      .delete("/role/5")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
