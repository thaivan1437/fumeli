import React, { useEffect } from 'react';
import { getAllDataThunkAction } from './logic/reducer';
import { useDispatch } from 'react-redux';
import AboutChild from './ui/about'

export default function About() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getAllDataThunkAction());
    }
    void fetchAllData();
  }, [dispatch]);

  return (
    <React.StrictMode>
      <AboutChild />
    </React.StrictMode>
  )
}

