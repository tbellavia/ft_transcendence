export class User {
  id: number;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;

  constructor() {
    this.id = 0;
    this.login = '';
    this.email = '';
    this.first_name = '';
    this.last_name = '';
    this.image_url = '';
  }
}
