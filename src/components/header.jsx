import Link from 'next/link';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6"  sx={{mr: 2}}>Home</Typography>
        </Link>
        <Link href="/redux-example">
          <Typography variant="h6" sx={{mr: 2}}>Redux example</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
