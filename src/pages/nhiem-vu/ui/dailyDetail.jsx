
import React, { useState, useEffect } from 'react';
import { getMissionComplete, createMissionComplete } from '../logic/reducer';
import { useSelector, useDispatch } from 'react-redux';
import InviteFrinedPage from './invite'
import LuckyWheel from '../../vong-quay-may-man/index.page'
import CheckInDetail from './checkInDetail'
const DailyDetail = ({
  id
}) => {
  const {missionCategory, configMission} = useSelector((state) => state?.mission);
  const dispatch = useDispatch();
  useEffect(() => {
    if(id) {
      async function fetchDataCheckIn() {
        await dispatch(getMissionComplete(id));
      }
      void fetchDataCheckIn();
    }
  }, [id]);

  const idInviteConfig = configMission?.find(item =>  item.Key == "InviteFriend")
	const idLuckyConfig = configMission?.find(item =>  item.Key == "LuckyWheelCampaign")
  
  console.log(id, idInviteConfig, idLuckyConfig)
  return (
    <React.StrictMode>
      {
        id == parseInt(idInviteConfig?.Value) && <InviteFrinedPage />
      }
      {
        id == parseInt(idLuckyConfig?.Value) && <LuckyWheel />
      }
      {
        id != parseInt(idInviteConfig?.Value) && id != parseInt(idLuckyConfig?.Value) && <CheckInDetail id={id} />
      }
    </React.StrictMode>
  )
}

export default DailyDetail;