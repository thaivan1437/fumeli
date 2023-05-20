import React, { useRef, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import { useRouter } from 'next/router'

const HightLight = () => {
  const router = useRouter()
  const { matchCategory } = useSelector((state) => state?.match);

  // Khởi tạo ref
  const sliderRef = useRef(null);
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

  const openLink = (src) => {
    if (!isDraggingRef.current && isClickEnabledRef.current) {
      router.push(src);
    }
  }

  console.log(matchCategory);

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} className='fw-b tournament__title1 fs-48'>
          GIẢI ĐẤU NỔI BẬT
        </Typography>
        <Typography variant="p" my={2} color={'white'}  sx={{ fontSize: '14px', display: 'block' }}>
          Tổng hợp thông tin, lịch thi đấu, clip trận đấu của toàn bộ các giải đấu game lớn trong và ngoài lãnh thổ Việt Nam. Bạn có thể tùy chọn xem các trận đấu, tham gia bình chọn, trao đổi và tìm kiếm Fpoint từ việc tham gia bình chọn này. Nhanh chóng tham gia cùng Fumeli ngay để hòa mình vào các trận đấu game đỉnh cao.
        </Typography>
      </Container>

      <Slider className="video__slider center" {...settings} ref={sliderRef}>
        {matchCategory && (
          matchCategory.map((item) => {
            return (
              <Box
                className='video__slider--item cursor-pointer'
                key={item.CreateDate}
                onClick={() => openLink(`giai-dau/chi-tiet-giai-dau/${item.Id}.html`)}
              >
                <AutoSizeImage isResize={false} src={item.ImagePath} alt={item.Title} width={777} height={440} />
                <Box className='video__slider--info'>
                  <Typography
                    component="div"
                    className={`video__slider--title`}
                    color={'#fff'}
                  >
                    {item.Title}
                  </Typography>
                  <Typography
                    component="div"
                    className={`video__slider--desc`}
                    color={'#fff'}
                  >
                    {item.Prize}
                  </Typography>
                </Box>
              </Box>
            )
          })
        )}
      </Slider>
    </React.Fragment>
  );
}

export default HightLight;