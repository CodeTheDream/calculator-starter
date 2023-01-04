import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

import { useState, ChangeEvent, FormEvent } from "react";

const Calculator = (): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  // const first = useRef<HTMLInputElement>();
  // const second = useRef<HTMLInputElement>();

  /*provided type of event
   if we are not returning anythin in function you can set return type as void 
  or TS will infer its void
  */
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setOperation(e.target.value);
  };

  // adding interface to tell typescript that first and second are these types
  interface MyForm extends EventTarget {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // target (event )now is of specific interface
    const target = e.target as MyForm;
    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };

    // you need to give the type of the data
    interface Query {
      operation: string;
      first: number;
      second: number;
    }
    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        setResult(err.response.data.message);
      });
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="first" label="First Number" variant="outlined" />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="second" label="Second Number" variant="outlined" />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;
