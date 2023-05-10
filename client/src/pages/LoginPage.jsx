import React,{useState,useEffect} from 'react'
import loginShow from '../assets/img/loginshow.jpg'
import { FormField ,Loader} from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate =useNavigate();
    const {signupUser,loginUser,isAuthenticated,isLoading,isAdmin}=useAppContext();
    // user state
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        haveAccount:true
      })
    
    // onSubmit
    const onSubmit=(e)=>{
        e.preventDefault();
        const { name, email, password, haveAccount } = user;
        if (!email || !password || (!haveAccount && !name)) {
          alert("provide all values")
          return;
        }
        if(haveAccount){
          loginUser({
            email:user.email,
            password:user.password
          });
        }else{
          signupUser({
            name:user.name,
            email:user.email,
            password:user.password
          });
        }
      }
    // handel change
    const handleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      } 
    //    
      useEffect(()=>{
        if(isAuthenticated && isAdmin){
          navigate('/');
        }else if(isAuthenticated){
            navigate('/');
        }
      },[isAuthenticated]);
   if(isLoading){
    return <Loader/>
   }   
  return (
    <div className='bg-gray-100 h-screen w-full flex flex-col sm:flex-row'>
        {/* login section */}
        <div className='lg:w-5/12 w-full sm:w-8/12 p-3'>
            <div className='font-bold text-lg pt-2'>Untitled UI</div>
            <div>
                <h1 className='mx-auto w-full my-[5rem] flex justify-center font-bold text-[2rem]'>Welcome back</h1>

                {/* from */}
                <form onSubmit={onSubmit} className='flex items-center justify-center flex-col h-full '>
                    
                   
                    {/* email feild */}
                    <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Email"
                            type="text"
                            name="email"
                            placeholder="email"
                            value={user.email}
                            handleChange={handleChange}
                    />
                    </div>
                    {/* passwoard feild */}
                    <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Password"
                            type="text"
                            name="password"
                            placeholder="password"
                            value={user.password}
                            handleChange={handleChange}
                    />
                    </div>
                    {/* btn */}
                    <div>
                        <button 
                        type='submit'
                        className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
                        > {user.haveAccount?"Login":"SignUp"}</button>
                    </div>
                    
                </form>
            </div>
        </div>
        {/* image section */}
        <div className='h-full lg:w-7/12 w-full sm:w-4/12 mt-[6rem] sm:mt-0'>
            <img src={loginShow} alt="loginShow" className='h-full rounded-t-[3.5rem] sm:rounded-tr-[0] sm:rounded-l-[3.5rem]  object-cover '  />
        </div>

     
    </div>
  )
}

export default LoginPage
