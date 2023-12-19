
import fetch from 'node-fetch';
import fs from 'fs';

let input = fs.readFileSync('article_input.md', 'utf8');
let prompt = fs.readFileSync('article_prompt.txt', 'utf8');
let url = 'https://api.aiproxy.io/v1/chat/completions';

let body = JSON.stringify({
    "model": "gpt-4",
    "messages": [
        { "role": "system", "content": prompt },
        { "role": "user", "content": input }], "stream": false, "temperature": 0.27
});

let options = {
    method: 'POST',
    headers: {
        'x-api2d-no-cache': 1,
        'Authorization': 'Bearer '+process.env.API2D_TOKEN,
        'Content-Type': 'application/json'
    },
    body
};

fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(`json:${JSON.stringify(json)}`);
        const res = json.choices[0].message.content;
        console.log('res:\n', res);

    })
    .catch(err => console.error('error:' + err));

