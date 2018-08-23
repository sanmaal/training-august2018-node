import UrlBuilder from './UrlBuilder';

export default class UserUrlBuilder extends UrlBuilder {

  static build() {
    return new UserUrlBuilder();
  }

  signup() {
    this.path += 'signup/';
    return this.and();
  }

  login() {
    this.path += 'login/';
    return this.and();
  }

  logout() {
    this.path += 'logout/';
    return this.and();
  }
}
