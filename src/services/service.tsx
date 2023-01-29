import axios from 'axios';
const api = 'http://localhost:8000';
export const finishPayment = async (data: any) => {
	return await axios.post(`${api}/finish-payment`, data);
	//return axios.get('http://localhost:3005');
};

export const getPaymentInfo = async (id: string) => {
	return await axios.get(`${api}/get-payment-info?id=${id}`);
	//return axios.get('http://localhost:3005');
};
