export const selectUser=(user)=>{//action creator
  console.log("yOU CLICKED ON :" ,user.first);
  return {
      type: "USER_SELECTED",
      payload:user
  }//action
};