
export default class Hotel {
  id: string;
  name: string;
  address: string;
  email: string
  starCount: string;

  constructor(dto: any) {
    this.id = dto._id;
    this.name = dto.name;
    this.address = dto.address;
	this.email = dto.email;
	this.starCount = dto.starCount;
  }
}
