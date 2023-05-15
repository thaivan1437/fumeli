import React, {useState} from 'react';
import { Box, Button, Typography, ButtonGroup, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import AutoSizeImage from '@/components/image';

const MiniGame = () => {
  const ITEMS_PER_PAGE = 3;
  const {miniGame} = useSelector((state) => state?.home);
  
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(miniGame.length / ITEMS_PER_PAGE);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const displayData = miniGame.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openLink = (src) => {
    window.open(src, "_blank");
  }


  return (
    <Box py={3} className="minigame">
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} className='fw-b fs-48'>
          MINI GAMES
        </Typography>
        <Grid py={2} className="minigame__item" container spacing={{ xs: 0, md: 4 }} rowSpacing={{ xs: 2 }}>
          {
            displayData && displayData.map((item, index) => {
              return (
                <Grid item key={item.CreateDate} className="minigame__item--logo cursor-pointer" xs={12} sm={4} md={4} onClick={() => openLink(item.GamePath)}>
                  <AutoSizeImage isResize={false} src={item.Image} alt={item.Title} width={430} height={430}/>
                  <Typography variant="h6" color={'white'} sx={{ textAlign: 'center'}}>
                    {item.Title}
                  </Typography>
                </Grid>
              )
            })
          }
        </Grid>
        <Box className="minigame__item" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonGroup className="css__btn" variant="contained" aria-label="button group">
            {
              [...Array(maxPage)].map((_, index) => (
                <Button key={index} onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </Button>
              ))
            }
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default MiniGame;
