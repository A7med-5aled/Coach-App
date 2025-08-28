export default {
    requests(state,_,_2,rootGetters){
        const request = state.requests.filter(request => request.coachId ===rootGetters.userId)
        return request;
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length > 0 ;
    }
}