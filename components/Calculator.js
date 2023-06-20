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
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Calculator = () => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [calculations, setCalculations] = useState([])
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const welcomeMessage = "Calculator is ready!";

  const handleChange = (e) => {
    setOperation(e.target.value);
  };

  useEffect(() => {
    setResult(welcomeMessage);
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    const query = {
      operation: operation,
      first: firstRef.current.value,
      second: secondRef.current.value,
    };

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
        setCalculations([...calculations, `${query.first} ${query.operation} ${query.second} is ${res.data.result}`])
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setOperation("");
    setResult(welcomeMessage);
    setCalculations("")
    firstRef.current.value = null;
    secondRef.current.value = null;
    document.activeElement.blur();
  };

  return (
    <>
    <form
      id="calculator-form"
      onSubmit={handleCalculate}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Button
        variant="outlined"
        sx={{ margin: "30px 0", width: "200px", alignSelf: "center" }}
      >
        <Link href="/bugs" target="_blank">
          bug report
        </Link>
      </Button>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={firstRef}
            />
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
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={secondRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={10}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <Button variant="outlines" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
    <ul>
      {calculations.map(calc => {
        return (
          <li>{calc}</li>
        )
      })}
    </ul>
    </>
  );
};
export default Calculator;
