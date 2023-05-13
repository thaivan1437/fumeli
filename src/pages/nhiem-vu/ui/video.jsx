import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import YoutubeModal from '@/components/modal/video';
import Link from 'next/link'

const Video = () => {
  // Khởi tạo ref
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isClickEnabledRef = useRef(true);

	const { missionCategory } = useSelector((state) => state?.mission);
  let video = missionCategory && missionCategory.filter(item => item.IsVideo);
  video = video && video.length && video[0].Campaigns

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState("");

  const openVideoModal = (id) => {
    setShowVideoModal(true);
    setVideoId(id);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoId("");
  };

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

  const openLinkVideo = (src) => {
    if (!isDraggingRef.current && isClickEnabledRef.current) {
      window.open(src, "_blank");
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
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} className='fs-48 fw-b bd-t'>
          XEM VIDEO NHẬN QUÀ
        </Typography>
        <Typography variant="p" my={2} color={'#fff'} className="mw-440 fs-16" sx={{ display: 'block'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>

      <Slider className="video__slider center" {...settings} ref={sliderRef}>
        { video && (
          video.map((item) => {
            return <div className='video__slider--item cursor-pointer' key={item.CreateDate} onClick={() => openLinkVideo(item.TitleLink)}>
              <AutoSizeImage isResize={false} src={item.ImagePath} alt={item.Title} width={777} height={440}/>
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

export default Video;