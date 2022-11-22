import { createMocks, RequestMethod, Query, createResponse, createRequest } from 'node-mocks-http';
import handler from "../../pages/api/calculate/[...params]";
import type { NextApiRequest, NextApiResponse } from 'next'

// Mock objects
// const getReqObject = (method: string, params: (string|number)[]): object => {
//     return {
//         method: method,
//         query: { params },
//     }
// }

// const getResObject = () => {
//     return {
//        _status: null,
//         _json: null,
//         status: function (s: number) {
//             this._status = s;
//             return this;
//         },
//         json: function (j: object) {
//             this._json = j;
//             return this;
//         },
//     }
// }
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('Tests calculate api handler', () => {
    function mockRequestResponse(method: RequestMethod, query: Query) {
        const {req, res}: {req: ApiRequest, res: APiResponse} = createMocks({method,query})
        return {req, res}
    }

    it('returns valid results with valid params', () => {
        // const req = getReqObject("GET", ["add", 1, 1]);
        // const res = getResObject();
        const {req, res} = mockRequestResponse("GET", {params: ["add", 1, 1]})
        handler(req, res);
        console.log(res._getJSONData())
        expect(res.statusCode).toBe(200);
        expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
        expect(res._getJSONData()).toEqual({ result: 2 })
        //expect(res._json).toEqual({ result: 2 });
    })

    it('wrong method param responds with 500 and error', () => {
        // const req = getReqObject("PUT", ["add", 1, 1]);
        // const res = getResObject();
        const {req, res} = mockRequestResponse("PUT", {params: ["add", 1, 1]})
        handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(`Unsupported method ${req.method}. Only GET method is supported` );
    })

    it('wrong query operation param responds with 200 and error', () => {
        // const req = getReqObject("GET", ["no", 1, 1]);
        // const res = getResObject();
        const {req, res} = mockRequestResponse("GET", {params: ["no", 1, 1]})
        handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(`Unsupported operation ${req.query.params[0]}`);
        //expect(res._json).toEqual({ message: `Unsupported operation ${req.query.params[0]}` });
    })

    it('throws an error if query params are less than 3', () => {
        const {req, res} = mockRequestResponse("GET", {params: [1, 1]})
        handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(`Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}`);
        // const req = getReqObject("GET", [1, 1]);
        // const res = getResObject();
        // handler(req, res);
        // expect(res._status).toBe(500);
        // expect(res._json).toEqual({ message: `Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}` });
    })

    it('throws an error if query params are more than 3', () => {
        const {req, res} = mockRequestResponse("GET", {params: [1, 1, 1, 1]})
        handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(`Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}`);
        // const req = getReqObject("GET", [1, 1, 1, 1]);
        // const res = getResObject();
        // handler(req, res);
        // expect(res._status).toBe(500);
        // expect(res._json).toEqual({ message: `Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}` });
    })

    it('throws an error if query params are empty', () => {
        const {req, res} = mockRequestResponse("GET", {params: []})
        handler(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(`Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}`);
        // const req = getReqObject("GET", []);
        // const res = getResObject();
        // handler(req, res);
        // expect(res._status).toBe(500);
        // expect(res._json).toEqual({ message: `Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}` });
    })

})