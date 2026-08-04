import { Box } from "@mui/material";

export default function StartPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
    >
      <h1>Welcome!</h1>
      <p>Where would you like to go next?</p>
    </Box>
  );
}
