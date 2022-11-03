import handler from "../../pages/api/calculate/[...params]";

// Mock objects
const getReqObject = (method, params) => {
    return {
        method: method,
        query: { params },
    }
}

const getResObject = () => {
    return {
        _status: null,
        _json: null,
        status: function (s) {
            this._status = s;
            return this;
        },
        json: function (j) {
            this._json = j;
            return this;
        },
    }
}



describe('Tests calculate api handler', () => {
    it('returns valid results with valid params', () => {
        const req = getReqObject("GET", ["add", 1, 1]);
        const res = getResObject();
        handler(req, res);
        expect(res._status).toBe(200);
        expect(res._json).toEqual({ result: 2 });
    })

    it('wrong method param responds with 500 and error', () => {
        const req = getReqObject("PUT", ["add", 1, 1]);
        const res = getResObject();
        handler(req, res);
        expect(res._status).toBe(500);
        expect(res._json).toEqual({ message: `Unsupported method ${req.method}. Only GET method is supported` });
    })

    it('wrong query param responds with 200 and error', () => {
        const req = getReqObject("GET", ["no", 1, 1]);
        const res = getResObject();
        handler(req, res);
        expect(res._status).toBe(500);
        expect(res._json).toEqual({ message: `Unsupported operation ${req.query.params[0]}` });
    })

    it('throws an error if query params are less than 3', () => {
        const req = getReqObject("GET", [1, 1]);
        const res = getResObject();
        handler(req, res);
        expect(res._status).toBe(500);
        expect(res._json).toEqual({ message: `Query params should have 3 items. Received ${req.query.params.length}: ${req.query.params}` });
    })

    // it('throws an error if query params fail', () => {
    //     const req = getReqObject("GET", []);
    //     const res = getResObject();
    //     handler(req, res);
    //     expect(res._status).toBe(500);
    //     expect(res._json).toEqual({ message: `Failed to process query params. Received:${req.query.params}` });
    // })

})