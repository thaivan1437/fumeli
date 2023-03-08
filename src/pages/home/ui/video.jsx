import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';

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
    centerMode: true,
    variableWidth: false,
    centerPadding: '400px',
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1,
          variableWidth: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1,
          variableWidth: false,
        }
      }
    ]
  };

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'}>
          VIDEO HOT
        </Typography>
        <Typography variant="p" my={2} color="initial" className="mw-440" sx={{ fontSize: '14px', display: 'block'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>
      <Slider className="video__slider center" {...settings}>
        { video && (
          video.map((item) => {
            return <div className='video__slider--item' key={item.CreateDate}>
              <AutoSizeImage isResize={false} src={item.ThumbnailPath} alt={item.Title} width={777} height={440}/>
            </div>
          })
        )}
      </Slider>
    </React.Fragment>
  );
}

export default Videos;