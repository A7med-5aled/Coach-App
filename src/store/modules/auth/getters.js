export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state){
    if(state.userId != null){
        return true;
    }else{
        return false;
    }
  }
};
