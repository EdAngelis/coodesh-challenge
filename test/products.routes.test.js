import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";
import app from "../src/app.js";
import repository from "../src/repository/product.repository.js";
import { ObjectId } from "mongodb";

describe("GET PUT /products", () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(repository, "fetch");
  });

  afterEach(() => {
    sinon.restore();
  });

  after(() => {
    process.exit(0);
  });

  it("should return One Product", async () => {
    const product = {
      _id: new ObjectId(),
      code: 123456,
      url: "https://example.com",
      imported_t: "2020-02-07T16:00:00Z",
    };
    fetchStub.resolves(product);

    const res = await request(app)
      .get(`/products/${product.code}`)
      .set("x-api-key", "my-api-key");

    expect(res.status).to.equal(200);
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
    sinon.stub(repository, "fetchAll").resolves(products);
    const res = await request(app)
      .get("/products")
      .set("x-api-key", "my-api-key");
    expect(res.body.length).to.equal(1);
  });

  it("should update One Product", async () => {
    const product = {
      _id: new ObjectId(),
      code: 123456,
      url: "https://example.com",
      imported_t: "2020-02-07T16:00:00Z",
    };
    sinon.stub(repository, "update").resolves(product);

    const res = await request(app)
      .put(`/products/${product.code}`, {
        url: "https://example.com.br",
      })
      .set("x-api-key", "my-api-key");

    expect(res.status).to.equal(200);
  });

  it("should Soft Delete the product", async () => {
    const product = {
      _id: new ObjectId(),
      code: 123456,
      url: "https://example.com",
      imported_t: "2020-02-07T16:00:00Z",
      status: "published",
    };
    sinon.stub(repository, "softDelete").resolves(product);
    const res = await request(app)
      .put(`/products/delete/${product.code}`)
      .set("x-api-key", "my-api-key");

    expect(res.status).to.equal(200);
  });
});
