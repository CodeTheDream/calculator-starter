import { add, subtract, multiply, divide } from "../../../utils/calculate";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    const params = extractParams(req.query.params);
    let result;
    switch (params.operation) {
      case "add":
        result = add(params.first, params.second);
        break;
      case "subtract":
        result = subtract(params.first, params.second);
        break;
      case "multiply":
        result = multiply(params.first, params.second);
        break;
      case "divide":
        result = divide(params.first, params.second);
        break;
      default:
        throw new Error(`Unsupported operation ${params.operation}`);
    }
    res.status(200).json({ result });
  } catch (e:any) {
    let eMsg = "unknown error";
    if (e instanceof Error) { 
      eMsg = e.message
    }
      res.status(500).json({ message: eMsg});
  }
}

/*
we know the type of queryParams because when you hover over req.query.params it 
tells you the type. It's a union type because its possibly one or many types

Since queryParams is possibly undefined you have to throw an error and not just console.log 
because otherwise code will keep running as undefined and not stop for error
*/
function extractParams(queryParams: string | string[] | undefined) {
  if (queryParams === undefined) {
    throw new Error(`${queryParams} is undefined`);

  } else if (queryParams.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    );
  }

  try {
    const params = {
      operation: queryParams[0],
      first: parseInt(queryParams[1]),
      second: parseInt(queryParams[2]),
    };

    /*
    since params can possibly be undefined we need to place a check to see if the first & second
    params are numbers
    */
    if (isNaN(params.first) || isNaN(params.second)) {
      throw new Error(
        ` first input or second input was not a number! Received ${params.first} and  ${params.second}`
      );
    }
    return params;
  } catch (e) {
    throw new Error(`Failed to process query params. Received: ${queryParams}`);
  }
}
