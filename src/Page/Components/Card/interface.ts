export interface Post {
  id: number;
  title: string;
  image: string;
  slug: string;
  views: number;
  createdAt: any;
  updatedAt: any;
  isFeatured: boolean;
}

export interface CardHotProps {
  posts: Post[];
  loading?: boolean;
}


export interface PostCoTotal {
  data: Post[];
  loading?: boolean;
}