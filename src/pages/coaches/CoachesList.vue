<template>
  <section>
    <base-dialog :show="!!message" @close="closeError" :title="title">
      <h1>{{ message }}</h1></base-dialog
    >
  </section>
  <section>
    <coach-filter @change-filter="setFilters"> </coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button v-if="!isCoach && isAuth  && !isLoading" link to="/register"
          >Register as Coach</base-button
        >
        <base-button v-if="!isAuth" link to="/auth?redirect=register">Login To Register As A Coach</base-button>
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasCoaches && !isLoading">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
        // console.log("UserId :" , this.$store.state.auth.userId)  

  },
  data() {
    return {
      message: null,
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  computed: {
    isAuth(){
      return this.$store.getters.isAuth;
    },
    title() {
      return 'An Error Has Occurd';
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches' ,{forceRefresh:refresh});
      } catch (error) {
        this.message = error.message;
      }
      this.isLoading = false;
    },
    closeError() {
      this.message = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
