import { useState, useEffect } from 'react';
import {
	Flex,
	Input,
	Button,
	Stack,
	Box,
	FormControl,
	InputGroup,
	FormHelperText,
	FormLabel,
	Tr,
	Td,
	Table,
} from '@chakra-ui/react';
import { finishPayment, getPaymentInfo } from '../../services/service';
import { allowedNodeEnvironmentFlags } from 'process';
import { BsDot } from 'react-icons/bs';
//import { login, getToken } from '../services/service';

function ChackCardInfo() {
	//const navigate = useNavigate();
	const [name, setName] = useState('');
	const [csc, setCsc] = useState('');
	const [pan, setPan] = useState('');
	const [m, setM] = useState('');
	const [y, setY] = useState('');
	const [payment, setPayment] = useState({ amount: 0, id: '' });
	const [merchant, setMerchant] = useState({ name: '', account_number: '' });
	useEffect(() => {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		const id = params.get('paymentId');
		setCsc(params.get('csc') || '');
		console.log(id);
		const get = async (id: string) => {
			const data = await getPaymentInfo(id);
			console.log(data);
			setPayment(data.data.payment);
			setMerchant({
				name: data.data.merchant_name,
				account_number: data.data.merchant_account,
			});
		};
		get(id || '');
	}, []);
	//myString = myString.replace(/\D/g,'');
	const yOnChange = (event: any) => {
		const year = event.target.value;
		if (year.length <= 2) {
			setY(year);
		} else {
			setY(year.substring(0, 2));
		}
	};
	const mOnChange = (event: any) => {
		const month = event.target.value;

		if (month.length <= 2) {
			setM(month);
		} else {
			setM(month.substring(0, 2));
		}
	};
	const pay = async () => {
		if (Number(y) > 99 || Number(y) < 0) alert('Godina nije validna!');
		if (Number(m) > 12 || Number(m) < 0) alert('Mesec nije validan!');
		if (pan.length < 16) alert('Broj kartice mora imati 16 cifara!');
		if (csc.length < 3) alert('Csc broj mora imati najmanje 3 cifre!');
		const exp =
			(Number(m) < 10 && m[0] !== '0' ? '0' + m : m) +
			'/' +
			(Number(y) < 10 && y[0] !== '0' ? '0' + y : y);
		const data = {
			payment_id: payment.id,
			card_h_name: name,
			csc: Number(csc),
			exp_date: exp,
			pan: pan,
		};
		const resp = await finishPayment(data);
		console.log(resp.data); //resp.data bi trebao da bude link na koji se redirektujemo
		if (resp.data.successful) {
			window.location.href = `${resp.data.url}?payment_id=${resp.data.payment_id}`; //hopefully
		} else {
			if (resp.data.message !== undefined) alert(resp.data.message);
			else
				window.location.href = `${resp.data.url}?payment_id=${resp.data.payment_id}`;
		}
	};
	return (
		<Flex
			flexDirection='column'
			width='100wh'
			height='100vh'
			backgroundColor='gray.200'
			justifyContent='center'
			alignItems='center'
			m='100px'
			p='20px'
		>
			<Stack
				flexDir='column'
				mb='2'
				justifyContent='center'
				alignItems='center'
				p='20px'
			>
				<Table p='10px'>
					<Tr>
						<Td>Recipient: </Td>
						<Td>{merchant.name}</Td>
					</Tr>
					<Tr>
						<Td>Amount: </Td>
						<Td>{payment.amount} $</Td>
					</Tr>
				</Table>
				<Box minW={{ base: '90%', md: '468px' }}>
					<form>
						<Stack
							spacing={4}
							p='1rem'
							backgroundColor='whiteAlpha.900'
							boxShadow='md'
						>
							<FormControl>
								<FormLabel>Ime i prezime:</FormLabel>
								<Input
									onChange={(event) => setName(event.target.value)}
									type='text'
									value={name}
									readOnly={true}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Broj kartice:</FormLabel>
								<Input
									type='number'
									onChange={(event) => setPan(event.target.value)}
									value={pan}
									readOnly={true}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Csc</FormLabel>
								<Input
									onChange={(event) => setCsc(event.target.value)}
									type='number'
									value={csc}
									readOnly={true}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Datum vazenja:</FormLabel>
								<InputGroup>
									<Input
										onChange={(event) => mOnChange(event)}
										type='number'
										value={m}
										readOnly={true}
									/>
									{'/'}
									<Input
										onChange={(event) => yOnChange(event)}
										type='number'
										placeholder='godina'
										value={y}
										readOnly={true}
									/>
								</InputGroup>
							</FormControl>
							<Button
								borderRadius={0}
								type='reset'
								variant='solid'
								colorScheme='teal'
								width='full'
								onClick={pay}
							>
								Izvrsi placanje
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
export default ChackCardInfo;
