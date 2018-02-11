import * as nock from 'nock';
import { expect } from 'chai';
import { kraken } from '../../src';

describe('https://api.kraken.com/0/public/Time', () => {
  let mock;
  before(() => {
    mock = nock('https://api.kraken.com/0/public/Time')
      .get('')
      .reply(200, {
        error: [],
        result: {
          unixtime: 1518277942,
          rfc1123: 'Sat, 10 Feb 18 15:52:22 +0000',
        },
      });
  });

  it('should return valid response', async () => {
    const response = await kraken.public.time();
    expect(response.result.unixtime).to.equal(1518277942);
    expect(response.result.rfc1123).to.equal('Sat, 10 Feb 18 15:52:22 +0000');
  });
})