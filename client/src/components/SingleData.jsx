import React from 'react'

const SingleData = ({status,yearOfPurchase, customerName,place,placeId,appNumber
}) => {
    
  return (
    <div className='bg-gray-50 m-1  justify-center flex p-3 w-4/12 rounded-md shadow-md hover:shadow-lg transition duration-400 ease-in-out '>
        {/* head */}
      <div className='text-right mr-3'>
        <p>Status</p>
        <p>Place</p>
        <p>Place Id</p>
        <p>Year of Purchase</p>
        <p>Customer Name</p>
        <p>App Number</p>

      </div>
      {/* data */}
      <div className='text-green-600'>
       <p>{status}</p>
        <p>{place}</p>
        <p>{placeId}</p>
        <p>{yearOfPurchase}</p>
        <p>{customerName}</p>
        <p>{appNumber}</p>
      </div>
    </div>
  )
}

export default SingleData
