const https = require('https');
const http = require('http');

exports.handler = async (event) => {
    console.log("Event received:", JSON.stringify(event));

    if (!event.queryStringParameters || !event.queryStringParameters.url) {
        console.error("No URL provided in query string parameters.");
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify({ message: "URL is required in query string parameters" })
        };
    }

    const queryStringParameters = event.queryStringParameters;
    const targetUrl = decodeURIComponent(queryStringParameters.url);

    console.log("Target URL:", targetUrl);

    const parsedUrl = new URL(targetUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    return new Promise((resolve, reject) => {
        const req = protocol.request({
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
            path: parsedUrl.pathname + (parsedUrl.search || ''),
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': parsedUrl.origin,
                'Accept': '*/*'
            }
        }, (res) => {
            console.log(`Response status code: ${res.statusCode}`);

            let body = [];
            res.on('data', (chunk) => {
                console.log(`Received chunk of size: ${chunk.length}`);
                body.push(chunk);
            });

            res.on('end', () => {
                const responseBody = Buffer.concat(body);
                const base64Body = responseBody.toString('base64');
                console.log("Full Response Body (decoded):", responseBody.toString());
                console.log("Response body size (base64 encoded):", base64Body.length);

                resolve({
                    statusCode: res.statusCode,
                    headers: {
                        ...res.headers,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,OPTIONS',
                        'Access-Control-Allow-Headers': '*'
                    },
                    body: base64Body,
                    isBase64Encoded: true
                });
            });
        });

        req.on('error', (e) => {
            console.error("Request error:", e.message);

            reject({
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({ message: `Error: ${e.message}` })
            });
        });

        req.end();
    });
};
