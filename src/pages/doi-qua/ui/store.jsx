import * as React from 'react'
import Divider from '@mui/material/Divider'
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material'
import Image from 'next/image'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import ArchiveIcon from '@mui/icons-material/Archive'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import StarBorder from '@mui/icons-material/StarBorder'
import NativeSelect from '@mui/material/NativeSelect'
import Modal from '@mui/material/Modal'

import GiftTransactionModal from '../modal/giftTransaction'
import { closeGiftTransactionModal } from '../logic/action'

export const Store = () => {
  const [open, setOpen] = React.useState(false)

  const distributeClick = () => {
    setOpen(!open)
  }
  const ITEMS_PER_PAGE = 4
  const { giftData } = useSelector((state) => state?.gift) || []
  giftData.sort((a, b) => b.Id - a.Id)

  const hotItems = giftData.filter((item) => item.isHot === true)

  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(giftData.length / ITEMS_PER_PAGE)

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  const displayData = giftData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // const options = ['Tất cả', 'Voucher', 'Card', 'Vật phẩm']

  const [showGiftTranscationModal, setGiftModal] = useState(false)
  const [gift, setGift] = useState('')

  const openGiftTransactionModal = (e) => {
    const giftFilterById = giftData.filter((item) => item.Id == e)
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
          <Box mt={{ md: 4, xs: 2 }}>
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
          </Box>
        </Grid>
      </Grid>

      {showGiftTranscationModal ? (
        <GiftTransactionModal gift={gift} onClose={closeGiftTransactionModal} />
      ) : null}
    </Container>
  )
}
