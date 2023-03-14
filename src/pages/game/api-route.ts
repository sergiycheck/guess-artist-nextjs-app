const baseURL = "http://127.0.0.1:3050";
export const apiRoutes = {
  artists: {
    name: `${baseURL}/artists`,
    get all() {
      return `${this.name}/all`;
    },
  },
  albums: {
    name: `${baseURL}/itunes-api`,

    randomAlbumsByArtist: function ({
      size,
      term,
    }: {
      size: number;
      term: string;
    }) {
      const urlParamsStr = new URLSearchParams({
        size: `${size}`,
        term,
      }).toString();

      return `${this.name}/random-albums-by-predefined-artist?${urlParamsStr}`;
    },
  },

  users: {
    name: `${baseURL}/users`,

    get top3Users() {
      return `${this.name}/top-3`;
    },

    userById: function (id: string) {
      return `${this.name}/${id}`;
    },
    get login() {
      return `${this.name}/login`;
    },
  },
};

export const queryKeys = {
  artists: "artists",
  albums: "albums",
  users: "users",
};
