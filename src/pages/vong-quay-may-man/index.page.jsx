import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { getAllDataThunkAction } from './logic/reducer'
import { useDispatch } from 'react-redux'
import SpinGame from './ui/spingame'
import RulesSpinGame from './ui/rules'

export default function LuckyWheel() {
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
        <RulesSpinGame />
        <SpinGame />
      </Box>
    </React.Fragment>
  )
}
