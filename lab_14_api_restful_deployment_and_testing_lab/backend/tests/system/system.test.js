const request = require("supertest");
const app = require("../../app");

describe("System Testing: REST API Integrity and Routes Verification", () => {
  test("System sanity check: Root health endpoint should be up and serve correct JSON", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("application/json");
    expect(res.body).toHaveProperty("message");
    expect(res.body.endpoints).toHaveProperty("patients");
    expect(res.body.endpoints).toHaveProperty("weather");
    expect(res.body.endpoints).toHaveProperty("news");
  });

  test("System Routing: Weather endpoint returns correct headers and CORS allowance", async () => {
    const res = await request(app)
      .get("/api/weather/Karachi")
      .set("Origin", "http://localhost:3000");
    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
    expect(res.headers["content-type"]).toContain("application/json");
  });

  test("System Routing: News endpoint returns correct headers and CORS allowance", async () => {
    const res = await request(app)
      .get("/api/news/pk")
      .set("Origin", "http://localhost:3000");
    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
    expect(res.headers["content-type"]).toContain("application/json");
  });

  test("System Error Boundaries: Unknown routes should return 404 status", async () => {
    const res = await request(app).get("/api/nonexistent-route-xyz");
    expect(res.status).toBe(404);
  });
});
