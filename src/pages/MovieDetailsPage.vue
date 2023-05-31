<template>
    <!-- NOTE how to set a background img in vue -->
    <div class="container-fluid" :style="{ backgroundImage: `url(${movie?.backdropImg})` }">
        <section class="row align-items-center">

            <div class="col-md-6 p-5">
                <img class="img-fluid rounded" :src="movie?.posterImg" alt="">
            </div>
            <div class="col-md-6">
                <div class="glass-card text-white p-2">
                    <h1 class="">{{ movie?.title }}</h1>
                    <div class="d-flex justify-content-around">
                        <p>Release Date: {{ movie?.releaseDate }}</p>
                        <p>Average Rating: {{ movie?.average }}</p>
                    </div>
                    <p class="">{{ movie?.description }}</p>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
export default {

    setup() {
        const route = useRoute() //access the URL or the 'route' of where I currently am

        async function getMovieById() {
            try {
                logger.log('getting movie by id')
                const movieId = route.params.movieId // grab the movie id from the URL
                await moviesService.getMovieById(movieId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        onMounted(() => {
            getMovieById()
        })

        return {
            movie: computed(() => AppState.activeMovie)
        };
    },
};
</script>

<style>
.glass-card {
    background-color: #09090980;
    backdrop-filter: blur(10px);
    border: 1px solid whitesmoke;
    border-radius: 5px;
}
</style>
