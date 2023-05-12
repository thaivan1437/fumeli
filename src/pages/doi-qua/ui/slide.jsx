import React, { useState, useEffect, useRef } from 'react'
import { Typography } from '@mui/material'
import { Container, Box } from '@mui/system'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AutoSizeImage from '@/components/image'
import GiftTransactionModal from '../modal/giftTransaction'

const NewItem = () => {
  // Khởi tạo ref
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isClickEnabledRef = useRef(true);

  const [showGiftTranscationModal, setGiftModal] = useState(false)
  const [gift, setGift] = useState('')

  const { giftData } = useSelector((state) => state?.gift) || []
  giftData.sort((a, b) => b.Id - a.Id)
  giftData.slice(0, 5)

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
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1,
          variableWidth: false,
        },
      },
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

  const closeGiftTransactionModal = () => {
    setGiftModal(false)
    setGift('')
  }
  const openGiftTransactionModal = (e) => {
    if (!isDraggingRef.current && isClickEnabledRef.current) {
      const giftFilterById = giftData.filter((item) => item.Id == e)
      setGift(giftFilterById)
      setGiftModal(true)
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
        <Typography variant="h4" className="titleGiftTransaction" pt={4}>
          SẢN PHẨM MỚI
        </Typography>
      </Container>
      <Slider className="hot__item center" {...settings}  ref={sliderRef}>
        {giftData &&
          giftData.map((item) => {
            return (
              <div
                className="hot__item--item pos--relative"
                key={item.CreateDate}
                sx={{ height: '440px!important' }}
              >
                <div
                  className="onclick__gift"
                  data-id={item.Id}
                  onClick={(e) => openGiftTransactionModal(e.target.dataset.id)}
                ></div>
                <div style={{ position: 'relative' }}>
                  <AutoSizeImage
                    isResize={false}
                    src={item.ImagePath}
                    alt={item.Title}
                    width={777}
                    height={440}
                  />
                  <div className="hot__item--info">
                    <Typography variant="body1" className="hot__item--title">
                      {item.Title}
                    </Typography>
                    <Typography variant="body2" className="hot__item--value">
                      {item.FpointValue} Fponit
                    </Typography>
                  </div>
                </div>
              </div>
            )
          })}
      </Slider>
      {showGiftTranscationModal ? (
        <GiftTransactionModal gift={gift} onClose={closeGiftTransactionModal} />
      ) : null}
    </React.Fragment>
  )
}

export default NewItem
