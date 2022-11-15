import { Typography, Container, Stack, Button } from "@mui/material";
import React from 'react';

export default function NonAmaz() {
    const [toggleText, setToggleText] = React.useState(false);

    const handleChange = () => {
        setToggleText(!toggleText)
    }

    return (
        <Container maxWidth="sm">
            <Stack>
                <Typography variant="h2" gutterBottom id='title'>
                The Non-Amazing Calculator!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    id='equationBtn'
                    className="equationBtn"
                    onClick={() => handleChange()}>
                    Calculate the unknown
                </Button>
                <Typography variant="h4" id='equationResult' >
                    {toggleText ? "Equation cannot be solved" : ""}
                </Typography>
            </Stack>
        </Container>
    )
}
