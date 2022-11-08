import { Typography, Container, Stack, Button } from "@mui/material";
import Calculator from "../components/calculator";
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Stack>
        <Link href={{ pathname: '/nonAmaz', }} style={{ textDecoration: 'none' }} passHref>
          <Button variant="contained" color="primary" id='otherPageBtn'>Other Page</Button>
        </Link>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator />
      </Stack>
    </Container>
  );
}

