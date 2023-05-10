
import DatePicker from "react-datepicker";
import { useState, } from 'react';
import { useAppContext } from '../context/appContext';

const statusOptions=['Regular','Outstanding']
const placeOptions=["Ajmer","Delhi"]

const SearchContainer = () => {

 
 


  const [form,setForm]=useState({
    status:"All",
    place:"All",
    yearOfPurchase:"",
    customerName:"",
    
  });
  const [startDate, setStartDate] = useState(new Date());
  const {getAllData}=useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    getAllData(form); 
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <div >
      <form onSubmit={handleSubmit} className='bg-gray-50 w-full mx-auto rounded p-7  shadow-md hover:shadow-lg transition duration-400 ease-in-out'>
  {/* status */}
  <h1 className='text-[2rem] mb-5'>Search form </h1>
      <div className='flex justify-evenly flex-wrap gap-3'>
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
    {(form.yearOfPurchase!='' && form.yearOfPurchase.length!==4) ? <p className="text-sm text-red-500">*year should be length of 4</p>:<p></p>
    }
  </div>
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
      </div>
      
  
  <button
    type='submit'
    className='w-3/12 mt-6 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 '
  >
    Apply filters
  </button>
  {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
</form>

  
    </div>
  )
  // return (
  //   <div className=' w-10/12 mx-auto mt-5 '>
  //     <form className='form'>
        
  //       {/* search position */}
  //       <div className='form-center'>
  //        <div className='flex justify-center'>
  //          {/* customer name */}
  //       <div>
  //         <div className='flex items-center gap-2 mb-2'>
  //         <label 
  //         htmlFor={"customerName"}
  //         className="block text-sm font-medium text-gray-900"
  //         >
  //           {"Customer Name"}
  //         </label>
  //         </div>
  //         <input
  //         type={"text"}
  //         id={form.customerName}
  //         name={form.customerName}
  //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
  //         value={form.customerName}
  //         onChange={handleChange}
  //         />
  //       </div>
  //      {/* yearOfPurchase */}
  //       <div>
  //         <div className='flex items-center gap-2 mb-2'>
  //         <label 
  //         htmlFor={"yearOfPurchase"}
  //         className="block text-sm font-medium text-gray-900"
  //         >
  //           {"Year Of purchase"}
  //         </label>
  //         </div>
  //         <input
  //         type={"number"}
  //         id={form.yearOfPurchase}
  //         name={form.yearOfPurchase}
  //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
  //         value={form.yearOfPurchase}
  //         onChange={handleChange}
  //         />
  //       </div>
  //        </div>
  //         {/* status select */}
       
  //         <div className='flex justify-center'>
  //         <div className='form-row'>
  //         <label htmlFor={'status'} className='form-label'>
  //           {'status'}
  //         </label>
    
  //         <select
  //           name={'status'}
  //           value={form.status}
  //           onChange={handleChange}
  //           className='form-select'
  //         >
  //           {['all',...statusOptions].map((itemValue, index) => {
  //             return (
  //               <option key={index} value={itemValue}>
  //                 {itemValue}
  //               </option>
  //               );
  //             })}
  //           </select>
  //         </div>
  //         {/* jobType select */}
  //         <div className='form-row'>
  //         <label htmlFor={'place'} className='form-label'>
  //           {'place'}
  //         </label>
    
  //         <select
  //           name={'searchType'}
  //           value={form.place}
  //           onChange={handleChange}
  //           className='form-select'
  //         >
  //           {['all',...placeOptions].map((itemValue, index) => {
  //             return (
  //               <option key={index} value={itemValue}>
  //                 {itemValue}
  //               </option>
  //               );
  //             })}
  //           </select>
  //         </div>
  //         </div>
  //         {/* sort select */}
  //         {/* <div className='form-row'>
  //         <label htmlFor={'sort'} className='form-label'>
  //           {'sort'}
  //         </label>
    
  //         <select
  //           name={'sort'}
  //           value={sort}
  //           onChange={handleSearch}
  //           className='form-select'
  //         >
  //           {['all',...sortOptions].map((itemValue, index) => {
  //             return (
  //               <option key={index} value={itemValue}>
  //                 {itemValue}
  //               </option>
  //               );
  //             })}
  //           </select>
  //         </div> */}
  //         {/* clear btn */}
  //         <button
  //           className='btn btn-block btn-danger'
  //           // disabled={0}
  //           onClick={handleSubmit}
  //         >
  //           apply filters
  //         </button>

          
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default SearchContainer;