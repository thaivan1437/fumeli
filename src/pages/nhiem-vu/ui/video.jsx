import React, { useState, useEffect } from 'react';
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
    ]
  };

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

      <Slider className="video__slider center" {...settings}>
        { video && (
          video.map((item) => {
            return <Link className='video__slider--item' key={item.CreateDate} href={item.TitleLink}>
              <AutoSizeImage isResize={false} src={item.ImagePath} alt={item.Title} width={777} height={440}/>
            </Link>
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