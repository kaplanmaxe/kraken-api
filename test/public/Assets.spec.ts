import * as nock from 'nock';
import { expect } from 'chai';
import { kraken } from '../../src';

describe('https://api.kraken.com/0/public/Assets', () => {
  let mock;
  afterEach(() => nock.cleanAll());

  it('should return all assets', async () => {
    mock = nock('https://api.kraken.com/0/public/Assets')
      .get('')
      .reply(200, {
        error: [],
        result: {
          BCH: {
            aclass: 'currency',
            altname: 'BCH',
            decimals: 10,
            display_decimals: 5,
          },
          DASH: {
            aclass: 'currency',
            altname: 'DASH',
            decimals: 10,
            display_decimals: 5,
          },
          EOS: {
            aclass: 'currency',
            altname: 'EOS',
            decimals: 10,
            display_decimals: 5,
          },
          BAD: {
            aclass: 'not_a_currency',
            altname: 'BAD',
            decimals: 10,
            display_decimals: 5,
          },
        },
      });
  
    const response = await kraken.public.assets();
    expect(response.result).to.have.property('BCH');
    expect(response.result).to.have.property('DASH');
    expect(response.result).to.have.property('EOS');
    expect(response.result).to.have.property('BAD');
    const currencies = Object.keys(response.result);
    for (let i = 0; i < currencies.length; i++) {
      expect(response.result[currencies[i]]).to.have.property('aclass');
      expect(response.result[currencies[i]]).to.have.property('altname');
      expect(response.result[currencies[i]]).to.have.property('decimals');
      expect(response.result[currencies[i]]).to.have.property('display_decimals');
    }
  });

  it('should return values with aclass parameter', async () => {
    mock = nock('https://api.kraken.com/0/public/Assets')
      .get('')
      .query({ aclass: 'currency' })
      .reply(200, {
        error: [],
        result: {
          BCH: {
            aclass: 'currency',
            altname: 'BCH',
            decimals: 10,
            display_decimals: 5,
          },
          DASH: {
            aclass: 'currency',
            altname: 'DASH',
            decimals: 10,
            display_decimals: 5,
          },
          EOS: {
            aclass: 'currency',
            altname: 'EOS',
            decimals: 10,
            display_decimals: 5,
          },
        },
      })
      
    const response = await kraken.public.assets({ aclass: 'currency' });
    expect(response.result).to.have.property('BCH');
    expect(response.result).to.have.property('DASH');
    expect(response.result).to.have.property('EOS');
  });

  it('should only return 1 asset when using asset parameter', async () => {
    mock = nock('https://api.kraken.com/0/public/Assets')
      .get('')
      .query({ asset: 'EOS' })
      .reply(200, {
        error: [],
        result: {
          EOS: {
            aclass: 'currency',
            altname: 'EOS',
            decimals: 10,
            display_decimals: 5,
          },
        },
      })
      
    const response = await kraken.public.assets({ asset: 'EOS' });
    expect(response.result).to.not.have.property('BCH');
    expect(response.result).to.have.property('EOS');
  });
});
