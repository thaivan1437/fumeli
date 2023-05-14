import React, {useState, useEffect} from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AutoSizeImage from '@/components/image';

const Tournaments = () => {
	const [matchs, setMatchs] = useState([]);
	const [isActive, setIsActive] = useState();
	const { match, matchCategory } = useSelector((state) => state?.home);
	useEffect(() => {

		if(matchs?.length == 0 && match?.length) {
			setMatchs(match);
		}
	}, [match && match.length]);

	const handleShowMatchByCategory = (e) => {
		const id = e.currentTarget.getAttribute('data-id');
		const newMatch = matchCategory && matchCategory.filter(item => item.Id == id);
		newMatch && newMatch[0].Matchs && setMatchs(newMatch[0].Matchs);
		setIsActive(id);
	}

  return (
    <React.Fragment>
			<Box>
				<Typography variant="h4" component="h2" color={'#fff'} className='fw-b fs-48'>
					GIẢI ĐẤU
				</Typography>
				<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#fff', background:"none!important"}} className='category__match tournament'>
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem  className='divider'/>}
						spacing={1}
					>
						{
							matchCategory && matchCategory.map((item) => {
								return (
									<Typography component="span" sx={{ cursor: 'pointer'}} className={`tabCategory ${isActive == item.Id ? 'active' : ''}`} key={item.CreateDate} data-id={item.Id} onClick={(e)=> handleShowMatchByCategory(e)}>{item.Title}</Typography>
								)
							})
						}
					</Stack>
				</Box>
				{
					matchs && matchs.map((item, _) => {
						return (
							<Box key={`${item.CreateDate}_${item.Id}`} className="tournament__item" p={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<Box className="tournament__item--images" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
									<Box p={2} className="tournament__item--logo">
										<AutoSizeImage src={item.LogoTeamOnePath} alt="tournament" />
										<Typography variant="h6" color="white" sx={{ textAlign: 'center', display: 'flex', alignItems: 'end'}}>
											G2
										</Typography>
									</Box>
									<Box px={2} sx={{}} className="tournament__item--center">
										<img src="/images/home/vs.png" alt="nvm" />
									</Box>
									<Box p={2} className="tournament__item--logo">
										<AutoSizeImage src={item.LogoTeamTwoPath} alt="nvm" />
										<Typography variant="h6" color="white" sx={{ textAlign: 'center', display: 'flex', alignItems: 'end'}}>
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
									<Link href={item.TitleLink} variant="contained" color="white">
										Xem trận đấu
									</Link>
								</Box>
							</Box>
						)
					})
				}
			</Box>
		</React.Fragment>
  );
}

export default Tournaments;
