export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  loadCoaches(state , payload){
    state.coaches = payload;
  },
  lastFetch(state){
        state.timeStamp = new Date().getTime();
  }
};