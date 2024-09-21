export default interface ICourse {
  id: number;
  title: string;
  description: string;
  start_date?: Date;
  end_date?: Date;
  total_video_size: number;
  image_url?: string;
}

export type ICourseCreate = Omit<ICourse, "id">;
