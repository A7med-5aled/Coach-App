<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-dialog :show="!!message" title="An Error Occurred" @close="closeError"><p>{{ message }}</p></base-dialog>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :message="request.message"
          :email="request.userEmail"
        ></request-item>
      </ul>
      <h3 v-else>You haven't recevied any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  async created() {
    this.isLoading = true;
    try {
      await this.$store.dispatch('requests/loadRequests');
    } catch (error) {
      this.message = error.message;
      console.log("HandMade by Me : " , error)
    }
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: false,
      message: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods:{
    closeError(){
      this.message= null;
    }
  }
};
</script>
