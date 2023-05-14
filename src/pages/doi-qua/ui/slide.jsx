import * as React from 'react'
import { Typography } from '@mui/material'
import { Container, Box } from '@mui/system'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import { useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AutoSizeImage from '@/components/image'
import GiftTransactionModal from '../modal/giftTransaction'

const NewItem = () => {
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
  }

  const closeGiftTransactionModal = () => {
    setGiftModal(false)
    setGift('')
  }
  const openGiftTransactionModal = (e) => {
    const giftFilterById = giftData.filter((item) => item.Id == e)
    setGift(giftFilterById)
    setGiftModal(true)
  }

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" className="titleGiftTransaction" pt={4}>
          SẢN PHẨM MỚI
        </Typography>
      </Container>
      <Slider className="hot__item center" {...settings}>
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
                    style="width:'100%"
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
