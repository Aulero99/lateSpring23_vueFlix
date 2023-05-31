export class Movie {
    constructor(data) {
        this.id = data.id
        this.backdropImg = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        this.posterImg = 'https://image.tmdb.org/t/p/original' + data.poster_path
        this.title = data.original_title
        this.description = data.overview
        this.releaseDate = data.release_date
        this.average = data.vote_average
    }
}


