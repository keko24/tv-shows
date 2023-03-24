export interface Show {
    id: number,
    name: string,
    genres: number[],
    poster_path: string,
    overview: string,
};

export interface Cast {
    name: string,
    character: string,
    profile_path: string,
}

export interface Genre {
    id: number,
    name: string,
}
