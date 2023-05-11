import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import AutoSizeImage from '@/components/image';
import Link from 'next/link'

const Mission  = () => {
	const { mission } = useSelector((state) => state?.home);
	const firstTwoItems = mission.slice(0, 2);
  const filteredItems = mission.slice(2).filter((item) => item.IsHot);

	const itemList = (item, isOrder = 0)=> {
		return <Grid key={item.CreateDate} item xs={12} sm={4} md={4} className={isOrder ? `order${isOrder}` : ''}>
			<Link href={`nhiem-vu/${item.Id}`}>
				<AutoSizeImage
					src={item.ImagePath}
					alt={item.Title}
				/>
			</Link>
		</Grid>
	}

	return (
		<Box sx={{ flexGrow: 1, padding: 0 }} className="mission">
			<Grid container spacing={{ xs: 2, md: 4 }} my={4} rowSpacing={{ xs: 2 }} columns={{ xs: 12, sm: 8, md: 12 }} >
				<Grid item xs={12} sm={4} md={4} >
					<Box sx={{ color: 'white'}}>
						<Typography variant="h4" component="h2" className='fw-b fs-48'>
							NHIỆM VỤ MỚI
						</Typography>
						<Typography variant="p" component="p" sx={{margin: '15px 0'}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
						</Typography>
						<div className="wrap__btn--more css__btn">
							<Link href="/nhiem-vu" color='white'>
								<Button variant="contained" className="w206 fw-b">
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
			<Grid container spacing={{ xs: 2, md: 4 }} my={4} rowSpacing={{ xs: 2 }}>
				{
					filteredItems.map((item, index) => {
						if (index > 1) {
							return
						}
						return itemList(item, index + 2)
					})
				}
				<Grid item xs={12} sm={4} md={4}  className="order1">
					<Box sx={{ color: 'white'}}>
						<Typography variant="h4" component="h2" className='fs-48 fw-b text-right'>
							NHIỆM VỤ NỔI BẬT
						</Typography>
						<Typography variant="p" component="p" className='text-right'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
						</Typography>
						<Box className="wrap__btn--more css__btn text-right">
							<Link href="/nhiem-vu?noibat=true" color='white'>
								<Button variant="contained" className="w206">
									Xem thêm
								</Button>
							</Link>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
export default Mission;