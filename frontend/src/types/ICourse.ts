export default interface ICourse {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  totalVideoSize: number;
  imageUrl?: string;
}
