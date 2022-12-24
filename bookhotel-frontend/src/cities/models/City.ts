export default class City {
  id: string;
  cityName: string;
  county: string;
  imageUrl: string;

  constructor(dto: any) {
    this.id = dto._id;
    this.cityName = dto.cityNname;
    this.county = dto.county;
    this.imageUrl = dto.imageUrl ?? '';
  }
}
