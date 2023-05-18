import React, {useState, useEffect} from 'react';
import { Box, Typography, Grid, ButtonGroup, Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AutoSizeImage from '@/components/image';
import SliderMission from './slider'

const Daily = () => {
	const [daily, setDaily] = useState([]);
	const {missionCategory, configMission} = useSelector((state) => state?.mission);

	const today = new Date();
	daily.filter(event => event.StartTime <= today && today <= event.EndTime);
	daily.filter(event => event.CategoriesCampaignId <= 0);

	console.log(daily);

	useEffect(() => {
		if(daily?.length == 0 && missionCategory?.length) {
			const dailyList = missionCategory && missionCategory.filter(item => item.IsDaily);
			dailyList && dailyList[0].Campaigns && setDaily(dailyList[0].Campaigns);
		}
	}, [missionCategory && missionCategory.length]);


	// handle pagination
	const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(daily.length / ITEMS_PER_PAGE);
  const displayData = daily.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
	const handleClick = (page) => {
    setCurrentPage(page);
  };

	const missionImage = '/images/mission-default.png';

	const idInviteConfig = configMission?.find(item =>  item.Key == "InviteFriend")
	const idLuckyConfig = configMission?.find(item =>  item.Key == "LuckyWheelCampaign")


	const itemList = (item, isOrder = 0)=> {
		let url = ''
		if (parseInt(idInviteConfig?.Value) == item.Id) {
			// url = 'nhiem-vu/invite.html'
			url = `tham-gia/other/${item.TitleLink}/${item.Id}.html`
		} else if (parseInt(idLuckyConfig?.Value) == item.Id) {
			url = `tham-gia/daily/${item.TitleLink}/${item.Id}.html`
		} else {
			url = `tham-gia/daily/${item.TitleLink}/${item.Id}.html`
		}
		return <Grid key={item.CreateDate} item xs={12} sm={4} md={4} className={''}>
			<Link href={url} className='custom'>
				<Box style={{ minHeight: 210, display: 'flex', alignItems: 'start' }} className='mission__images'>
					<AutoSizeImage
						src={item.ImagePath ? item.ImagePath : missionImage}
						alt={item.Title}
						isResize={false}
						width={420}
						height={270}
					/>
				</Box>
				<Box>
					<Typography variant="h6" component="h6" color={'#fff'}>
						{item.Title}
					</Typography>
					<Typography my={0} variant="p" component="p" color={'#fff'}>
						{item.Amount ? item.Amount + ' Fpoint' : ''}
					</Typography>
					<Box className="wrap__btn--more css__btn custom" mx={0} my={2}>
						<Button variant="contained" className="w206" mx={0}>
							THAM GIA
						</Button>
					</Box>
				</Box>
			</Link>
		</Grid>
	}

  return (
    <React.Fragment>
			<SliderMission />
			<Box className="bg-common">
				<Container>
					<Typography pt={4} variant="h4" component="h2" color={'#fff'} className='fs-48 fw-b mb-28'>
						NHIỆM VỤ HẰNG NGÀY
					</Typography>
					<Box my={4} sx={{ flexGrow: 1, padding: 0 }} className="mission custom">
						<Grid container columnSpacing={{ xs: 2}} my={4} rowSpacing={{ xs: 2 }} columns={{ xs: 12, sm: 8, md: 12 }} >
							{
								displayData.map((item) => (
									itemList(item)
								))
							}
							
						</Grid>
					</Box>
					<Box my={2} className="minigame__item" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<ButtonGroup className="css__btn" variant="contained" aria-label="button group">
							{
								[...Array(maxPage)].map((_, index) => (
									<Button key={index} onClick={() => handleClick(index + 1)}>
										{index + 1}
									</Button>
								))
							}
						</ButtonGroup>
					</Box>
				</Container>
			</Box>
			
		</React.Fragment>
  );
}

export default Daily;