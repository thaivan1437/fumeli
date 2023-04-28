import React, {useState, useEffect} from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AutoSizeImage from '@/components/image';
import YoutubeModal from '@/components/modal/video';

const Tournaments = () => {
	const { match, matchCategory } = useSelector((state) => state?.match);
	useEffect(() => {
		// console.log('count loop');
		if(matchs?.length == 0 && match?.length) {
			setMatchs(match);
		}
	}, [match && match.length]);

	const [matchs, setMatchs] = useState([]);
	const [isActive, setIsActive] = useState();

	const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState("");

  const openVideoModal = (id) => {
    setShowVideoModal(true);
    setVideoId(id);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoId("");
  };
	

	const handleShowMatchByCategory = (e) => {
		const id = e.currentTarget.getAttribute('data-id');
		const newMatch = matchCategory && matchCategory.filter(item => item.Id == id);
		newMatch && newMatch[0].Matchs && setMatchs(newMatch[0].Matchs);
		setIsActive(id);
	}

  return (
    <React.Fragment>
			<Box className=''>
				<Typography variant="h4" component="h2" color={'#fff'} className='tournament__title fw-b'>
					TRẬN ĐẤU
				</Typography>
				<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#fff'}} className='category__match'>
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem />}
						spacing={2}
					>
						{
							matchCategory && matchCategory.map((item) => {
								return (
									<Typography component="span" sx={{ cursor: 'pointer'}} className={isActive == item.Id ? 'active' : ''} key={item.CreateDate} data-id={item.Id} onClick={(e)=> handleShowMatchByCategory(e)}>{item.Title}</Typography>
								)
							})
						}
					</Stack>
				</Box>
				<Box className="tournament__box">
					{
						matchs && matchs.map((item, _) => {
							console.log(item)
							return (
								<Box key={`${item.CreateDate}_${item.Id}`} className="tournament__item" p={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}  onClick={() => openVideoModal(item.VideoPath)}>
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
										<Typography variant="h6" color="white" className='fw-b'>
											{item.Title}
										</Typography>
										<Typography variant="p" color="white" className='tournament__item--desc' sx={{fontSize: '12px'}}>
											{item.Description}
										</Typography>
									</Box>
									<Box className="tournament__item--view">
										{/* <Link href={item.TitleLink} variant="contained" color="white" className='fw-b'> */}
											Xem trận đấu
										{/* </Link> */}
									</Box>
								</Box>
							)
						})
					}
				</Box>
				{showVideoModal ? (
					<YoutubeModal videoId={videoId} onClose={closeVideoModal} />
				) : null}
			</Box>
		</React.Fragment>
  );
}

export default Tournaments;