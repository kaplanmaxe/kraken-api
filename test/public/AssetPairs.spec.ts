import * as nock from 'nock';
import { expect } from 'chai';
import { kraken, IAssetPairInfo } from '../../src';

describe('https://api.kraken.com/0/public/AssetPairs', () => {
  let mock;
  afterEach(() => nock.cleanAll());

  it('should return all asset pairs', async () => {
    mock = nock('https://api.kraken.com/0/public/AssetPairs')
      .get('')
      .reply(200, {
        error: [],
        result: {
          "BCHEUR":{
            "altname":"BCHEUR",
            "aclass_base":
            "currency",
            "base":"BCH",
            "aclass_quote":"currency",
            "quote":"ZEUR",
            "lot":"unit",
            "pair_decimals":1,
            "lot_decimals":8,
            "lot_multiplier":1,
            "leverage_buy":[],
            "leverage_sell":[],
            "fees":[],
            "fees_maker":[],
            "fee_volume_currency":"ZUSD",
            "margin_call":80,
            "margin_stop":40
          },
          "BCHUSD":{
            "altname":"BCHUSD",
            "aclass_base":"currency",
            "base":"BCH",
            "aclass_quote":"currency",
            "quote":"ZUSD",
            "lot":"unit",
            "pair_decimals":1,
            "lot_decimals":8,
            "lot_multiplier":1,
            "leverage_buy":[],
            "leverage_sell":[],
            "fees":[],
            "fees_maker":[],
            "fee_volume_currency":"ZUSD",
            "margin_call":80,
            "margin_stop":40,
          },
        }
      });
      const response = await kraken.public.assetPairs();
      expect(response.result).to.have.property('BCHEUR');
      expect(response.result).to.have.property('BCHUSD');
  });

  it('should work with info query parameter', async () => {
    mock = nock('https://api.kraken.com/0/public/AssetPairs')
      .get('')
      .query({ info: 'leverage' })
      .reply(200, {
        error: [],
        result: {
          "BCHEUR":{
            "leverage_buy":[],
            "leverage_sell":[],
          },
          "BCHUSD":{
            "leverage_buy":[],
            "leverage_sell":[],
          },
        }
      });
    const response = await kraken.public.assetPairs({ info: IAssetPairInfo.LEVERAGE });
    expect(response.result).to.have.property('BCHEUR');
    expect(response.result).to.have.property('BCHUSD');
    expect(response.result['BCHEUR']).to.have.property('leverage_buy');
    expect(response.result['BCHEUR']).to.have.property('leverage_sell');
    expect(response.result['BCHEUR']).to.not.have.property('fees');
  });

  it('should work with info query parameter', async () => {
    mock = nock('https://api.kraken.com/0/public/AssetPairs')
      .get('')
      .query({ pair: 'XBTUSD' })
      .reply(200, {
        error: [],
        result: {
          "XXBTZUSD":{
            "altname":"XBTUSD",
            "aclass_base":"currency",
            "base":"XXBT",
            "aclass_quote":"currency",
            "quote":"ZUSD",
            "lot":"unit",
            "pair_decimals":1,
            "lot_decimals":8,
            "lot_multiplier":1,
            "leverage_buy":[2,3,4,5],
            "leverage_sell":[2,3,4,5],
            "fees":[],
            "fees_maker":[],
            "fee_volume_currency":"ZUSD",
            "margin_call":80,
            "margin_stop":40,
          }
        },
      });
    const response = await kraken.public.assetPairs({ pair: 'XBTUSD' });
    expect(response.result).to.have.property('XXBTZUSD');
    expect(response.result).to.not.have.property('XXBTZEUR');
  });
});