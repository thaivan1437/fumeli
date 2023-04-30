import React, { useEffect } from 'react'
import InfoUser from './ui/userFu'
import { getAllDataThunkAction } from './logic/reducer'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import LayoutUserPage from './ui/avatar'

export default function UserDetail() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getAllDataThunkAction())
    }
    void fetchAllData()
  }, [dispatch])

  return (
    <Box className="bgPage">
      <LayoutUserPage />
      <InfoUser />
    </Box>
  )
}
