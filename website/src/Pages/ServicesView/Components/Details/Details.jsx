// import React, { useState } from "react";
// import "./details.scss";
// import Select from "react-select";

// import axios from "axios";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// export default function Details() {
//   const location = useLocation();

//   const selectedCategory = new URLSearchParams(location.search).get("id");
//   const [categoryData, setCategoryData] = useState([]);
//   const [subsubcategory, setsubsubcategory] = useState([]);
//   const [City, setCity] = useState([]);

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [SearchItem, setSearchItem] = useState("");

//   const handleChange = (e) => {
//     setSelectedOption(e);
//   };

//   useEffect(() => {
//     getAllCategory();
//     getAllSubsubCategory();
//     getCity();
//   }, []);
//   const getAllCategory = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8008/api/userapp/getappsubcat"
//       );
//       if (res.status === 200) {
//         setCategoryData(res.data.subcategory);
//       }
//     } catch (er) {
//       console.log(er, "err while fetching data");
//     }
//   };

//   const getAllSubsubCategory = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8008/api/userapp/getappresubcat"
//       );
//       if (res.status === 200) {
//         setsubsubcategory(res.data.subcategory);
//       }
//     } catch (er) {
//       console.log(er, "err while fetching data");
//     }
//   };

//   const getCity = async () => {
//     try {
//       let res = await axios.get("http://localhost:8008/api/master/getcity");
//       if (res.status === 200) {
//         setCity(res.data.mastercity);
//       }
//     } catch (er) {
//       console.log(er, "err while fetching data");
//     }
//   };
//   const city = City.map((ele) => ({ label: ele.city, value: ele.city }));

//   const handleSearch = (e) => {
//     let text = e.target.value;
//     setSearchItem(text);
//   };

//   const cityName = localStorage.getItem("cityname");

//   return (
//     <section className="details">
//       <div className="container">
//         <div className="search">
//           <Select
//             placeholder="Select Option"
//             value={selectedOption}
//             className="custom_select"
//             options={city}
//             onChange={handleChange}
//             getOptionLabel={(e) => (
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <span style={{ marginLeft: 5 }}>{e.label}</span>
//               </div>
//             )}
//             labelKey="label"
//             valueKey="value"
//           />

//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Search Services"
//             onChange={(e) => handleSearch(e)}
//           />
//         </div>

//         <div className="row main_row">
//           <div className="col-md-7">
//             <div className="details_container">
//               <div className="title">
//                 {categoryData
//                   .filter((ele) => ele.subcategory === selectedCategory)
//                   .map((ele, index) => (
//                     <span key={index}>{ele.subcategory} in</span>
//                   ))}

//                 <span>{cityName}</span>
//               </div>
//               <div className="rating">
//                 <div className="stars d-flex">
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 19 19"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
//                   </svg>
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 19 19"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
//                   </svg>
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 19 19"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
//                   </svg>
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 19 19"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
//                   </svg>
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 19 19"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
//                   </svg>
//                 </div>
//                 <div className="rating_count">4.0</div>
//                 <div className="counts">
//                   ( 7K+ Reviews | 31 Lakh+ Happy Customer )
//                 </div>
//               </div>
//               <div className="book_action">
//                 <button>Book our service, let the good times roll.</button>
//               </div>
//               <div className="types">
//                 <div className="row">
//                   <div className="col-md-9 ">
//                     <div className="row">
//                       {subsubcategory
//                         .filter((ele) => ele.subcategory === selectedCategory)
//                         .map((Ele) => (
//                           <div className="col-md-6 mb-3">
//                             <div>
//                               <img
//                                 style={{
//                                   borderRadius: "100px",
//                                   border: "2px solid #03b162",
//                                 }}
//                                 width={150}
//                                 height={150}
//                                 className="imgs "
//                                 src={`http://localhost:8008/resubcat/${Ele.resubcatimg}`}
//                                 alt=""
//                               />
//                             </div>
//                             <span className="subs">{Ele.sub_subcategory}</span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-5">
//             <div className="details_img">
//               {categoryData
//                 .filter((ele) => ele.subcategory.includes(selectedCategory))
//                 .map((Ele) => (
//                   <div key={Ele}>
//                     <video width="440" height="260" autoPlay loop controls>
//                       <source
//                         src={`http://localhost:8008/subcat/${Ele?.subcatvideo}`}
//                         type="video/mp4"
//                       />
//                     </video>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import Carousel from 'react-bootstrap/Carousel';

function Details() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="./assests/bnr3.avif"
          alt="First slide"
          height="500px"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./assests/bnr4.avif"
          alt="Second slide"
          height="500px"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./assests/bghe.jpg"
          alt="Third slide"
          height="500px"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Details;