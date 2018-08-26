const { user, password, host, port, name } = process.env;

module.exports = {
	uri: `mongodb://${user}:${password}@${host}:${port}/${name}`,
	key: 'shhh',
}