import { useState } from 'react';
import { useAppContext } from '../context/appContext';

const statusOptions=['Regular','Outstanding']
const placeOptions=["Ajmer","Delhi"]

function EditForm({setShow,dataId}) {
  const {mainData,editData}=useAppContext();
  const data=mainData.find(obj=>obj._id===dataId);

  const [form, setFormData] = useState({
    customerName: data?.customerName || "",
    appNumber: data?.appNumber || "",
    place: data?.place || "",
    placeId:data?.placeId || "",
    yearOfPurchase:data?.yearOfPurchase || "",
    status:data?.status || ""

  });
  

  const handleInputChange = (e) => {
    if(e.target.name==="customerName"){
      e.target.value=e.target.value.toUpperCase();
    }
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    form.yearOfPurchase=Number(form.yearOfPurchase)
    const changedData={};
    
    for(let key in data){
        if(form.hasOwnProperty(key) && data[key]!==form[key]){

          changedData[key]=form[key];
        }
    }
    
    editData(dataId,changedData);
    console.log(changedData)
  };

  return (
    <div className='absolute bg-[#dff9fb] z-10  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-blue-500 rounded-md border-t-4'>
  
    <form onSubmit={handleSubmit} className='bg-gray-50 w-full mx-auto rounded p-7  shadow-md hover:shadow-lg transition duration-400 ease-in-out'>
  
    <div className='flex items-center justify-between mb-5'>
      <h1 className='text-[2rem] mb'>Edit Data </h1>
      <button onClick={()=>setShow(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </button>
    </div>
    <div className='flex justify-evenly flex-wrap gap-3'>
      {/* Customer Name */}
      <div className='flex flex-col mb-4 flex-1'>
        <label htmlFor='customerName' className='text-lg mb-2'>Customer Name:</label>
        <input
          id='customerName'
          type='text'
          name='customerName'
          value={form.customerName}
          onChange={handleInputChange}
          className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {/* appNumber */}
      <div className='flex flex-col mb-4 flex-1'>
        <label htmlFor='appNumber' className='text-lg mb-2'>App Number:</label>
        <input
          id='appNumber'
          type='text'
          name='appNumber'
          value={form.appNumber}
          onChange={handleInputChange}
          className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {/* place */}
      <div className='flex flex-col mb-4 flex-1'>
        <label htmlFor='place' className='text-lg  mb-2'>Place:</label>
        <select
          id='place'
          name='place'
          value={form.place}
          onChange={handleInputChange}
          className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {
            ['All',...placeOptions].map((data)=>{
              return <option key={data} value={data}>{data}</option>
            })
          }
        </select>
      </div>
      {/* placeId */}
      <div className='flex flex-col mb-4 flex-1'>
        <label htmlFor='placeId' className='text-lg mb-2'>Place Id:</label>
        <input
          id='placeId'
          type='text'
          name='placeId'
          value={form.placeId}
          onChange={handleInputChange}
          className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {/* Year of Purchase */}
      <div className='flex flex-col mb-4 flex-1'>
        <label htmlFor='yearOfPurchase' className='text-lg  mb-2'>Year of Purchase</label>
        <input
      
          id='yearOfPurchase'
          type='number'
          name='yearOfPurchase'
          value={form.yearOfPurchase}
          onChange={handleInputChange}
          className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {(form.yearOfPurchase.length>0 && form.yearOfPurchase.length!==4) ? <p className="text-sm text-red-500">*year should be length of 4</p>:<p></p>
        }
      </div>
      {/* status */}
      <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='status' className='text-lg  mb-2'>Status:</label>
    <select
      id='status'
      name='status'
      value={form.status}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {
        ['All',...statusOptions].map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select>
    </div>
    
    </div>   
  
  <button
    type='submit'
    className='w-3/12 mt-4 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 '
  >
    Submit
  </button>
  
  
    </form>

    </div>
  );
}

export default EditForm;
