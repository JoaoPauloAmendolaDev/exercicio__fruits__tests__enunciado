import httpStatus from "http-status";
import app from "index";
import supertest from "supertest";
import fruits from "../src/data/fruits"

const server = supertest(app)

describe("GET /fruits", () => {
    it("Should respond with status 200 and the fruits data", async () => {
        const response = await server.get("/fruits")

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })
})

describe("GET /fruits/:id", () => {
    it("Should respond with status 200 and the selected fruit", async () => {
        const response = await server.get("/fruits/1")
    
        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        })
    })

    it("Should respond with status 404 when id is not valid", async () => {
        const response = await server.get("/fruits/8")

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    })
})

describe("POST /fruits", () => {
    it("Should respond with status 201 and the created object", async () => {
        const body = {
            name: "teste",
            price: 69,
        }
        await server.post("/fruits").send(body)

        expect(fruits).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: fruits.length,
                    name: body.name,
                    price: body.price
                })
            ])
        )
    })

    it("Should respond with status 422 if body is in invalid format", async () =>{
        const body = {
            name: "testezinho",
            price: "96",
            test: true
        }

        const response = await server.post("/fruits").send(body)
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    })

})


