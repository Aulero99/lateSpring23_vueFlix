<template>
    <!-- NOTE .prevent is the same as saying 'window.event.preventDefault()' -->
    <form @submit.prevent="searchMovies()">
        <input class="w-100" type="text" v-model="search" placeholder="Search..." />
    </form>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
export default {
    setup() {
        const search = ref('')
        return {
            search,

            async searchMovies() {
                try {
                    const searchTerm = search.value
                    logger.log('searching movie', searchTerm)
                    await moviesService.searchMovies(searchTerm)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };
    },
};
</script>

<style></style>