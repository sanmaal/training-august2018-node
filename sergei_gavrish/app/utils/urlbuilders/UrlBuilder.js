export default class UrlBuilder {
  constructor() {
    this.path = '/';
  }

  build() {
    return console.error('не переопределен статический метод');
  }

  and() {
    return this;
  }

  use() {
    return this.path;
  }
}