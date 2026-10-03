export type Post = {
  _id: string;
  title: string;
  category: string;
  kind: "news" | "opinion";
  img: string;
  caption: string;
  brief: string;
  body: string;
  author: string;
  avatar: string;
  date: string; // ISO
  top: boolean;
  trending: boolean;
  breaking: boolean;
  views: number;
};
