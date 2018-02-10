import { time, ITimeResult } from './public/Time';
import { assets, IAssetInput, IAssetResult } from './public/Assets';
import { assetPairs, IAssetPairInput, IAssetPairResult } from './public/AssetPairs';
import { IKrakenResponse } from './types';

export const kraken = {
  public: {
    time,
    assets,
    assetPairs,
  }
}

export * from './public/Time';
export * from './public/Assets';
export * from './public/AssetPairs';
