export default {
  async contactCoach(context, payload) {
    // const id = new Date().toISOString();
    const coachId= payload.coachId;
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://coachapp-d1c10-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await  response.json();
    if (!response.ok) {
      //
    }
    newRequest.id = responseData.name;
    // newRequest.id = context.rootGetters.userId;

    newRequest.coachId = coachId;
    // console.log(newRequest)
    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const coachId= context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coachapp-d1c10-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Something went Wrong with Fetching data'
      );
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      requests.push({ coachId , id:responseData[key].name,...responseData[key] });
      console.log("hii bro : " , coachId ,key)
      // console.log(responseData[key]);
    }
    // console.log(context.getters.requests)
    context.commit('loadRequests', requests);
    
  },
};
