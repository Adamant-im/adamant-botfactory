import {readdir, readFile, writeFile} from 'fs/promises';
import {resolve, join} from 'path';

const result = {};

const parse = async (crypto, path) => {
  const json = await readFile(path, 'utf-8');

  const {contractId, decimals} = JSON.parse(json);

  result[crypto] = {
    contractId,
    decimals,
    crypto,
  };
};

const eth = resolve(
    'adamant-wallets',
    'assets',
    'blockchains',
    'ethereum',
);

const coins = await readdir(eth, {withFileTypes: true});

const promises = coins
    .filter((dir) => dir.isDirectory())
    .map(({name: coin}) => {
      const path = join(eth, coin, 'info.json');

      return parse(coin, path);
    });

await Promise.all(promises);

await writeFile(
    resolve('static', 'eth.json'),
    JSON.stringify(result),
);
