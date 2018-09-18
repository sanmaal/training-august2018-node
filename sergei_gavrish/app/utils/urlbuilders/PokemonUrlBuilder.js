import UrlBuilder from './UrlBuilder';

export default class PokemonUrlBuilder extends UrlBuilder {

  static build() {
    return new PokemonUrlBuilder();
  }

  user() {
    this.path += 'user/';
    return this.and();
  }

  catched() {
    this.path += 'catched/';
    return this.and();
  }

  catch() {
    this.path += 'catch/';
    return this.and();
  }

  pokemon() {
    this.path += ':pokemonId/';
    return this.and();
  }
}
