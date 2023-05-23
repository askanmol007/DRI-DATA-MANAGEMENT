import React, { useEffect, useState } from "react";
// import  Pagination  from '../../pages/dashboard/pagination'
import { Loader, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  return (
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
             Amc
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
          {currentItems.map((obj) => {
            return (
              <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                  {obj.customerName}
                </th>
                <td className="px-6 py-4">{obj.appNumber}</td>
                <td className="px-6 py-4">{obj.place}</td>
                <td className="px-6 py-4 ">{obj.amc}</td>
                <td className="px-6 py-4 text-center">{obj.yearOfPurchase}</td>
                <td className="px-6 py-4">{obj.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Data = () => {
  const { getAllData, mainData, isLoading } = useAppContext();

  useEffect(() => {
    getAllData({
      status: "All",
      place: "All",
      yearOfPurchase: "",
      customerName: "",
      editStatus: "All",
    });
  }, []);

  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 25;
  const currentItems = mainData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mainData.length / 25);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 25) % mainData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="bg-[#f0f4f8] h-full  py-10 px-[3rem] border-t border-l border-gray-300">
        <SearchContainer />
        {/* <Pagination/> */}
        {/* <p className='mt-10'> {!mainData?.length>0?"Data not found":`${mainData?.length} results found`} </p> */}

        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <>
          <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={
                "pagination"
              } /* as this work same as bootstrap class */
              subContainerClassName={
                "pages pagination"
              } /* as this work same as bootstrap class */
              activeClassName={"active"}
            />
            <Items currentItems={currentItems} />
          </>
        )}
        {/* <Pagination {...pageInfo} /> */}
      </div>
    </>
  );
};

export default Data;
