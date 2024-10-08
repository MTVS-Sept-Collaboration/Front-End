import { NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const logLevel = searchParams.get('logLevel') || '';
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';

  return new Promise((resolve) => {
    const options = {
      // hostname: 'localhost',
      hostname: '125.132.216.190',
      port: 12502,
      path: `/api/logs?sortOrder=${sortOrder}&logLevel=${logLevel}&page=${page}&limit=${limit}`,
      method: 'GET',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
      rejectUnauthorized: false, // 개발 환경에서만 사용
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
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

    apiReq.end();
  });
}