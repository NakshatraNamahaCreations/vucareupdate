import React, { useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../App.css";

function ServiceBooking() {
  const [allBookedServices, setallBookedServices] = useState();
  const [Serivid, setSerivid] = useState([]);
  const [BookedId, setBookedId] = useState([]);
  useEffect(() => {
    getServiceDetails();
    getAllServices();
  }, []);
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `http://api.vijnanacademy.com/api/getservicedetails`
      );
      if (response.status === 200) {
        let filteredData = response.data.servicedetails;
        setallBookedServices(filteredData);
        let idd = filteredData.map((ele) => ele.serviceID);
        setBookedId(idd);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://api.vijnanacademy.com/api/userapp/getservices"
      );
      if (res.status === 200) {
        let BookedIDD = BookedId.map((ele) => ele);
        let filteredData = res.data.service.filter((ele) =>
          ele._id.includes(BookedIDD)
        );
        setSerivid(filteredData);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row m-auto">
          <table class="table table-hover table-bordered mt-5">
            <thead className="text-align-center">
              <tr className="table-secondary ">
                <th className="table-head" scope="col">
                  S.No
                </th>
                <th className="table-head" scope="col">
                  User Name
                </th>
                <th className="table-head" scope="col">
                  User Email
                </th>
                <th className="table-head" scope="col">
                  User Address
                </th>
                <th className="table-head" scope="col">
                  User Contact No.
                </th>
                <th className="table-head" scope="col">
                  Service Name
                </th>
                <th className="table-head" scope="col">
                  Service Price
                </th>
                <th className="table-head" scope="col">
                  Service Image
                </th>
                <th className="table-head" scope="col">
                  Discount Percentage(%)
                </th>
                <th className="table-head" scope="col">
                  Service booked date
                </th>

                <th className="table-head" scope="col">
                  Service validity date
                </th>
                <th className="table-head" scope="col">
                  Service delivery address
                </th>

                <th className="table-head" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="justify-content-center">
              {/* <tr className="user-tbale-body text-center">
                <td>1</td>
                <td>Vu Care</td>
                <td>thevucare@gmail.ocm</td>
                <td>Banglore jp nagar</td>
                <td>9328452913</td>
                <td>cleaning Bathroom</td>
                <td>3400</td>

                <td>
                  <img
                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRs26eXltFe1PsOeue7eM2ZquYKXKfbke5PijrBwVDevlIdzbkj"
                    width={"30px"}
                    height={"30px"}
                  />
                </td>
                <td>5%</td>
                <td>02-06-2023</td>
                <td>04-08-2023</td>
                <td>Bengaluru</td>
                <td>
                  {" "}
                  <span>Completed </span>
                  <Button variant="success">Edit</Button>{" "}
                </td>
              </tr> */}

              {allBookedServices?.map((ele, index) => {
                let userData;
                let ServiceData;
                ele.customerData.flatMap((user) => {
                  userData = user;
                });
                Serivid.map((Ele) => (ServiceData = Ele));

                const deliveryAddressObj = JSON?.parse(ele?.deliveryAddress);
                return (
                  <tr className="user-tbale-body text-center">
                    <td>{index + 1}</td>
                    <td>{userData.customerName}</td>
                    <td>{userData.email}</td>
                    <td className="tds">
                      {" "}
                      <span> {deliveryAddressObj?.landmark}</span>
                      <span>{deliveryAddressObj?.streetName}</span>
                      <span>{deliveryAddressObj?.address}</span>
                      <span>{deliveryAddressObj?.city}</span>
                      <span>{deliveryAddressObj?.state}</span>
                      <span>{deliveryAddressObj?.zipcode}</span>
                    </td>
                    <td>{userData.contactPerson}</td>
                    <td>{ele.service}</td>
                    <td>{ele.TotalAmt}</td>

                    <td>
                      <img
                        src={`http://api.vijnanacademy.com/service/${ServiceData?.serviceImg}`}
                        alt=""
                        height={"30px"}
                        width={"30px"}
                      />
                    </td>
                    <td>5%</td>
                    <td>
                      {" "}
                      {moment(ServiceData?.updatedAt).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </td>
                    <td>
                      {moment(ServiceData?.expiryDate).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </td>
                    <td>{ele.city}</td>
                    <td>
                      {" "}
                      <span>Completed </span>
                      <Button variant="success">Edit</Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
