let timer;
export default {
  
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGiiVkrF2Bkykd7wdn1dcnSpykff4g_OY',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Something went wrong with the response'
      );
      throw error;
    }
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      expiresIn: responseData.expiresIn,
    });
  },
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGiiVkrF2Bkykd7wdn1dcnSpykff4g_OY',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Something went wrong with the response'
      );
      throw error;
    }
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
   timer=  setTimeout(()=>{
      context.dispatch('logout')
    },expiresIn)
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('expirationDate' , expirationDate);
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
    });
    clearTimeout(timer);
    localStorage.clear();
  },
  autoLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate') - new Date().getTime();
    if(expirationDate < 0){
      return;
    }
    timer = setTimeout(function(){
      context.dispatch('logout')
    } , expirationDate)
    if(token && userId){
      context.commit('setUser',{
        token:token,
        userId:userId,
      })
    }
  }
};
