import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Header from "./Header";
import NabarCompo from "./navbar";
import Modal from "@mui/material/Modal";
// import CartDetails from "../Pages/ViewCart/Components/CartDetails"
// import  "../Pages/ViewCart/Components/cartdetails.scss"
// import ViewCart from "../Pages/ViewCart/ViewCart";
import "../Component/Servicedetails.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

function Servicedetails() {
  const location = useLocation();
  const { subcategory, SelecteddCity } = location.state || {};
  const [serviceData, setserviceData] = useState([]);
  const [subModel, setsubModel] = useState(false);
  const [filtersub, setfiltersub] = useState([]);
  const [pricesdata, setpricesdata] = useState([]);
  const [Item, setItem] = useState([]);
  const [City, setCity] = useState(null);
  const [SelectedCity, setSelectedCity] = useState(SelecteddCity);
  const [Price, setPrices] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [DefaultPrice, setDefaultPrice] = useState(null);
  const [ServiceID, setServiceID] = useState(null);
  const [ServiceIDD, setServiceIDD] = useState(null);
  const [Bannerdata, setBannerdata] = useState([]);
  useEffect(() => {
    getAllServices();
    getbannerimg();
    getCity();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getservices"
      );
      if (res.status === 200) {
        setserviceData(res.data.service);
        let subcategory = Item?.category?.toLowerCase();

        setfiltersub(
          res?.data?.subcategory?.filter((ele) => {
            let category = ele?.category?.toLowerCase();
            return category.includes(subcategory);
          })
        );
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const handlebookclick = (clickedItem) => {
    // console.log(clickedItem,"item")
    // setpricesdata(clickedItem?.morepriceData);
    setItem(clickedItem);

    setsubModel(true);
    // window.location.assign("/");
    console.log(clickedItem, "clickedItem");
  };

  const getCity = async () => {
    try {
      let res = await axios.get("http://localhost:8008/api/master/getcity");
      if (res.status === 200) {
        setCity(res.data.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const handleHrSelect = (sersid, hr) => {
    const filteredData = serviceData
      .filter((ele) => ele._id === sersid)
      .flatMap((ele) => ele.morepriceData.filter((item) => item?._id === hr));
    setServiceIDD(sersid);
    setPrices(filteredData);
    setPriceId(hr);
  };

  useEffect(() => {
    if (serviceData.length > 0) {
      const allServiceIDs = serviceData.map((service) => service._id);

      if (allServiceIDs.length > 0) {
        const defaultPrice = serviceData.map((ele) => ele.morepriceData[0]);
        setDefaultPrice(defaultPrice);
      }

      setServiceID(allServiceIDs);
    }
  }, [serviceData]);
  const handleAdd = (state) => {
    console.log(state, "state");
  };

  const getbannerimg = async () => {
    let res = await axios.get(
      "http://localhost:8008/api/getallsubcatwebbanner"
    );
    if ((res.status = 200)) {
      let filteredData = res.data.subcategoyrbanner.filter((Ele) =>
        Ele.category.includes(subcategory)
      );
      setBannerdata(filteredData);
      // console.log(res.data?.subcategoyrbanner);
    }
  };

  return (
    <>
      <NabarCompo />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="row m-auto mb-5">
              {/* <div className="col-md-6"> */}
              <Form.Select
                value={SelectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {City?.map((ele) => (
                  <option value={ele.city} key={ele.city}>
                    {ele.city}
                  </option>
                ))}
              </Form.Select>
              {/* </div> */}
              <h1 className="text-bold mt-5">
                {subcategory} in {SelectedCity}
              </h1>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="row ">
              {Bannerdata.map((Ele) => (
                <img
                  style={{ borderRadius: "20px" }}
                  alt=""
                  className="header_logo"
                  src={`http://localhost:8008/subcatwebBanner/${Ele.banner}`}
                  width={100}
                  height={440}
                />
              ))}{" "}
            </div>
          </div>
        </div>
        <div className="row  ">
          <div className="col-md-6 ">
            {serviceData?.map((service, index) => {
              return (
                <div className="row mt-5">
                  <div className="col-8">
                    <h3>{service.serviceName}</h3>

                    <div className="d-flex mt-3">
                      <span className="me-3">{service.serviceHour}</span>
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        Start price
                      </p>
                      {Price && Price.length > 0
                        ? Price.flatMap((ele, priceIndex) => {
                            if (
                              ServiceIDD === service._id &&
                              ele._id === PriceId
                            ) {
                              return (
                                <div className="row" key={ele._id}>
                                  <p
                                    className="col-md-4 mx-2 price"
                                    style={{
                                      textDecorationLine: "line-through",
                                      color: "grey",
                                    }}
                                  >
                                    ₹{ele?.pPrice}
                                  </p>
                                  <p
                                    className="col-md-4"
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ₹{ele?.pofferprice}
                                  </p>
                                </div>
                              );
                            }
                          })
                        : ServiceID?.map((ele) => {
                            if (ele === service._id) {
                              return DefaultPrice?.map((price) => {
                                if (service?.morepriceData) {
                                  const filteredData =
                                    service.morepriceData.find(
                                      (data) => data._id === price?._id
                                    );

                                  if (filteredData) {
                                    return (
                                      <div className="row" key={ele._id}>
                                        <p
                                          className="col-md-4 mx-2 price"
                                          style={{
                                            textDecorationLine: "line-through",
                                            color: "grey",
                                          }}
                                        >
                                          ₹{filteredData?.pPrice}
                                        </p>
                                        <p
                                          className="col-md-4"
                                          style={{
                                            color: "black",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          ₹{filteredData?.pofferprice}
                                        </p>
                                      </div>
                                    );
                                  }
                                }
                              });
                            }
                          })}
                    </div>

                    <div className="row">
                      {service?.morepriceData?.map((moreprice, innerindex) => {
                        return (
                          <div className="col-md-3 area">
                            {moreprice?.pName && (
                              <label
                                htmlFor={moreprice._id}
                                key={moreprice._id}
                              >
                                <input
                                  type="radio"
                                  name={`bhk-${service._id}`}
                                  id={moreprice._id}
                                  defaultChecked={innerindex === 0}
                                  value={Price}
                                  onChange={() =>
                                    handleHrSelect(service._id, moreprice?._id)
                                  }
                                />
                                <span className="col-md-1">
                                  {moreprice?.pName?.toUpperCase()}
                                </span>
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p
                      style={{ color: "green" }}
                      onClick={() => handlebookclick(service)}
                    >
                      View details
                    </p>
                  </div>

                  <div className="col-md-4">
                    <img
                      width={300}
                      className="row m-auto"
                      height={200}
                      src={`http://localhost:8008/service/${service?.serviceImg}`}
                      alt=""
                      style={{ borderRadius: "10px" }}
                    />
                    {PriceId !== null &&
                      PriceId !== undefined &&
                      service._id === ServiceIDD && (
                        <div
                          className="m-auto text-center p-2"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            to="/viewcart"
                            state={{
                              passseviceid: service._id,
                              bhk: PriceId,
                              selectecity: SelectedCity,
                            }}
                            key={service.serviceName}
                            style={{ textDecoration: "none" }}
                          >
                            <button
                              style={{
                                width: "100px",
                                padding: "8px",
                                background: "gold",
                                color: "green",
                              }}
                            >
                              Add <AddIcon />
                            </button>
                          </Link>
                        </div>
                      )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="col-6 m-auto ">
            <div
              className="cart_item_box "
              style={{ marginLeft: "124px", height: "200px" }}
            >
              {serviceData?.map((ele) => {
                if (ele._id.includes(ServiceIDD)) {
                  return (
                    <>
                      <div className="item_title">{ele?.serviceName}</div>
                      <div className="item_content">
                        <div className="left">
                          <div className="left_img">
                            <img
                              src={`http://localhost:8008/service/${ele?.serviceImg}`}
                              alt=""
                            />
                          </div>

                          <div className="texts">
                            <h4>{ele.servicetitle}</h4>
                            {ele.morepriceData
                              .filter((item) => item?._id === PriceId)
                              .map((filteredElement) => (
                                <div key={filteredElement?._id}>
                                  {filteredElement?.pName}
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="col-md-5">
                          {/* <div className="row right"> */}
                          {ele.morepriceData
                            .filter((item) => item?._id === PriceId)

                            .map((filteredElement) => (
                              <div className="row   ">
                                <span className="col-md-6 m-auto wrong_price ">
                                  {filteredElement?.pPrice && "Rs."}{" "}
                                  {filteredElement?.pPrice}
                                </span>
                                <span className="col-md-6 m-auto real_price">
                                  {filteredElement?.pPrice && "Rs."}{" "}
                                  {filteredElement?.pofferprice}
                                </span>
                              </div>
                            ))}
                          {/* </div> */}
                        </div>
                      </div>
                    </>
                  );
                }
              })}{" "}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={subModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header ">
              <div className="col-11">
                <span>Select the subcategory</span>
              </div>
              <div onClick={() => setsubModel(false)}>
                <img
                  width={30}
                  height={30}
                  alt=""
                  src="..\assests\cancel1.png"
                  // style={{}}
                />
              </div>
            </div>
            <h3 className="text-center">{Item?.Subcategory}</h3>
            <div className="row modal_body">
              <div className="col-md-6">
                <h4>{Item?.serviceName}</h4>
                <p>
                  No Of Service Hour {Item?.serviceHour}{" "}
                  <AccessTimeIcon style={{ color: "grey" }} />
                </p>
                <p>
                  No of Service Man {Item?.NofServiceman}{" "}
                  <PeopleIcon style={{ color: "grey" }} />
                </p>

                <p className="p-1" style={{ color: "black" }}>
                  {Item?.subcategory}
                </p>

                <ul
                  style={{ fontSize: 15 }}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  {Item?.serviceDesc?.map((Ele) => (
                    <li>{Ele?.text}</li>
                  ))}
                  {console.log(Item, "item")}
                </ul>
              </div>
              <div className="col-md-4">
                <img
                  style={{ borderRadius: "20px" }}
                  src={`http://localhost:8008/service/${Item?.serviceImg}`}
                  alt=""
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Servicedetails;
