export type Favorite = {
  meta: {
    type: 'player' | 'server';
    id: string;
  };
  data: Record<string, string>;
};

export type FavoritePlayer = Favorite & {
  meta: { type: 'player' };
};

export type FavoriteServer = Favorite & {
  meta: { type: 'server' };
};
