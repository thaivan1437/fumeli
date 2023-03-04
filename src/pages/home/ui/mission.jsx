import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import {Box, Button, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import AutoSizeImage from '@/components/image';
import Link from 'next/link'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: "#fff",
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
	boxShadow: 'unset'
}));

const Mission  = () => {
	const { mission } = useSelector((state) => state?.home);
	const firstTwoItems = mission.slice(0, 2);
  const filteredItems = mission.slice(2).filter((item) => item.IsHot);

	const itemList = (item, isOrder = 0)=> {
		return <Grid key={item.CreateDate} item xs={12} sm={4} md={4} className={isOrder ? `order${isOrder}` : ''}>
			<Link href={`mission/${item.Id}`}>
				<AutoSizeImage
					src={item.ImagePath}
					alt={item.Title}
				/>
			</Link>
		</Grid>
	}

	return (
		<Box my={4} sx={{ flexGrow: 1, padding: 0 }} className="mission">
			<Grid container spacing={{ xs: 0, md: 4 }} rowSpacing={{ xs: 2, sm: 2, md: 4 }} columns={{ xs: 12, sm: 8, md: 12 }} >
				<Grid item xs={12} sm={4} md={4} >
					<Box sx={{ color: 'white'}}>
						<Typography variant="h4" component="h2">
							NHIỆM VỤ MỚI
						</Typography>
						<Typography variant="p" component="p">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
						</Typography>
						<div className="wrap__btn--more css__btn">
							<Link href="/mission" color='white'>
								<Button variant="contained" className="w206">
									Xem thêm
								</Button>
							</Link>
						</div>
					</Box>
				</Grid>
				{
					firstTwoItems.map((item) => (
						itemList(item)
					))
				}
				
			</Grid>
			<Grid container spacing={{ xs: 0, md: 4 }} rowSpacing={{ xs: 2, sm: 2, md: 4 }}>
				{
					filteredItems.map((item, index) => (
						itemList(item, index + 2)
					))
				}
				<Grid item xs={12} sm={4} md={4}  className="order1">
					<Box sx={{ color: 'white'}}>
						<Typography variant="h4" component="h2">
							NHIỆM VỤ NỔI BẬT
						</Typography>
						<Typography variant="p" component="p">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
						</Typography>
						<div className="wrap__btn--more css__btn">
							<Link href="/mission?noibat=true" color='white'>
								<Button variant="contained" className="w206">
									Xem thêm
								</Button>
							</Link>
						</div>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
export default Mission;