const secrets = {
  dbUri: 'mongodb://sasha:qwerty11@ds125472.mlab.com:25472/pokedex-db'
};

export const getSecret = key => secrets[key];
