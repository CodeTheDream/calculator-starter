import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
  MenuItem,
  Alert,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  FocusEvent,
} from "react";

const Calculator = () => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [firstError, setFirstError] = useState("");
  const [opError, setOpError] = useState("");
  const [secondError, setSecondError] = useState("");

  const first = useRef<HTMLInputElement>(null);
  const second = useRef<HTMLInputElement>(null);
  const operationRef = useRef<HTMLSelectElement>();

  const errorCheck = (query: any) => {
    //first error
    if (query.first == "") {
      setFirstError("first field cannot be empty");
    }
    if (isNaN(Number(query.first))) {
      setFirstError("first field should be number");
    }
    // op error
    if (query.operation == "") {
      setOpError("must select operation");
    }

    // second error
    if (query.second == "") {
      setSecondError("second field cannot be empty");
    }
    if (isNaN(Number(query.second))) {
      setSecondError("second field should be number");
    }
  };

  // op change
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    switch (e.target) {
      case first.current:
        setFirstError("");
        break;
      case second.current:
        setSecondError("");
        break;
      case operationRef.current?.firstChild:
        setOpError("");
        break;
      default:
        setOpError("");
    }
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      operation: operation,
      first: first.current?.value,
      second: second.current?.value,
    };
    console.log("Query", query);

    errorCheck(query);

    if (!query.first || !query.operation || !query.second) {
      console.log({ firstError, opError, secondError });
      return;
    } else {
      console.log("else", { firstError, opError, secondError });
      axios
        // for testing with msw --> .get(`/api/calculate/add/1/2`)
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
        .then((res) => {
          setResult(res.data.result);
        })
        .catch((err) => {
          setResult(err.response.data.message);
        });
    }
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              // onChange={handleInput}
              error={!firstError ? false : true}
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={first}
              onFocus={handleFocus}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              error={!!opError}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
              onFocus={handleFocus}
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
            <TextField
              //onChange={handleInput}
              error={!!secondError}
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={second}
              onFocus={handleFocus}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            {firstError ? <Alert severity="error">{firstError}</Alert> : ""}
            {opError ? <Alert severity="error">{opError}</Alert> : ""}
            {secondError ? <Alert severity="error">{secondError}</Alert> : ""}
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
              <Typography
                align="center"
                variant="h3"
                id="result"
                data-testid="result-id"
                gutterBottom
              >
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
