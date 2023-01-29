import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Img, Table, Td, Tr } from '@chakra-ui/react';
import { finishPayment, getPaymentInfo } from '../../services/service';
//import { login, getToken } from '../services/service';

function Qr() {
	const nav = useNavigate();
	const [pid, setPid] = useState('');
	const [qr, setQr] = useState('');
	const [payment, setPayment] = useState({ amount: 0, id: '' });
	const [merchant, setMerchant] = useState({ name: '', account_number: '' });
	useEffect(() => {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		const id = params.get('paymentId');
		console.log(id);
		//fetch info about that payment and write it on ui
		const get = async (id: string) => {
			//should actualy get info !and qr code!
			const data = await getPaymentInfo(id);
			console.log(data);
			setPayment(data.data.payment);
			setQr(data.data.qr);
			setMerchant({
				name: data.data.merchant_name,
				account_number: data.data.merchant_account,
			});
		};
		get(id || '');
	}, []);

	const pay = async () => {};
	return (
		<Flex
			flexDirection='column'
			width='100wh'
			height='100vh'
			backgroundColor='gray.200'
			justifyContent='center'
			alignItems='center'
		>
			<Table>
				<Tr>
					<Td>Recipient: </Td>
					<Td>{merchant.name}</Td>
				</Tr>
				<Tr>
					<Td>Recipient account number: </Td>
					<Td>
						{merchant.account_number?.length > 0
							? '**** **** **** *' + merchant.account_number.substring(13, 16)
							: ''}
					</Td>
				</Tr>
				<Tr>
					<Td>Amount: </Td>
					<Td>{payment.amount}</Td>
				</Tr>
				<Tr>
					<Td align='center' w='20%' colSpan={2}>
						<Img src={qr}></Img>
					</Td>
				</Tr>
				<Tr>
					<Td align='center' w='20%' colSpan={2}>
						<Button onClick={() => nav(`/home?paymentId=${payment.id}`)}>
							Nastavi
						</Button>
					</Td>
				</Tr>
			</Table>
		</Flex>
	);
}
export default Qr;
