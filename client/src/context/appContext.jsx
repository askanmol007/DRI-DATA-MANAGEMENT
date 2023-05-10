import reducer from "./reducer";
import axios from "axios";

import {
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAIL,
    API_CALL_BEGIN,
    API_CALL_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SET_FILE,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    GET_ALL_DATA_SUCCESS
    
   
    
} from './action'
import React, { useReducer, useContext,useEffect } from 'react';



export const initialState  ={
    isLoading:false,
    isAuthenticated:false,
    user:null,
    isAdmin:false,
    mainData:[],
    file:null,
    message:"",
    search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
     
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initialState);
  // axios --base url
  const instance = axios.create({
    // development->
     baseURL: 'call/api/v1'
    // production
    // baseURL: '/api/v1',
    
  });

  const setFile=(file)=>{
    dispatch({type:SET_FILE,payload:file});  
  } 
    
   const logoutUser =async()=>{
      await instance.get('/auth/logout');
      dispatch({type:LOGOUT_USER});  
    }
    
    const signupUser=async (currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
        const {data}= await instance.post('/auth/signup',currUser);
          dispatch({
            type:SIGNUP_USER_SUCCESS,
            payload:data.user
          })
      } catch (error) {
        dispatch({type:SIGNUP_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }
    }

    const loginUser=async(currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      
      try{
        const {data} =await instance.post('/auth/login',currUser);
        
        dispatch({ 
          type:LOGIN_USER_SUCCESS,
          payload:data.user
        })
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }

    }
    const getCurrUser=async()=>{
        dispatch({type:API_CALL_BEGIN});
        try{
          const response= await fetch('http://localhost:5000/api/v1/auth/getCurrUser');
          const data =await response.json();
          dispatch({
            type:GET_USER_SUCCESS,
            payload:data?.user
          })
        }catch(err){
          
          if (err.response.status === 401) {
           
            return;
          };
          dispatch({type:GET_USER_FAIL})
          logoutUser();
          // console.log(err.responce.data.msg);
        }
    }
    // useEffect(() => {
    //   getCurrUser();
    // }, []);
    
    
    // ADMIN
    
     const getAllData=async(queryObject)=>{
      let {status,place,yearOfPurchase,customerName}=queryObject;
      customerName=customerName.toUpperCase()
      dispatch({type:API_CALL_BEGIN});     
      try {
  
        const response= await fetch(`http://localhost:5000/api/v1/getData?yearOfPurchase=${yearOfPurchase}&status=${status}&place=${place}&customerName=${customerName}`) 
        const data = await response.json();
        console.log(data);
        
        dispatch({type:GET_ALL_DATA_SUCCESS,
          payload:data.result
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
        console.log(error)
      }
      
    }

    const UploadData=async(file)=>{
     
      dispatch({type:API_CALL_BEGIN});
     
      try {
        const formData = new FormData();
        formData.append('file', file);
        const {data}= await instance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
       
        dispatch({type:UPLOAD_DATA_SUCCESS,
          payload:data.message
        })
        alert(data.message);
      } catch (error) {
        
        dispatch({type:UPLOAD_DATA_FAIL, payload:error.message});
        
      }
    }
 
   
    return (
        <AppContext.Provider
          value={{...state,
            setFile,UploadData,getAllData,
            signupUser,loginUser,logoutUser,getCurrUser}}
        >
          {children}
        </AppContext.Provider>
      );
}
export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider };