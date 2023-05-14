import React,{useEffect, useState} from 'react'
import { Loader } from '../../components'
import { useAppContext } from '../../context/appContext';

const Data = () => {
  const {editRequestData,getAllEditRequest,getAllData,mainData,isLoading,editDataStatusChange,approveEditRequest,rejectEditRequest}=useAppContext();
 
  useEffect(()=>{
    getAllData({
      status:"All",
      place:"All",
      yearOfPurchase:"",
      customerName:"",
    });
    getAllEditRequest();
  },[editDataStatusChange])

  useEffect(()=>{
    
  },[editDataStatusChange])


  const DataToShow=mainData.filter((data)=> editRequestData.some(editData=>{  
    return String(editData.dataId)===String(data._id) && editData.status === "pending";
  }));
  
  // making all entries of data in DataToShow array for [lastValue,editedValue]
  for (let i = 0; i < DataToShow.length; i++) {
    const data = DataToShow[i];
   
    for (let j = 0; j < editRequestData.length; j++) {
      const editData = editRequestData[j];
     
      if(String(data._id)===String(editData.dataId)){
        for (let key in data) {
          if (editData?.dataToUpdate?.hasOwnProperty(key) && data[key] !== editData?.dataToUpdate[key]) {
            if (typeof data[key] !== 'object') {
              let lastValue = data[key];
              let editedValue = editData.dataToUpdate[key];
              data[key] = [lastValue, editedValue];
            }
          } else {
            if (typeof data[key] !== 'object') {
              let lastValue = data[key];
              data[key] = [lastValue];
            }
          }
  
          
        }
      }
     
    }
  }
  




  
   console.log(DataToShow); 
  return (
    <>

    <div className='bg-[#f0f4f8] h-screen py-10 px-[3rem] border-t border-l border-gray-300'>
      
     {isLoading?(<div className='w-full flex justify-center items-center'>
      <Loader></Loader>
     </div>):(
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {DataToShow.length>0 ?(<table className="w-full text-sm text-left ">
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
                  <th scope="col" className="px-6 py-3">
                    Action
                </th>
              </tr>
          </thead>
          <tbody>
            {
              DataToShow.map((obj)=>{
  
                return (
                  <tr key={obj._id[0]} className="bg-white border-b dark:bg-gray-100 ">
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                     <p className={`${obj.customerName.length>1 && "text-red"}`}>  { obj.customerName[0]}</p>
                     { obj.customerName[1] && <p className='text-blue-600'>{obj.customerName[1]}</p>}
                  </td>
                  <td className="px-6 py-4">
                      <p className={`${obj.appNumber.length>1 && "line-through"}`}>{ obj.appNumber[0]}</p>
                        { obj.appNumber[1] && <p className='text-blue-600'>{obj.appNumber[1]}</p>}
                  </td>
                  <td className="px-6 py-4">
                      <p className={`${obj.place.length>1 && "line-through"}`}>{ obj.place[0]}</p>
                        { obj.place[1] && <p className='text-blue-600'>{obj.place[1]}</p>}
                  </td>
                  <td className="px-6 py-4 ">
                      <p className={`${obj.placeId.length>1 && "line-through"}`}>{ obj.placeId[0]}</p>
                            { obj.placeId[1] && <p className='text-blue-600'>{obj.placeId[1]}</p>}
                      </td>
                  <td className="px-6 py-4 text-center">
                      <p className={`${obj.yearOfPurchase.length>1 && "line-through"}`}>{ obj.yearOfPurchase[0]}</p>
                            { obj.yearOfPurchase[1] && <p className='text-blue-600'>{obj.yearOfPurchase[1]}</p>}
                  </td>
                  <td className="px-6 py-4">
                     
                      <p className={`${obj.status.length>1 && "line-through"}`}>{ obj.status[0]}</p>
                            { obj.status[1] && <p className='text-blue-600'>{obj.status[1]}</p>}
                  </td>
                  <td className="px-6 py-4 flex justify-center flex-col relative">
                    <button onClick={()=>approveEditRequest(obj._id)} className="block mb-1 font-medium text-green-400 dark:text-green-500 hover:underline">Approve</button>
                    <button onClick={()=>rejectEditRequest(obj._id)} className="block font-medium text-red-400 dark:text-red-500 hover:underline">Reject</button>
    
                 </td>
              
                  
              </tr>
                )
                
              })
            }
           
          </tbody>
      </table>):<div className='flex items-center justify-center  text-[3rem]'>Data Not Found</div>}
  </div>
     )}


    </div>
    </>
  )
}

export default Data
