import React, { useState } from 'react';
import { Skeleton, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import ImageModal from './imageModal';

const SliderBanner = () => {
  const { slider } = useSelector((state) => state?.home) || [];
  const newSlider = slider && slider.filter(item => item?.IsMainBanner)
  const sliderAds = slider && slider.filter(item => item?.IsCenterAdsBanner)
  const [image, setImage] = useState();
  const [imageModal, setImageModal] = useState(false);

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
    arrows: false,
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
          slidesToShow: 3,
          vertical: true,
          verticalSwiping: true
        }
      }
    ]
  };

  const setting2 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  }

  const onCloseModal = () => {
    setImageModal(false)
  }
  const openImageModal = (src) => {
    setImage(src);
    setImageModal(true);
    
  }

  return (
    <React.Fragment>
      { 
        // loading when load api
        newSlider && newSlider?.length > 0 ? 
          <>
            <Slider
              className="banner__sliderM"
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
            <Container maxWidth="lg">
              <Slider
                {...settings}
                className="banner__slider center"
              >
                { sliderAds && (
                  sliderAds.map((item, index) => {
                    return <div className='banner__slider--item' key={item.CreateDate} onClick={() => openImageModal(item.UrlImage)}>
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
      {
        imageModal &&
        <ImageModal src={image} onClose={onCloseModal}/>
      }
    </React.Fragment>
  );
}

export default SliderBanner
