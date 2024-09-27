import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: Request): Promise<Response> {
  const { userName, password } = await request.json();

  return new Promise((resolve) => {
    const options = {
      // hostname: 'localhost',
      hostname: '125.132.216.190',
      port: 12502,
      path: '/api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false, // 개발 환경에서만 사용
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        console.log('Raw response:', data); // 응답 데이터 로깅

        if (!data) {
          console.log('Empty response received');
          resolve(NextResponse.json({ error: 'Empty response from server' }, { status: 500 }));
          return;
        }

        try {
          const parsedData = JSON.parse(data);
          resolve(NextResponse.json(parsedData, { status: apiRes.statusCode }));
        } catch (error) {
          console.error('Error parsing JSON:', error);
          resolve(NextResponse.json({ error: 'Invalid JSON response from server' }, { status: 500 }));
        }
      });
    });

    apiReq.on('error', (error) => {
      console.error('Request error:', error);
      resolve(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
    });

    apiReq.write(JSON.stringify({ userName, password }));
    apiReq.end();
  });
}