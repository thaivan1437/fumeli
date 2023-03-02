import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import {Box, Button, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

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

export const Mission  = () => {
	return (
		<Container>
			<Box my={4} sx={{ flexGrow: 1 }}>
				<Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<Typography variant="h4" component="h2">
								NHIỆM VỤ MỚI
							</Typography>
							<Typography variant="p" component="p">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
							</Typography>
							<div className="wrap__btn--more css__btn">
								<Button variant="contained" className="w206">Xem them</Button>
							</div>
						</Item>
					</Grid>
					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<img src="./images/home/nvm.png" alt="nvm" />
						</Item>
					</Grid>
					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<img src="./images/home/nvm1.png" alt="nvm" />
						</Item>
					</Grid>

					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<img src="./images/home/nvnb1.png" alt="nvm" />
						</Item>
					</Grid>
					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<img src="./images/home/nvnb2.png" alt="nvm" />
						</Item>
					</Grid>
					<Grid item xs={2} sm={4} md={4} >
						<Item>
							<Typography variant="h4" component="h2">
								NHIỆM VỤ NỔI BẬT
							</Typography>
							<Typography variant="p" component="p">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eleifend pellentesque. Fusce sed nisl lectus. Vestibulum suscipit mollis fermentum. 
							</Typography>
							<div className="wrap__btn--more css__btn">
								<Button variant="contained" className="w206">Xem them</Button>
							</div>
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}