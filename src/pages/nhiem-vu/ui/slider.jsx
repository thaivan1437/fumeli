import React, { useState, useEffect } from 'react';
import { Skeleton, Container, Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import { getSlideAndMissionData } from '../../home/logic/reducer';
import { useDispatch, useSelector } from 'react-redux';

const SliderMission = () => {
  const dispatch = useDispatch();
  const { slider } = useSelector((state) => state?.home) || [];
  const newSlider = slider && slider.filter(item => item?.IsMainBanner)
  const sliderAction = React.useRef(null);

  useEffect(() => {
    if (newSlider && newSlider.length === 0) {
      async function fetchData1() {
        await dispatch(getSlideAndMissionData());
      }
      void fetchData1();
    }
  }, []);

  const setting2 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: false,
  }


  return (
    <React.Fragment>
      {
        // loading when load api
        newSlider && newSlider?.length > 0 ?
          <Box className='mission__custom'>
            <Slider
              className="banner__sliderM mission__slider"
              {...setting2}
              ref={sliderAction}
            >
              {newSlider && (
                newSlider.map((item) => {
                  return <div className='banner__slider--main' key={item.CreateDate}>
                    <a href={item.Link}>
                      <AutoSizeImage isResize={false} src={item.UrlImage} alt={item.link} width={1368} height={525} />
                    </a>
                  </div>
                })
              )}
            </Slider>
            <Box className='mission__custom--btn'>
              <Container>
                <Box className="d-flex just-content-right hide-xs">
                  <Box pr={1} className='previous_caro cursor' onClick={() => sliderAction?.current?.slickPrev()}>
                    <img src="/images/prev.svg" />
                  </Box>
                  <Box pl={1} className='next_caro cursor' onClick={() => sliderAction?.current?.slickNext()}>
                    <img src="/images/next.svg" />
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
          :
          <Skeleton variant="rounded" sx={{ width: '100%', height: '600px', bgcolor: 'grey.900', margin: '20px auto' }} />
      }
    </React.Fragment>
  );
}

export default SliderMission
