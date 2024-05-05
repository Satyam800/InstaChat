import { extraReducers,createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const tweetPost=createAsyncThunk("post",async (data)=>{
  console.log(data,"data");
   const res=await axios.post("http://localhost:3500/api/v1/tweets",data)
   console.log(res,"res");
   return res?.data?.data
})

export const profile=createAsyncThunk('profile',async(data)=>{
  console.log(data);
})

const postSlice= createSlice({
    name: "post",
    initialState: {
    postBox:false,
    create:""
    },
    reducers: {
      PostCard:(state,action)=>{
        state.postBox=action.payload
      },
    },
    extraReducers:(builder)=>{
      builder.addCase(tweetPost.fulfilled,(state,action)=>{
        console.log(action.payload,"bb");
        state.create=action.payload?._doc
      })
    }
  })
  

  export const { PostCard} = postSlice.actions;
  export default postSlice.reducer;