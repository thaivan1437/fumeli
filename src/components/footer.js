import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box mt={8} py={3} bgcolor="primary.main" color="white">
      <Box textAlign="center">
        <Typography variant="body1">
          © 2023 Next.js Demo.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
