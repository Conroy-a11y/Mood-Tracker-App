import fetch from 'node-fetch';


const NORMALIZE = (label) => {
const l = String(label).toUpperCase();
if (l.includes('POS')) return 'POSITIVE';
if (l.includes('NEG')) return 'NEGATIVE';
if (l.includes('NEU')) return 'NEUTRAL';
return 'UNKNOWN';
};


export async function analyzeMood(text) {
const endpoint = process.env.HF_ENDPOINT || 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment';
const res = await fetch(endpoint, {
method: 'POST',
headers: {
'Authorization': `Bearer ${process.env.HF_API_TOKEN}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ inputs: text })
});
if (!res.ok) {
const errText = await res.text();
throw new Error(`HF API error ${res.status}: ${errText}`);
}
const data = await res.json();
// Expect: [{label: 'positive'|'neutral'|'negative', score: 0.x}, ...] OR nested array
const top = Array.isArray(data)
? (Array.isArray(data[0]) ? data[0][0] : data[0])
: null;
if (!top || !top.label) return { label: 'UNKNOWN', score: 0 };
return { label: NORMALIZE(top.label), score: top.score };
}

import fetch from 'node-fetch';


export async function analyzeMood(text) {
const endpoint = process.env.HF_ENDPOINT || 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const res = await fetch(endpoint, {
method: 'POST',
headers: {
'Authorization': `Bearer ${process.env.HF_API_TOKEN}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ inputs: text })
});


if (!res.ok) {
const errText = await res.text();
throw new Error(`HF API error ${res.status}: ${errText}`);
}


const data = await res.json();
// Expecting array of arrays like [[{label:"POSITIVE", score:0.99}, {label:"NEGATIVE", score:0.01}]]
const top = Array.isArray(data) ? (Array.isArray(data[0]) ? data[0][0] : data[0]) : null;
if (!top || !top.label) return { label: 'UNKNOWN', score: 0 };
return { label: top.label, score: top.score };
}