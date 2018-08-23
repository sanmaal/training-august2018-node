import UrlBuilder from './UrlBuilder';

export default class AppRoutesBuilder extends UrlBuilder {

  static build() {
    return new AppRoutesBuilder();
  }

  init() {
    this.path += 'initialize/';
    return this.and();
  }

  users() {
    this.path += 'users/';
    return this.and();
  }

  pokemons() {
    this.path += 'pokemons/';
    return this.and();
  }
}
