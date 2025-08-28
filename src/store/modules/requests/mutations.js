export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  loadRequests(state , payload){
    state.requests = payload;
  }
};