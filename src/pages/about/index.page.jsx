import React, { useEffect } from 'react'
import { getAllDataThunkAction } from './logic/reducer'
import { useDispatch } from 'react-redux'
import { Content } from './ui/content'
import '../about/index.module.scss'

const About = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getAllDataThunkAction())
    }
    void fetchAllData()
  })

  return (
    <React.Fragment>
      <Content />
    </React.Fragment>
  )
}

export default About()
