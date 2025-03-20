export type Story = {
  id: number;
  title: string;
  dek: string;
  hero_image: {
    url: string;
  };
  slug: string;
  [key: string]: any;
};

export type StoriesResponse = {
  current_page: number;
  data: Story[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};
