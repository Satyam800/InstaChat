export const URL=process.env.REACT_APP_URL
const data=JSON.parse(localStorage.getItem("id"))
export const {name,email}=data||{}
 const get=localStorage.getItem("token")
export const token=get||""

