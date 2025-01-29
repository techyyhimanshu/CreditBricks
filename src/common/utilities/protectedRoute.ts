// import store from "../store/store";
// import {Navigate} from "react-router-dom"


const ProtectedRoutes = ({ children }: any) => {
   // const {auth}=store.getState()
   // const token=localStorage.getItem("token")
   // if(token){
   //  return Navigate({to:"/"})
   // }
   return children

}

export { ProtectedRoutes }