<template>
    <!-- ANCHOR instead of abstracting our 'template' to our models, we are now abstracting to its own component -->
    <div>
        <!-- NOTE the id in our URL IS the id of the movie from the API -->
        <router-link :to="{ name: 'MovieDetails', params: { movieId: movieProp.id } }">
            <img class="img-fluid rounded elevation-5" :src="movieProp?.posterImg" :alt="movieProp?.title">
        </router-link>

        <!-- NOTE '{{}}' is like string interpolation-->
        <h1>{{ movieProp?.title }}</h1>
    </div>
</template>

<script>
import { Movie } from '../models/Movie.js';
export default {
    props: {
        movieProp: { type: Movie, required: true }
    },
    setup() {
        return {};
    },
};
</script>

<style></style>