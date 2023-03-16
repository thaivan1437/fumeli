import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { getAllDataThunkAction } from './logic/reducer'
import { useDispatch } from 'react-redux'
import { Store } from './ui/store'
import NewItem from './ui/slide'

export default function GiftTransaction() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getAllDataThunkAction())
    }
    void fetchAllData()
  }, [dispatch])

  return (
    <React.Fragment>
      <Box className="bgPage">
        <NewItem />
        <Store />
      </Box>
    </React.Fragment>
  )
}
