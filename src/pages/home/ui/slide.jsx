import React, { useState } from 'react';
import { Skeleton, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';

const SliderBanner = () => {
  const { slider } = useSelector((state) => state?.home);
  const newSlider = slider && slider.filter(item => item?.IsMainBanner)
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  // console.log('slider', slider, newSlider)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0',
    arrows: true,
    focusOnSelect: false,
    accessibility: false,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1
        }
      }
    ]
  };

  const setting2 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  }

  return (
    <React.Fragment>
      { 
        // loading when load api
        newSlider && newSlider?.length > 0 ? 
          <>
            <Slider
              className="banner__sliderM"
              asNavFor={nav2} 
              ref={c => setNav1(c)}
              {...setting2}
            >
              { newSlider && (
                newSlider.map((item, index) => {
                  return <div className='banner__slider--main' key={item.CreateDate}>
                    <AutoSizeImage src={item.UrlImage} alt={item.link} />
                  </div>
                })
              )}
            </Slider>
            <Container maxWidth="lg">
              <Slider
                asNavFor={nav1}
                ref={c => setNav2(c)}
                {...settings}
                className="banner__slider center"
              >
                { newSlider && (
                  newSlider.map((item, index) => {
                    return <div className='banner__slider--item' key={item.CreateDate}>
                      <AutoSizeImage isResize={false} width={380} height={270}src={item.UrlSmallImage} alt={item.Link ? item.Link : 'slide image'} />
                    </div>
                  })
                )}
              </Slider>
            </Container>
          </>
        :
          <Skeleton variant="rounded" sx={{width: '100%' ,height: '600px', bgcolor: 'grey.900', margin: '20px auto'}} /> 
      }
    </React.Fragment>
  );
}

export default SliderBanner
