import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Videos = () => {
	const {video} = useSelector((state) => state?.home);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    lazyLoad:'ondemand',
    centerMode: true,
    variableWidth: true,
    centerPadding: '20px',
    arrows: true
  };

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'}>
          VIDEO HOT
        </Typography>
        <Typography variant="p" my={2} color="initial" sx={{width: '432px', fontSize: '14px', display: 'block'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>
      <Slider className="video__slider center" {...settings}>
        { video && (
          video.map((item, index) => {
            return <div className='video__slider--item' key={item.CreateDate}>
              <img src={item.ThumbnailPath} alt={item.Title} />
            </div>
          })
        )}
      </Slider>
    </React.Fragment>
  );
}

export default Videos;