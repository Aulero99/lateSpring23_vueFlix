import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"

class MoviesService {

    // NOTE this is what sending params would look like on the request VS on the Axios instance
    // async getMovies() {
    //     const res = await movieApi.get('discover/movie', {
    //         params:
    //         {
    //             api_key: '545c6ef058e65396849dfbbf381cbca3',
    //             includes_adult: false,
    //             certification_country: 'US',
    //             'certification-lte': 'PG-13',
    //             'certification-gte': 'G'
    //         }
    //     })
    //     logger.log('[GETTING MOVIES]', res.data)
    // }

    async getMovies() {
        const res = await movieApi.get('discover/movie')
        logger.log('[GETTING MOVIES]', res.data)
        //    NOTE pay attention to the response you get back from the API.....am I accessing the correct property on the response data??
        // NOTE 'res.data.map is not a function' make sure you're using .map() on arrays
        AppState.movies = res.data.results.map(m => new Movie(m))
        AppState.currentPage = res.data.page
        AppState.totalPages = res.data.total_pages
        // logger.log(AppState.movies, 'appstate movies')
    }

    async getMovieById(movieId) {
        const res = await movieApi.get(`movie/${movieId}`)
        logger.log('[GETTING MOVIE BY ID]', res.data)
        AppState.activeMovie = new Movie(res.data)
        logger.log('appstate movie', AppState.activeMovie)

    }

    async searchMovies(searchTerm) {
        // NOTE for AXIOS, we format queries as objects so they read as key:value pairs
        const res = await movieApi.get('search/movie', {
            params: {
                // NOTE for searching an API: use the word 'query' and assign the value of whatever the search is
                query: searchTerm,
                api_key: '545c6ef058e65396849dfbbf381cbca3',
                includes_adult: false,
                certification_country: 'US',
                'certification-lte': 'PG-13',
                'certification-gte': 'G'
            }
        })
        logger.log('[SEARCHING MOVIES]', res.data)

        AppState.query = searchTerm //NOTE save the searchterm to the appstate so that we can reuse this in our changepage method
        AppState.movies = res.data.results.map(m => new Movie(m))
        AppState.currentPage = res.data.page
        AppState.totalPages = res.data.total_pages
    }

    async changePage() {
        const savedQuery = AppState.query

        // NOTE if there's no saved query, search the entire API
        if (!savedQuery) {
            const res = await movieApi.get(`discover/movie?page=${AppState.currentPage}`)
            AppState.movies = res.data.results.map(m => new Movie(m))
        } else {
            const res = await movieApi.get('search/movie', {
                params: {
                    // NOTE for searching an API: use the word 'query' and assign the value of whatever the search is
                    query: savedQuery, // make sure we are passing in the saved query from appstate
                    page: AppState.currentPage, // provide the page number as well
                    api_key: '545c6ef058e65396849dfbbf381cbca3',
                    includes_adult: false,
                    certification_country: 'US',
                    'certification-lte': 'PG-13',
                    'certification-gte': 'G'
                }
            })
            AppState.movies = res.data.results.map(m => new Movie(m))
        }
    }

}

export const moviesService = new MoviesService()