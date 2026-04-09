export type Favorite = FavoritePlayer | FavoriteServer;

export type FavoritePlayer = {
  meta: {
    type: 'player';
    id: string;
  };
  data: {
    name: string;
    uuid: string;
  };
};

export type FavoriteServer = {
  meta: {
    type: 'server';
    id: string;
  };
  data: {
    name: string;
    uuid?: never;
  };
};
