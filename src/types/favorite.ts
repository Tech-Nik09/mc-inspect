export type Favorite = {
  meta: {
    type: 'player' | 'server';
    id: string;
  };
  data: Record<string, string>;
};
