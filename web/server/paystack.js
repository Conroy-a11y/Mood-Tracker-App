import fetch from 'node-fetch';


const PS_BASE = 'https://api.paystack.co';


export async function initTransaction({ email, amount_subunit, reference, callback_url, currency = 'ZAR', metadata }) {
const res = await fetch(`${PS_BASE}/transaction/initialize`, {
method: 'POST',
headers: {
Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ email, amount: amount_subunit, reference, callback_url, currency, metadata })
});
const data = await res.json();
if (!data.status) throw new Error(data.message || 'Paystack init failed');
return data.data; // authorization_url, access_code, reference
}


export async function verifyTransaction(reference) {
const res = await fetch(`${PS_BASE}/transaction/verify/${reference}`, {
headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
});
const data = await res.json();
if (!data.status) throw new Error(data.message || 'Paystack verify failed');
return data.data; // contains status, amount, currency, customer, etc.
}

import fetch from 'node-fetch';


const PS_BASE = 'https://api.paystack.co';


export async function initTransaction({ email, amount_kobo, reference, callback_url }) {
const res = await fetch(`${PS_BASE}/transaction/initialize`, {
method: 'POST',
headers: {
Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ email, amount: amount_kobo, reference, callback_url })
});
const data = await res.json();
if (!data.status) throw new Error(data.message || 'Paystack init failed');
return data.data; // contains authorization_url, access_code, reference
}


export async function verifyTransaction(reference) {
	const res = await fetch(`${PS_BASE}/transaction/verify/${reference}`, {
		headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
	});
	const data = await res.json();
	if (!data.status) throw new Error(data.message || 'Paystack verify failed');
	return data.data; // contains status, amount, currency, customer, etc.
}