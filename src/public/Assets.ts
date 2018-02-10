import { IKrakenResponse } from '../types';
import { publicFetch } from './helpers';

export interface IAssetInput {
  aclass?: 'currency';
  asset?: string;
}

export interface IAsset {
  altname: string;
  aclass: string;
  decimals: number;
  display_decimals: number;
}

export interface IAssetResult {
  [key: string]: IAsset;
}

export async function assets(query?: IAssetInput): Promise<IKrakenResponse<IAssetResult>> {
  const response = await publicFetch<IAssetResult, IAssetInput>('https://api.kraken.com/0/public/Assets', query);
  return response;
}