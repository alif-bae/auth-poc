let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Test Users as Global Manager", () => {
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
        console.log(res.body);
        jwt = res.body.token;
        done();
      });
  });

  it("should GET all the users", (done) => {
    chai
      .request(app)
      .get("/user")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should GET user with id 2", (done) => {
    chai
      .request(app)
      .get("/user/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should POST a new user", (done) => {
    chai
      .request(app)
      .post("/user/")
      .set("Authorization", jwt)
      .send({ email: "new_user@example.com", password: "hello123" })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.email.should.equal("new_user@example.com");
        done();
      });
  });

  it("should PUT user with id 6", (done) => {
    chai
      .request(app)
      .put("/user/6")
      .set("Authorization", jwt)
      .send({ email: "updated_email" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.email.should.equal("updated_email");
        done();
      });
  });

  it("should DELETE user with id 6", (done) => {
    chai
      .request(app)
      .delete("/user/6")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});


describe("Test Users as Group Manager", () => {
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
        console.log(res.body);
        jwt = res.body.token;
        done();
      });
  });

  it("should not GET all users", (done) => {
    chai
      .request(app)
      .get("/user")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should not GET user with id 2", (done) => {
    chai
      .request(app)
      .get("/user/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should not POST a new user", (done) => {
    chai
      .request(app)
      .post("/user/")
      .set("Authorization", jwt)
      .send({ email: "new_user@example.com", password: "hello123" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should not PUT user with id 2", (done) => {
    chai
      .request(app)
      .put("/user/2")
      .set("Authorization", jwt)
      .send({ email: "updated_email" })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("should not DELETE user with id 2", (done) => {
    chai
      .request(app)
      .delete("/user/2")
      .set("Authorization", jwt)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
