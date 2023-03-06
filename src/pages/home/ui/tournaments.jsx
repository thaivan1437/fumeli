import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Tournaments = () => {
	const { match, matchCategory } = useSelector((state) => state?.home);
	// console.log('match', match, matchCategory);

  return (
    <Container>
			<Typography variant="h4" component="h2" color={'#fff'}>
				GIẢI ĐẤU
			</Typography>
			<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#fff'}}>
				{/* ALL  <span>/</span>  CS GO  <span>/</span>  DOTA 2  <span>/</span>  FORTINE  <span>/</span>  PUBG */}
				<Stack
					direction="row"
					divider={<Divider orientation="vertical" flexItem />}
					spacing={2}
				>
					{
						matchCategory && matchCategory.map((item) => {
							return (
								<span key={item.CreateDate}>{item.Title}</span>
							)
						})
					}
				</Stack>
			</Box>
			{
				match && match.map((item) => {
					return (
						<Box key={`${item.CreateDate}_${item.Id}`} className="tournament__item" p={2} my={4} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Box className="tournament__item--images" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
								<Box p={2} className="tournament__item--logo">
									<img src={item.LogoTeamOnePath} alt="tournament" />
									<Typography variant="h6" color="white" sx={{ textAlign: 'center'}}>
										G2
									</Typography>
								</Box>
								<Box px={2} sx={{}} className="tournament__item--center">
									<img src="./images/home/vs.png" alt="nvm" />
								</Box>
								<Box p={2} className="tournament__item--logo">
									<img src={item.LogoTeamTwoPath} alt="nvm" />
									<Typography variant="h6" color="white" sx={{ textAlign: 'center'}}>
										Navi
									</Typography>
								</Box>
							</Box>
							<Box className="tournament__item--info">
								<Typography variant="h6" color="white">
									{item.Title}
								</Typography>
								<Typography variant="p" color="white" className='tournament__item--desc' sx={{fontSize: '12px'}}>
									{item.Description}
								</Typography>
							</Box>
							<Box className="tournament__item--view">
								<Link href={item.TitleLink} variant="contained" color="primary">
									Xem trận đấu
								</Link>
							</Box>
						</Box>
					)
				})
			}
		</Container>
  );
}

export default Tournaments;
