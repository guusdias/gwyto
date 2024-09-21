export interface ILesson {
  id: number;
  url: string;
  size: number;
}

export default interface ICourse {
  id: number;
  title: string;
  description: string;
  start_date?: Date;
  end_date?: Date;
  total_video_size: number;
  image_url?: string;
  lessons?: ILesson[];
}

export type ICourseCreate = Omit<ICourse, "id" | "lessons">;

export type ILessonCreate = Omit<ILesson, "id">;
