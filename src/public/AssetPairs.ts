import { IKrakenResponse } from '../types';
import { publicFetch } from './helpers';

export interface IAssetPairInput {
  info?: IAssetPairInfo;
  pair?: string;
}

export enum IAssetPairInfo {
  INFO = 'info',
  LEVERAGE = 'leverage',
  FEES = 'fees',
  MARGIN = 'margin',
}

export interface IAssetPair {
  aclass_base: string;
  aclass_quote: string;
  altname: string;
  base: string;
  fee_volume_currency: string;
  fees: number[][];
  fees_maker: number[][];
  leverage_buy: number[];
  leverage_sell: number[];
  lot: string;
  lot_decimals: number;
  lot_multiplier: number;
  margin_call: number;
  margin_stop: number;
  pair_decimals: number;
  quote: string;
}

export interface IAssetPairResult {
  [key: string]: IAssetPair;
}

export async function assetPairs(query?: IAssetPairInput): Promise<IKrakenResponse<IAssetPairResult>> {
  const response = await publicFetch<IAssetPairInput, IAssetPairResult>(
    'https://api.kraken.com/0/public/AssetPairs',
    query,
  );
  return response;
}
