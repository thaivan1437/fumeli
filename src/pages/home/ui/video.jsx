import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import YoutubeModal from '@/components/modal/video';


const Videos = () => {
  const { video } = useSelector((state) => state?.home);
  const slider = useRef(null);
  const isDraggingRef = useRef(false);
  const isClickEnabledRef = useRef(true);
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

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState("");

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoId("");
  };

  const openVideoModal = (id) => {
    if (!isDraggingRef.current && isClickEnabledRef.current) {
      setShowVideoModal(true);
      setVideoId(id);
    }
  }

  // Thêm sự kiện click vào slider để thiết lập giá trị của ref
  useEffect(() => {
    const sliderNode = slider.current;
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
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} className='video__title fw-b'>
          VIDEO HOT
        </Typography>
        <Box className="d-flex justify-content-between">
          <Typography variant="p" my={2} color={'white'} className="mw-440" sx={{ fontSize: '14px', display: 'block' }}>
            Nơi tổng hợp danh sách các clip HOT, vui nhộn, các drama hàng ngày trên nền tảng internet tại Việt Nam và tổng hợp các clip do thành viên chia sẻ qua fumeli.</Typography>
          <Box className="d-flex hide-xs">
            <Box pr={1} className='previous_caro cursor' onClick={() => slider?.current?.slickPrev()}>
              <img src="/images/prev.png" />
            </Box>
            <Box pl={1} className='next_caro cursor' onClick={() => slider?.current?.slickNext()}>
              <img src="/images/next.png" />
            </Box>
          </Box>
        </Box>
      </Container>
      <Slider ref={slider} className="video__slider center" {...settings}>
        {video && (
          video.map((item) => {
            return <div className='video__slider--item cursor-pointer' key={item.CreateDate} onClick={() => openVideoModal(item.VideoPath)}>
              <AutoSizeImage isResize={false} src={item.ThumbnailPath} alt={item.Title} width={777} height={440} />
            </div>
          })
        )}
      </Slider>
      {showVideoModal ? (
        <YoutubeModal videoId={videoId} onClose={closeVideoModal} />
      ) : null}
    </React.Fragment>
  );
}

export default Videos;