import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Painting() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [workDetails, setWorkDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [customerPayments, setCustomerPayments] = useState([]);
  const [vendorPayments, setVendorPayments] = useState([]);
  const [data, setdata] = useState([]);
  const { cardNo } = useParams();
  console.log(cardNo);
  const navigate = useNavigate();
  useEffect(() => {
    getservicedata();
  }, []);

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getrunningdata");
    if (res.status === 200) {
      const filteredData = res.data?.runningdata.filter(
        (i) => i.cardNo == cardNo
      );
      setdata(filteredData);
    }
  };
  console.log("CustomerDetails===", data);
  const PaintingURL = () => {
    navigate(`/painting/${cardNo}`);
  };
  const PaymentURL = () => {
    navigate(`/payment/${cardNo}`);
  };
  const WorkURL = () => {
    navigate(`/work/${cardNo}`);
  };

  const treatmentURL = () => {
    navigate(`/treatmentdetails/${cardNo}`);
  };
  const customerAddURL = () => {
    navigate(`/customeradd/${cardNo}`);
  };

  const getPaymentById = async () => {
    try {
      const customerId = data[0]?.customer[0]?._id;
      console.log("customerId", customerId);
      let res = await axios.get(
        apiURL + `/getPaymentByCustomerId/${customerId}`
      );
      if (res.status === 200) {
        console.log("PaymentDetails", res);
        setPaymentDetails(res.data?.payments);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getWorkById = async () => {
    try {
      const customerId = data[0]?.customer[0]?._id;
      console.log("customerId", customerId);
      let res = await axios.get(apiURL + `/getWorkByCustomerId/${customerId}`);
      if (res.status === 200) {
        console.log("workDetails", res);
        setWorkDetails(res.data?.works);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getPaymentById();
    getWorkById();
  }, [data]);

  useEffect(() => {
    // Filter payments by paymentType
    const customerPayments = paymentDetails.filter(
      (payment) => payment.paymentType === "Customer"
    );
    const vendorPayments = paymentDetails.filter(
      (payment) => payment.paymentType === "Vendor"
    );

    setCustomerPayments(customerPayments);
    setVendorPayments(vendorPayments);
  }, [paymentDetails]);

  var i = 1;
  // var index = 1;
  const treatmentData = data[0]?.treatmentData;
  // Function to calculate subtotal for each item in the treatmentData array
  const calculateSubtotal = (item) => {
    const qty = parseInt(item.qty);
    const rate = parseInt(item.rate);
    return qty * rate;
  };

  // Calculate subtotal for each item and store in an array
  const subtotals = treatmentData?.map(calculateSubtotal) || [];

  // Calculate the total subtotal by summing up all the subtotals
  const totalSubtotal = subtotals.reduce(
    (total, subtotal) => total + subtotal,
    0
  );


 

  function GST() {
    const findGSTPresents = data[0]?.quotedata[0]?.GST;
    if (findGSTPresents) {
      const calculateGST = totalSubtotal * 0.05;
      return calculateGST;
    } else {
      return "0.0";
    }
  }

  const getGST = GST();
  return (
    <div>
      <Header />
      <ul className="nav-tab-ul">
        <li>
          <a
            onClick={() => customerAddURL()}
            className="hover-tabs"
            style={{ cursor: "pointer",color:"white" }}
          >
            Customeradd
          </a>
        </li>
        <li>
          <a
            onClick={() => treatmentURL()}
            className="hover-tabs"
            style={{ cursor: "pointer" }}
          >
            Treatment
          </a>
        </li>
        <li>
          <a
            onClick={() => PaintingURL()}
            className="hover-tabs currentTab"
            style={{ cursor: "pointer" }}
          >
            Painting
          </a>
        </li>
        <li>
          <a
            onClick={() => PaymentURL()}
            className="hover-tabs"
            style={{ cursor: "pointer" }}
          >
            Payment
          </a>
        </li>
        <li>
          <a onClick={() => WorkURL()} className="hover-tabs ">
            Work
          </a>
        </li>
      </ul>
      <div
        style={{
          border: "1px solid color(srgb 0.855 0.855 0.855)",
          width: "95%",
          margin: "0px 28px",
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        <b>
          Customer Painting Details &gt;
          {/* &#8827;{" "}  */}{" "}
          {data[0]?.customerData[0]?.customerName.charAt(0).toUpperCase() +
            data[0]?.customerData[0]?.customerName.slice(1)}
        </b>
      </div>
      <div className="row m-auto">
        <div className="col-md-12">
          <div className="mt-2 p-3">
            <h5>Enquiry Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr table-secondary clr">
                  <th scope="col">
                    <input className="vhs-table-input" />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <select>
                      <option value="">Select</option>
                    </select>{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      className="vhs-table-input"
                      placeholder="Enq Date "
                    />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      className="vhs-table-input"
                      placeholder="Enq Time"
                    />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      placeholder="Name"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      placeholder="Contact"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      placeholder="Address"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                  <th scope="col">
                    <input
                      placeholder="Reference"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                  <th scope="col">
                    <input
                      placeholder="Reference"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <select>
                      <option value="">Select </option>
                    </select>{" "}
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      placeholder="Interested For"
                      className="vhs-table-input"
                    />
                  </th>
                  <th scope="col">
                    {" "}
                    <input
                      placeholder="Executive"
                      className="vhs-table-input"
                    />{" "}
                  </th>
                </tr>
                <tr className="tr clr">
                  <th>#</th>
                  <th>Category</th>
                  <th>En.Date</th>
                  <th>Executive</th>
                  <th>Name</th>
                  <th>Contact1</th>
                  <th>Contact2</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Reference</th>
                  <th>Interested for</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {data.map((enquiry, index) =>
                  enquiry.enquiryData.map((item, itemIndex) => (
                    <tr key={index + "-" + itemIndex}>
                      <td>{index + 1} </td>
                      <td> {item.category} </td>
                      <td> {item.enquirydate} </td>
                      <td> {item.executive} </td>
                      <td> {item.name} </td>
                      <td> {item.contact1} </td>
                      <td>{item.contact2} </td>
                      <td> {item.email} </td>
                      <td> {item.address}</td>
                      <td> {item.reference1} </td>
                      <td> {item.intrestedfor} </td>
                      <td> {item.comment} </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 p-3">
            <h5>Enquiry Followup Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr table-secondary">
                  <th>#</th>
                  <th> Date</th>
                  <th>Staff</th>
                  <th>Response</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Next Foll</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((followup, index) =>
                  followup.enquiryFollowupData.map((item, itemIndex) => (
                    <tr key={index + "-" + itemIndex}>
                      <td>{index + 1}</td>
                      <td>{item.folldate}</td>
                      <td>{item.staffname}</td>
                      <td>{item.response}</td>
                      <td>{item.desc}</td>
                      <td>{item.value}</td>
                      <td>{item.nxtfoll}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 ps-3 pe-3">
            <h5>Quote Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr table-secondary">
                  <th>#</th>
                  <th>Region</th>
                  <th>Material</th>
                  <th>Job</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((quote, index) =>
                  quote.treatmentData.map((item, itemIndex) => (
                    <tr key={index + "-" + itemIndex}>
                      <td>{itemIndex + 1}</td>
                      <td>{item.region}</td>
                      <td>{item.material}</td>
                      <td>{item.job}</td>
                      <td>{item.qty}</td>
                      <td className="text-end">{item.rate}.00</td>
                      <td className="text-end">{item.subtotal}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td style={{ backgroundColor: "#ededed" }}></td>
                  <td
                    className="text-end"
                    style={{ backgroundColor: "#ededed" }}
                  >
                    <b> {totalSubtotal}</b>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className="pt-1 ps-3">
                  <td colspan="7">
                    <div>
                      <span>
                        <b>Project Type: </b>
                      </span>
                      <span>2bhk Vc </span>
                    </div>
                    <div>
                      <span>
                        <b>Sales Manager:</b>
                      </span>
                      <span> {data[0]?.quotedata[0]?.salesExecutive}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>GST (5%)</td>

                  <td className="text-end">{getGST}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>TOTAL</td>
                  <td className="text-end">
                    {data[0]?.quotedata[0]?.total}.00{" "}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td> Adjustments</td>
                  <td className="text-end">
                    {data[0]?.quotedata[0]?.adjustments}.00{" "}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>NET TOTAL</b>{" "}
                  </td>
                  <td className="text-end">
                    {data[0]?.quotedata[0]?.netTotal}.00{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 p-3">
            <h5>Work Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr table-secondary">
                  <th>#</th>
                  <th>Date</th>
                  <th>Milestone</th>
                  <th>Work Details</th>
                  <th>Material Use</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {workDetails.map((work, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{work?.workDate}</td>
                    <td>{work?.workMileStone}</td>
                    <td>{work?.workDetails}</td>
                    <td>{work?.workMaterialUse}</td>
                    <td>{work?.workRemark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 p-3">
            <h5>Customer Payment</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr">
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {customerPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{payment?.paymentDate}</td>
                    <td>{payment?.amount}</td>
                    <td>{payment?.paymentMode}</td>
                    <td>{payment?.Comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 p-3">
            <h5>Vendor Payment</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr table-secondary clr">
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {vendorPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{payment?.paymentDate}</td>
                    <td>{payment?.amount}</td>
                    <td>{payment?.paymentMode}</td>
                    <td>{payment?.Comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="mt-2 p-3">
            <h5>Deep Cleaning Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr table-secondary clr">
                  <th>#</th>
                  <th>Date</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Painting;

