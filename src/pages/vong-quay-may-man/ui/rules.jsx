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
import RulesModal from '../modal/rulesModal'

const RulesSpinGame = () => {
  const { imgSpinGame } = useSelector((state) => state?.spinGiftItem)

  const [showRulesModal, setRulesModal] = useState(false)

  const openRulesModal = () => {
    setRulesModal(true)
  }

  const closeRulesModal = () => {
    setRulesModal(false)
  }
  return (
    <>
      <Container mt={8}>
        <Typography mt={4} mb={4} color="white" className='main__title'>
          VÒNG QUAY MAY MẮN
        </Typography>
        <Box className="rules__block">
          <Image
            src={imgSpinGame.ImagePath}
            alt={imgSpinGame.Id}
            width={172}
            height={176}
            className="rules__block--image "
          />
        </Box>
        <Box className="btn___spingame__rules--group">
          <div className="wrap__btn--more css__btn">
            <Button
              variant="contained"
              className="css__btn__rules"
              onClick={openRulesModal}
            >
              THỂ LỆ
            </Button>
          </div>
        </Box>
        <Typography mt={2} mb={4} gutterBottom color="white">
          - Hoàn thành các nhiệm vụ đơn giản mỗi ngày để nhận lượt mở quà <br />
          - Tích lũy lượt mở quà vượt các mốc, nhận thêm quà tích lũy <br /> -
          Thời gian diễn ra sự kiện: 09.11 - 19.12 <br /> Lưu ý: 100 Fpoint = 1
          lượt quay
        </Typography>
      </Container>
      {showRulesModal && <RulesModal onClose={closeRulesModal} />}
    </>
  )
}

export default RulesSpinGame
