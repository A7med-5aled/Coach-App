export default {
  async registerCoach(context, data) {
    const coachId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coachapp-d1c10-default-rtdb.europe-west1.firebasedatabase.app/coaches/${coachId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    // const responseData = response.json();
    if (!response.ok) {
      //...
      throw new Error(
        response.message || 'Erorr with sending data to database'
      );
    }

    context.commit('registerCoach', {
      ...coachData,
      id: coachId,
    });
  },
  async loadCoaches(context ,payload) {
     if(!context.getters.timeStamp && !payload.forceRefresh){
      return;
    }
    const response = await fetch(
      'https://coachapp-d1c10-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Error With Fetching Data'
      );
      throw error;
    }
    // {{}} coaches{id { data}}
    let coaches = [];

    for (const key in responseData) {
      coaches.push({ ...responseData[key], id: key });
    }
    console.log( 'info :',context.getters.timeStamp , context.state.timeStamp)
    context.commit('loadCoaches', coaches);
    context.commit('lastFetch')
    // console.log(coaches)
  },
};
