import * as React from 'react'
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  ButtonGroup
} from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import GiftTransactionModal from '../modal/giftTransaction'

const Bag = () => {
  const [open, setOpen] = React.useState(false)
  const [showGiftTranscationModal, setGiftModal] = useState(false)
  const [gift, setGift] = useState('')


  
  const ITEMS_PER_PAGE = 4
  const { userGift, userGiftHistory } = useSelector((state) => state?.userDetail)
  console.log('userGift', userGift, userGiftHistory)
  userGift.sort((a, b) => b.Id - a.Id)
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(userGift.length / ITEMS_PER_PAGE)
  const displayData = userGift.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const handleClick = (page) => {
    setCurrentPage(page)
  }




  // const hotItems = userGift.filter((item) => item.isHot === true)
  const distributeClick = () => {
    setOpen(!open)
  }
  const openGiftTransactionModal = (e) => {
    const giftFilterById = userGift.filter((item) => item.Id == e)
    setGift(giftFilterById)
    setGiftModal(true)
  }
  const closeGiftTransactionModal = () => {
    setGiftModal(false)
    setGift('')
  }

  return (
    <Container>
      <Typography variant="h4" className="titleGiftTransaction" mt={4}>
        CỬA HÀNG ĐỔI QUÀ
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* phâm loại */}

          <Grid container spacing={2} mt={{ md: 4, xs: 2 }}>
            {displayData &&
              displayData.map((item, index) => {
                return (
                  <Grid key={item.Id} item xs={12} md={6}>
                    <Box>
                      <Image
                        src={item.ImagePath}
                        alt={item.Title}
                        width={446}
                        height={251}
                        className="gift__item-image"
                      />
                      <Typography
                        mt={2}
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="white"
                        className="gift__item-title"
                      >
                        {item.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="white"
                        className="gift__item-price"
                      >
                        {item.FpointValue} Fpoint
                      </Typography>
                      <div className="wrap__btn--more css__btn">
                        <Button
                          variant="contained"
                          className="btn__transaction"
                          value={item.Id}
                          onClick={(e) =>
                            openGiftTransactionModal(e.target.value)
                          }
                        >
                          ĐỔI QUÀ
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
          <Box
            mt={3}
            className="minigame__item"
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ButtonGroup
              className="css__btn"
              variant="contained"
              aria-label="button group"
            >
              {[...Array(maxPage)].map((_, index) => (
                <Button key={index} onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} mb={4} mt={{ xs: 2 }}>
          <hr style={{ marginBottom: '4%' }} className="hr" />
          <Typography variant="h5" className="titleHotItem">
            SẢN PHẨM HOT
          </Typography>
          {/* <Box mt={{ md: 4, xs: 2 }}>
            <ul className="hot_item__ul">
              {hotItems &&
                hotItems.map((item, index) => {
                  return (
                    <li key={item.Id} className="hot_item__li">
                      <div className="hot_item__image_container">
                        <Image
                          src={item.ImagePath}
                          alt={item.Title}
                          width={68}
                          height={68}
                          className="hot_item__image"
                        />
                      </div>
                      <div
                        className="hot_item__text_container"
                        style={{ color: '#fff' }}
                      >
                        <Typography variant="body1" className="hot_item__title">
                          {item.Title}
                        </Typography>
                        <Typography variant="body2" className="hot_item__value">
                          {item.FpointValue} Fponit
                        </Typography>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </Box> */}
        </Grid>
      </Grid>

      {showGiftTranscationModal ? (
        <GiftTransactionModal gift={gift} onClose={closeGiftTransactionModal} />
      ) : null}
    </Container>
  )
}

export default Bag;