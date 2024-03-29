import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Toolbar,
  Button,
} from '@mui/material'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { axiosInstance } from '@/utils/api'
import NotiModal from '../modal/notiModal'
import SpinTurnTransactionModal from '../modal/spinTurnTransaction'
import { getAllDataThunkAction } from '../logic/reducer'
import { useDispatch } from 'react-redux'
import { format, isToday } from 'date-fns';

const SpinGame = () => {
  const dispatch = useDispatch()
  const spinGiftItemData = useSelector((state) => state.spinGiftItem)

  const spinGiftItem = spinGiftItemData.spinGiftItem.sort(
    (a, b) => a.Percentage - b.Percentage
  )
  const [isDisabled, setIsDisabled] = useState(false)

  const [showNotiModal, setGiftModal] = useState(false)
  const [gift, setGift] = useState('')
  const [outofTurn, setoutofTurn] = useState(false)

  const [showSpinTurnTransactionModal, setTransactionModal] = useState(false)

  const openSpinTurnTransactionModal = () => {
    setTransactionModal(true)
  }

  const closeSpinTurnTransactionModal = () => {
    setTransactionModal(false)
  }

  const openOutOfTurnModal = () => {
    setoutofTurn(true)
    setGiftModal(true)
    setGift('')
  }

  const openGiftTransactionModal = (e) => {
    setGift(e)
    setGiftModal(true)
  }

  const closeGiftTransactionModal = () => {
    setGiftModal(false)
    setGift('')
  }

  const [user, setUser] = useState('')

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username) {
      setUser(userData)
    }
  }, [])


  const userSpinTurnData = useSelector(
    (state) => state.spinGiftItem.spinturn || []
  )
  useEffect(() => {
    axiosInstance
      .get(
        `api/UserSpinGame/getallclientbyuserid/${user.userid}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        const createdToday = response.data.filter((item) => item.isFree == true).some((item) => {
          const createDate = new Date(item.CreateDate);
          return isToday(createDate);
        });
        if (!createdToday) {
          axiosInstance
            .post(
              'api/UserSpinGame/create',
              {
                Active: true,
                CreateDate: currentTime,
                CreateUser: user.username,
                UserId: user.userid,
                isFree: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            .then((response) => {
              dispatch(getAllDataThunkAction())
            })
            .catch((error) => {
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [user])


  const [spinTurn, setSpinTurn] = useState(userSpinTurnData.length || 0)

  useEffect(() => {

    const userSpinTurn = userSpinTurnData.length || 0;
    setSpinTurn(userSpinTurn)
  }, [userSpinTurnData])

  const currentTime = new Date().toLocaleTimeString()

  const playSpinGame = () => {
    if (spinTurn == 0) {
      openOutOfTurnModal()
    } else {
      const images = document.querySelectorAll('.spingame__item')

      axiosInstance.put(
        `api/UserSpinGame/update/${user.userid}`,
        {
          Id: user.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )

      setIsDisabled(true)
      setSpinTurn(spinTurn - 1)

      const spin = setInterval(() => {
        const indexitem = Math.floor(Math.random() * images.length)
        const activeImage = document.querySelector(
          '.spingame__item--img-active'
        )

        if (activeImage) {
          activeImage.classList.remove('spingame__item--img-active')
        }

        images[indexitem].classList.add('spingame__item--img-active')
      }, 100)

      setTimeout(() => {
        clearInterval(spin)
        setIsDisabled(false)

        const percentage = Math.random()
        let prizeIndex = null
        let sum = 0

        for (let i = 0; i < spinGiftItem.length; i++) {
          sum += spinGiftItem[i].Percentage
          if (percentage < sum) {
            prizeIndex = i
            break
          }
        }

        if (prizeIndex != 0) {
          const activeImage = document.querySelector(
            '.spingame__item--img-active'
          )
          activeImage.classList.remove('spingame__item--img-active')
          images[prizeIndex].classList.add('spingame__item--img-active')

          axiosInstance
            .post(
              'api/UserGiftSpin/create',
              {
                Active: true,
                CreateDate: currentTime,
                CreateUser: user.username,
                UserId: user.userid,
                GiftId: spinGiftItem[prizeIndex].GiftId,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            .then((response) => {
              openGiftTransactionModal(response.data)
              dispatch(getAllDataThunkAction())
            })
            .catch((error) => {
              openGiftTransactionModal(error)
            })
        }
      }, 4000)
    }
  }

  return (
    <>
      <Container mt={8}>
        <Box className="btn___spingame--group">
          <div className="wrap__btn--more css__btn">
            <Button
              variant="contained"
              className="css__btn__spingame"
              onClick={openSpinTurnTransactionModal}
            >
              THÊM LƯỢT
            </Button>
          </div>
          <div className="wrap__btn--more css__btn">
            <Button variant="contained" className="css__btn__spingame">
              LƯỢT QUAY: {spinTurn}
            </Button>
          </div>
          <div className="wrap__btn--more css__btn">
            <Button
              disabled={isDisabled}
              variant="contained"
              className="css__btn__spingame play--spin--game"
              onClick={playSpinGame}
            >
              {isDisabled ? 'Đang quay...' : 'BẮT ĐẦU'}
            </Button>
          </div>
        </Box>
        <Grid container spacing={2} my={{ md: 4, xs: 2 }}>
          {spinGiftItem &&
            spinGiftItem.map((item, index) => {
              return (
                <Grid key={item.Id} item xs={4} md={2}>
                  <Box className="spingame__item">
                    <Image
                      src={item.ImagePath}
                      alt={item.Id}
                      width={172}
                      height={176}
                      className="spingame__item--img "
                    />
                    <Typography
                      mt={2}
                      gutterBottom
                      color="white"
                      className="spingame__item--title "
                    >
                      {item.Text}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
        </Grid>
      </Container>
      {showNotiModal ? (
        <NotiModal
          gift={gift}
          outofTurn={outofTurn}
          onClose={closeGiftTransactionModal}
        />
      ) : null}

      {showSpinTurnTransactionModal && (
        <SpinTurnTransactionModal onClose={closeSpinTurnTransactionModal} />
      )}
    </>
  )
}

export default SpinGame
