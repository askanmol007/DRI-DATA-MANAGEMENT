import React,{useEffect} from 'react'
import { Loader, SearchContainer } from '../../components'
import { useAppContext } from '../../context/appContext';
const Data = () => {
  const {getAllData,mainData,isLoading}=useAppContext();
  


    
  return (
    <div className='bg-[#f0f4f8] h-full  py-10 px-[3rem] border-t border-l border-gray-300'>
      <SearchContainer/>
     <p className='mt-10'> {!mainData?.length>0?"Data not found":`${mainData?.length} results found`} </p>
      
     {isLoading?(<div className='w-full flex justify-center items-center'>
      <Loader></Loader>
     </div>):(
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                  Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                  App number
                  </th>
                  <th scope="col" className="px-6 py-3">
                      place
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Place Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Year of Purchase 
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Status
                  </th>
              </tr>
          </thead>
          <tbody>
            {
              mainData.map((obj)=>{
  
                return (
                  <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                     { obj.customerName}
                  </th>
                  <td className="px-6 py-4">
                      {obj.appNumber}
                  </td>
                  <td className="px-6 py-4">
                      {obj.place}
                  </td>
                  <td className="px-6 py-4 ">
                      {obj.placeId}
                  </td>
                  <td className="px-6 py-4 text-center">
                      {obj.yearOfPurchase}
                  </td>
                  <td className="px-6 py-4">
                      {obj.status}
                  </td>
                  
              </tr>
                )
                
              })
            }
           
          </tbody>
      </table>
  </div>
     )}


    </div>
  )
}

export default Data
