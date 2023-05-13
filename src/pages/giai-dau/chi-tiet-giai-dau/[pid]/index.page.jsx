import React, {useState, useEffect} from 'react';
import { Box, Typography, Divider, Stack, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getMatchDataThunkAction } from '../../logic/reducer';
import { useDispatch } from 'react-redux';
import AutoSizeImage from '@/components/image';
import YoutubeModal from '@/components/modal/video';
import { useRouter } from 'next/router';

const DetailTournament = () => {
	const router = useRouter()
  const {pid} = router.query;
	const { matchCategory } = useSelector((state) => state?.match);
	const detail = matchCategory.filter(item => item.Id == pid);
	const matchOther = matchCategory.filter(item => item.Id != pid);
	const newMtach = matchCategory && matchCategory.find(item => item.Id == pid)

	const dispatch = useDispatch();
  useEffect(() => {
    if( matchCategory && matchCategory.length == 0) {
			async function fetchData3() {
				await dispatch(getMatchDataThunkAction());
			}
			void fetchData3();
		}
  }, [matchCategory]);


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
	
  return (
    <React.Fragment>
			<Box className='tournament'>
				<Container>
					<Box >
						<Typography py={4} variant="h4" component="h2" color={'#fff'} className='tournament__title fw-b'>
							CHI TIẾT GIẢI ĐẤU
						</Typography>
						<Box className="tournament__grid">
							<Box className="tournament__box">
								{
									newMtach && newMtach.Matchs && newMtach.Matchs.map((item, _) => {
										return (
											<Box key={`${item.CreateDate}_${item.Id}`} className="tournament__item custom" p={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}  onClick={() => openVideoModal(item.VideoPath)}>
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
							<Box className='bag__history'>
								<Box className='video__slider--item custom'>
									<AutoSizeImage isResize={false} src={`/images/match.png`} alt={detail.Title} width={777} height={440}/>
									<Box className='video__slider--info'>
										<Typography
											component="div"
											className={`video__slider--title`}
										>
											{detail.Title}
										</Typography>
										<Typography
											component="div"
											className={`video__slider--desc`}
											color='#fff'
										>
											Giải thưởng $1.6M
										</Typography>
									</Box>
								</Box>
								<Box className='bag__history--item'>
									<Typography variant="h5" className="titleHotItem custom">
										GIẢI ĐẤU KHÁC
									</Typography>
									<Box>
										<ul className="hot_item__ul">
											{matchOther &&
												matchOther.map((item, index) => {
													return (
														<li key={item.Id} className="hot_item__li custom">
															<Link href={`/giai-dau/chi-tiet-giai-dau/${item.Id}.html`} >
																<Box className='d-flex'>
																	<img src="/images/avatar.png" alt={item.Title} />
																	<Typography variant="body1" className="hot_item__title custom">
																		{item.Title}
																	</Typography>
																</Box>
																<img src="/images/arow_right.svg" alt="arrow-right" fill="#fff" width={25} height={25}/>
															</Link>
														</li>
													)
												})}
										</ul>
									</Box>
								</Box>
							</Box>
						</Box>
						
						{showVideoModal ? (
							<YoutubeModal videoId={videoId} onClose={closeVideoModal} />
						) : null}
					</Box>
				</Container>
			</Box>
			
			
		</React.Fragment>
  );
}

export default DetailTournament;