<template>
  <div class="container-fluid">
    <section class="row justify-content-center pt-5">
      <div class="col-8">
        <SearchBar />
      </div>
    </section>

    <section class="row p-5 ">



      <!-- NOTE v-for is operating the same way as a forEach -->
      <!-- NOTE we are iterating over our 'movies' computed in the return -->
      <div class="col-md-3 my-3" v-for="m in movies" :key="m.id">
        <!-- NOTE think of this as saying 'for all my movies...draw my MovieCard template' -->
        <MovieCard :movieProp="m" />
      </div>

    </section>

    <section class="row justify-content-center p-3 justif">
      <div class="col-md-12 text-center">
        <p class="text-white">Page: {{ currentPage }} of {{ totalPages }} Pages</p>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-warning w-25" :disabled="currentPage == 1"
          @click="changePage('previous')">Previous</button>
      </div>

      <div class="col-6">
        <button class="btn btn-warning w-25" :disabled="currentPage == totalPages" @click="changePage('next')">Next</button>
      </div>


    </section>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { moviesService } from '../services/MoviesService.js'
import { AppState } from '../AppState.js'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'
export default {
  components: { MovieCard, SearchBar },
  setup() {

    async function getMovies() {
      try {
        // logger.log('getting movies')
        await moviesService.getMovies()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    // NOTE onMounted says: run this code as soon as this component mounts
    // NOTE in this case, we're saying: do this as soon as the page loads
    onMounted(() => {
      getMovies()
    })

    return {

      async changePage(pageChangeSwitch) {
        try {
          if (pageChangeSwitch == 'next') {
            AppState.currentPage++
          } else if (pageChangeSwitch == 'previous') {
            AppState.currentPage--
          }
          // logger.log('changing page', AppState.currentPage)
          await moviesService.changePage()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      movies: computed(() => AppState.movies) //NOTE: to bring in data from the AppState, use a computed
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
