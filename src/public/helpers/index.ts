import * as got from 'got';
import { IKrakenResponse } from '../../types';

export async function publicFetch<R, T = {}>(url: string, query?: T): Promise<IKrakenResponse<R>> {
  const response = await got(url, { query });
  return JSON.parse(response.body);
}