export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },
  timeStamp(state){
    const lastTime = state.timeStamp;
    if (!lastTime){
      return true;
    }
    const currentTime = new Date().getTime();
    return(currentTime - state.timeStamp) / 1000 > 5 ;
  }
};