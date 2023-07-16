export interface IReading {
  userEmail?: string;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  readingStatus?: boolean;
  reviews: string[];
}
