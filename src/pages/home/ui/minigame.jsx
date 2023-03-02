import React from 'react';
import { Box, Button, Typography, ButtonGroup } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';

const MiniGame = () => {
  const {miniGame} = useSelector((state) => state?.home);

  return (
    <Box py={3} className="minigame">
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'}>
          MINI GAMES
        </Typography>
        <Box className="minigame__item" my={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {
            miniGame && miniGame.map((item, index) => {
              if (index > 2) {
                return
              }
              return (
                <Box key={item.CreateDate} p={2} className="minigame__item--logo">
                  <img src={item.Image} alt={item.Title} />
                  <Typography variant="h6" color="initial" sx={{ textAlign: 'center'}}>
                    {item.Title}
                  </Typography>
                </Box>
              )
            })
          }
        </Box>
        <Box className="minigame__item" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonGroup className="css__btn" variant="contained" aria-label="button group">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default MiniGame;
