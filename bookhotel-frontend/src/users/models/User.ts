export default class User {
    id: string;
    email: string;
    password: string;
    userName: string;

    constructor(dto: any) {
        this.id = dto._id;
        this.email = dto.email;
        this.password = dto.password;
        this.userName = dto.userName;
    }
  }