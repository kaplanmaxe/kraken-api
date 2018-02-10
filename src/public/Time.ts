import { publicFetch } from './helpers';
import { IKrakenResponse } from '../types';

export interface ITimeResult {
  unixtime: number;
  rfc1123: string;
}

export async function time(): Promise<IKrakenResponse<ITimeResult>> {
  const response = await publicFetch<ITimeResult>('https://api.kraken.com/0/public/Time');
  return response;
}
