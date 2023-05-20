import React, { useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  ButtonGroup
} from '@mui/material'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import GiftTransactionModal from '../modal/giftSpinTransaction'
import ActiveMailModal from '../modal/activeMail';
import { getSpinsHistorysData } from "../logic/reducer";
import Pagination from './pagination.jsx'
import moment from "moment/moment";

const Bag = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false)
  const [showGiftTranscationModal, setGiftModal] = useState(false)
  const [gift, setGift] = useState('')
  const [activeEmail, setActiveEmail] = useState(false)

  const { user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchAllData() {
      await Promise.all([dispatch(getSpinsHistorysData({ userId: user?.userid }))]);
    }
    void fetchAllData();
  }, [user]);

  const ITEMS_PER_PAGE = 4
  const { userGift, userGiftHistory, userDetail, spinsHistory } = useSelector((state) => state?.userDetail)
  
  const lstspinsHistory = spinsHistory.filter(history => history.Active === true);

  const EmailConfirmed = userDetail && userDetail?.EmailConfirmed;
  lstspinsHistory.sort((a, b) => b.Id - a.Id)
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(lstspinsHistory.length / ITEMS_PER_PAGE)
  const displayData = lstspinsHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(lstspinsHistory?.length / ITEMS_PER_PAGE)

  const handleClick = (page) => {
    setCurrentPage(page)
  }
  // const hotItems = userGift.filter((item) => item.isHot === true)
  const distributeClick = () => {
    setOpen(!open)
  }
  const openGiftTransactionModal = (e) => {
    if (!EmailConfirmed) {
      // open modal active email confirmation
      setActiveEmail(true);
      return
    }
    const giftFilterById = lstspinsHistory.filter((item) => item.Id == e)
    setGift(giftFilterById)
    setGiftModal(true)
  }

  const closeGiftTransactionModal = () => {
    setGiftModal(false)
    setGift('')
  }

  const closeActiveMailModal = () => {
    setActiveEmail(false)
  }

  const hotItems = spinsHistory.filter(item => item.Active === false)
  hotItems.sort((a, b) => new Date(b.UpdateDate) - new Date(a.UpdateDate));

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {displayData &&
              displayData.map((item, index) => {
                return (
                  <Grid key={item.Id} item xs={12} md={6}>
                    <Box>
                      <Image
                        src={item.ImagePath}
                        alt={item.GiftTitle}
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
                        {item.GiftTitle}
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
                          NHẬN
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
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} mb={4} mt={{ xs: 2 }} className='bag__history'>
          <Box className='bag__history--item'>
            <Typography variant="h5" className="titleHotItem">
              LỊCH SỬ ĐỔI QUÀ TẶNG
            </Typography>
            <Box>
              <ul className="hot_item__ul">
                {hotItems &&
                  hotItems.map((item, index) => {
                    return (
                      <li key={item.Id} className="hot_item__li">
                        <div
                          className="hot_item__text_container"
                          style={{ color: '#fff' }}
                        >
                          <Typography variant="body1" className="hot_item__title">
                            {item.GiftTitle}
                          </Typography>
                          <Typography variant="body2" className="hot_item__value">
                            {moment(item.UpdateDate).format(
                              "M/D/YYYY h:mm:ss A"
                            )}
                          </Typography>
                        </div>
                      </li>
                    )
                  })}
              </ul>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {showGiftTranscationModal ? (
        <GiftTransactionModal gift={gift} onClose={closeGiftTransactionModal} />
      ) : null}
      {activeEmail ? (
        <ActiveMailModal userDetail={user} onClose={closeActiveMailModal} />
      ) : null}
    </Container>
  )
}

export default Bag;