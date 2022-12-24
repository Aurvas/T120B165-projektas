export default class SignupData {
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
	
    constructor(dtos: any) {
        this.email = dtos.email;
        this.password = dtos.password;
        this.confirmPassword = dtos.confirmPassword;
        this.userName = dtos.userName;
    }
}