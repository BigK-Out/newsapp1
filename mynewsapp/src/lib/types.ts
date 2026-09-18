export type Post = {
  _id: string;
  title: string;
  category: string;
  img: string;
  brief: string;
  body: string;
  author: string;
  avatar: string;
  date: string; // ISO
  top: boolean;
  trending: boolean;
};
