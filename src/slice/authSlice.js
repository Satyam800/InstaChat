import { extraReducers,createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import { URL } from "../utils/constant";

export const postUser=createAsyncThunk('SignUp',async(data)=>{
  try{
    
    const response= await axios.post(URL+'/signup',data)
      console.log(response,"jbkjb")
     return response.data
  }catch(err){
 console.log(err,"post")
 return err.response.data
  }
})
export const SignInUser=createAsyncThunk("SignIn",async(data)=>{
  try {
    console.log("hgfd");
     const response=await axios.post(URL+'/login',data)
     console.log(response,"knb")
     return response.data
  } catch (error) {
   console.log(error)
  }
})
const AuthSlice= createSlice({
  name: "auth",
  initialState: {
  Signup:"",
  Signin:"",
  login:false,
  reset:"",
  email:""
  },
  reducers: {
    loginState:(state,action)=>{
      state.login=action.payload
    },
    clearMessage:(state,action)=>{
      state.Signin=""
      state.Signup=""
    },
    emailsave:(state,action)=>{
      state.email=action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(postUser.fulfilled,(state,action)=>{
      console.log(action.payload,"bb");
      state.Signup=action.payload
    }).addCase(SignInUser.fulfilled,(state,action)=>{
      console.log(action.payload,"SignIn");
      state.Signin=action.payload
    })
  }
});

export const {loginState,clearMessage,emailsave } = AuthSlice.actions;
export default AuthSlice.reducer;