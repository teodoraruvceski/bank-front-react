import * as React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import Qr from './components/Qr/Qr';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Box textAlign='center' fontSize='xl'>
			<Grid minH='100vh' p={3}>
				<ColorModeSwitcher justifySelf='flex-end' />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
				<Routes>
					<Route path='/home' element={<Home />} />
				</Routes>
				<Routes>
					<Route path='/qr' element={<Qr />} />
				</Routes>
			</Grid>
		</Box>
	</ChakraProvider>
);
