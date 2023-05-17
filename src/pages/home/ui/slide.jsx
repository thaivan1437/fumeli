import React, { useState, useEffect, useRef } from 'react';
import { Skeleton, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import ImageModal from './imageModal';
import { useRouter } from "next/router";

const SliderBanner = () => {
  const router = useRouter();
  const { slider } = useSelector((state) => state?.home) || [];
  const newSlider = slider && slider.filter(item => item?.IsMainBanner)
  const sliderAds = slider && slider.filter(item => item?.IsCenterAdsBanner)
  const [image, setImage] = useState();
  const [imageModal, setImageModal] = useState(false);
  // Khởi tạo ref
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isClickEnabledRef = useRef(true);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
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
    ],
    onSwipe: () => {
      // Thiết lập giá trị của ref khi bắt đầu kéo slide
      isDraggingRef.current = true;
      isClickEnabledRef.current = false;
    },
    afterChange: () => {
      // Thiết lập giá trị của ref khi kết thúc kéo slide
      isDraggingRef.current = false;
      setTimeout(() => {
        isClickEnabledRef.current = true;
      }, 0);
    }
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
    ],
    onSwipe: () => {
      // Thiết lập giá trị của ref khi bắt đầu kéo slide
      isDraggingRef.current = true;
      isClickEnabledRef.current = false;
    },
    afterChange: () => {
      // Thiết lập giá trị của ref khi kết thúc kéo slide
      isDraggingRef.current = false;
      setTimeout(() => {
        isClickEnabledRef.current = true;
      }, 0);
    }
  }

  const onCloseModal = () => {
    setImageModal(false)
  }
  const openImageModal = (src) => {
    if (!isDraggingRef.current && isClickEnabledRef.current) {
      router.push(src);
    }
  }

  // Thêm sự kiện click vào slider để thiết lập giá trị của ref
  useEffect(() => {
    const sliderNode = sliderRef.current;
    if (sliderNode && sliderNode.querySelector) { // kiểm tra sliderNode và xem có thể sử dụng querySelector hay không
      const handleClickOutside = (e) => {
        if (isDraggingRef.current) {
          e.stopPropagation();
          isClickEnabledRef.current = false;
          setTimeout(() => {
            isClickEnabledRef.current = true;
          }, 0);
        }
      };
      sliderNode.querySelector('.slick-list').addEventListener('click', handleClickOutside, true);
      return () => {
        sliderNode.querySelector('.slick-list').removeEventListener('click', handleClickOutside, true);
      };
    }
  }, []);


  return (
    <React.Fragment>
      { 
        // loading when load api
        newSlider && newSlider?.length > 0 ? 
          <>
            <Slider
              className="banner__sliderM"
              {...setting2}
              ref={sliderRef}
            >
              { newSlider && (
                newSlider.map((item) => {
                  return <div className='banner__slider--main cursor-pointer' key={item.CreateDate} onClick={() => openImageModal(item.Link)}>
                    <AutoSizeImage src={item.UrlImage} alt={item.link} />
                  </div>
                })
              )}
            </Slider>
            <Container maxWidth="lg">
              <Slider
                {...settings}
                className="banner__slider center"
                ref={sliderRef}
              >
                { sliderAds && (
                  sliderAds.map((item, index) => {
                    return <div className='banner__slider--item cursor-pointer' key={item.CreateDate} onClick={() => openImageModal(item.Link)}>
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
