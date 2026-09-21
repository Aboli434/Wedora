import { apiResponse } from '@/lib/apiResponse';

export async function GET() {
  return apiResponse.success({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'wedora-api',
    version: 'v1',
  });
}
