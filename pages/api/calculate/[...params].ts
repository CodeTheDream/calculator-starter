import { add, subtract, multiply, divide } from "../../../utils/calculate";
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    const queryParams = req.query.params;
    console.log("Query Params",queryParams)

    if (!Array.isArray(queryParams)) {
      throw new Error(`Query params shoud have 3 items. ${queryParams}`)
    }

    const params = extractParams(queryParams);
    console.log("params:", params)
    let result: number;
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
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
}

interface CalculatorParams {
  operation: string;
  first: number;
  second: number;
}

function extractParams(queryParams: string[]): CalculatorParams {
  console.log("array:", queryParams)
  if (queryParams.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    );
  }

  if (isNaN(Number(queryParams[1])) || isNaN(Number(queryParams[2]))) {
    throw new Error(`Failed to process query params. Received: ${queryParams}`);
  }
  const params = {
    operation: queryParams[0],
    first: Number(queryParams[1]),
    second: Number(queryParams[2]),
  };
  return params;
}

