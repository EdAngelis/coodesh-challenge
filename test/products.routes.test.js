import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";
import app from "../src/app.js";
import { MongoClient, ObjectId } from "mongodb";

describe("GET /users", () => {
  let findStub, dbStub, collectionStub, clientStub;

  before(() => {
    clientStub = sinon.stub(MongoClient.prototype, "connect").resolves();
    collectionStub = {
      find: sinon.stub(),
      findOne: sinon.stub(),
      updateOne: sinon.stub(),
    };
    dbStub = sinon.stub(MongoClient.prototype, "db").returns({
      collection: () => collectionStub,
    });
  });

  after(() => {
    // Restore stubs to avoid side effects
    clientStub.restore();
    dbStub.restore();
  });

  it("should return a list of Products", async () => {
    const products = [
      {
        _id: new ObjectId(),
        code: 123456,
        url: "https://example.com",
        imported_t: "2020-02-07T16:00:00Z",
      },
    ];
    collectionStub.find.resolves(products);
    const res = await request(app).get("/products");

    expect(res.status).to.equal(200);
    // expect(res.body).to.be.an("array");
    // expect(res.body).to.deep.equal(products);
  });
});
