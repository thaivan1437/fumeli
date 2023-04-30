import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AutoSizeImage from '@/components/image';
import YoutubeModal from '@/components/modal/video';
import Link from 'next/link'

const HightLight = () => {
	const {match, matchCategory} = useSelector((state) => state?.match);
  const video = match && match.filter(item => item.IsHightlightVideo);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState("");

  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const openVideoModal = (id) => {
    if (dragging) {
      e.stopPropagation();
    }
    event.stopPropagation();
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
    ]
  };

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} className='fw-b tournament__title1'>
          GIẢI ĐẤU NỔI BẬT
        </Typography>
        <Typography variant="p" my={2} color={'white'} className="mw-440" sx={{ fontSize: '14px', display: 'block'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>

      <Slider className="video__slider center" {...settings}>
        { matchCategory && (
          matchCategory.map((item) => {
            return(
              <Link
                className='video__slider--item'
                key={item.CreateDate}
                href={`giai-dau/chi-tiet-giai-dau/${item.Id}`}
              >
                <AutoSizeImage isResize={false} src={`/images/match.png`} alt={item.Title} width={777} height={440}/>
                <Box className='video__slider--info'>
                  <Typography
                    component="div"
                    className={`video__slider--title`}
                  >
                    {item.Title}
                  </Typography>
                  <Typography
                    component="div"
                    className={`video__slider--desc`}
                  >
                    Giải thưởng $1.6M
                  </Typography>
                </Box>
              </Link>
            )
          })
        )}
      </Slider>

      {showVideoModal ? (
        <YoutubeModal videoId={videoId} onClose={closeVideoModal} />
      ) : null}
    </React.Fragment>
  );
}

export default HightLight;