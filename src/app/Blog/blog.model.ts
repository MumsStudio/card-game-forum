export interface BlogEntry {
  id:string;
  title: string;
  content: string;
  creator:string;

  descriptions?:string;
  createdAt?:Date;
  updateAt?:Date;
  likes?:number;
  headerImage?:string;
  publishDate?:Date;
  isPublished?:boolean
}
