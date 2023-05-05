import React, { useState, useEffect } from 'react';
import { Skeleton, Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import { getSlideAndMissionData} from '../../home/logic/reducer';
import { useDispatch, useSelector } from 'react-redux';

const SliderMission = () => {
  const dispatch = useDispatch();
  const { slider } = useSelector((state) => state?.home) || [];
  const newSlider = slider && slider.filter(item => item?.IsMainBanner)
  
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
    arrows: true,
  }

  return (
    <React.Fragment>
      { 
        // loading when load api
        newSlider && newSlider?.length > 0 ? 
          <>
            <Slider
              className="banner__sliderM mission__slider"
              {...setting2}
            >
              { newSlider && (
                newSlider.map((item) => {
                  return <div className='banner__slider--main' key={item.CreateDate}>
                    <AutoSizeImage src={item.UrlImage} alt={item.link} />
                  </div>
                })
              )}
            </Slider>
          </>
        :
          <Skeleton variant="rounded" sx={{width: '100%' ,height: '600px', bgcolor: 'grey.900', margin: '20px auto'}} /> 
      }
    </React.Fragment>
  );
}

export default SliderMission
