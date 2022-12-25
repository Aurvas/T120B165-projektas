export default class City {
  id: string;
  county: string;
  cityName: string;
  imageUrl: string;

  constructor(dto: any) {
    this.id = dto._id;
    this.cityName = dto.cityName;
    this.county = dto.county;
    this.imageUrl = dto.imageUrl ?? '';
  }
}
