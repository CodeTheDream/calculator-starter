import { Typography, Container, Stack, Button } from "@mui/material";
import Calculator from "../components/Calculator";
import Heading from "../components/Heading";
import LinkButton from "../components/LinkButton";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Stack>
        <LinkButton path="/nonAmaz" variant="contained" color="primary">
          Other page
        </LinkButton>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator />
        {/* <Heading level={4} background={"blue"}>"This is my heading"</Heading> */}
      </Stack>
    </Container>
  );
}
