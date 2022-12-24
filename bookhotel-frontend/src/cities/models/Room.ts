
export default class Room {
  id: string;
  floor: string;
  number: string;
  description: string;

  constructor(dto: any) {
    this.id = dto._id;
    this.floor = dto.floor;
    this.number = dto.number;
    this.description = dto.description;
  }
}
