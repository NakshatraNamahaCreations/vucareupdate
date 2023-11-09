import React, { useState, useEffect } from "react";
import Customernav from "../components/Customernav";
import Header from "../components/layout/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Customeredit() {
    const location=useLocation();
    const {data}=location.state;
    console.log(data)
  const admin =JSON.parse(sessionStorage.getItem("admin"));
  const navigate=useNavigate();
  const [citydata, setcitydata] = useState([]);
  const [customertypedata, setcustomertypedata] = useState([]);
  const [customername, setcustomername] = useState(data.customerName);
  const [contactperson, setcontactperson] = useState(data.contactPerson);
  const [maincontact, setmaincontact] = useState(data.mainContact);
  const [alternatenumber, setalternate] = useState(data.alternateContact);
  const [email, setemail] = useState(data.email);
  const [gst, setgst] = useState(data.gst);
  const [rbhf, setrbhf] = useState(data.rbhf);
  const [cnap, setcnap] = useState(data.cnap);
  const [lnf, setlnf] = useState(data.lnf);
  const [mainarea, setarea] = useState(data.mainArea);
  const [city, setcity] = useState(data.city);
  const [pincode, setpincode] = useState(data.pincode);
  const [customertype, setcustomertype] = useState(data.customerType);
  const [size, setsize] = useState(data.size);
  const [color, setcolor] = useState(data.color);
  const [instructions, setinstructions] = useState(data.instructions);
  const [approach, setapproach] = useState(data.approach);
  const [serviceexecutive, setserviceexc] = useState(data.serviceExecute);
  const [category, setcategory] = useState(data.category)
  const apiURL = process.env.REACT_APP_API_URL;
  const [referecetypedata, setreferecetypedata] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [allCustomer, setallCustomer] = useState([]);
  const [latestCardNo, setLatestCardNo] = useState(0);
  const [categorydata, setcategorydata] = useState([]);

  const editcustomer = async (e) => {
    e.preventDefault();
    if (
      !customername ||
      !contactperson ||
      !maincontact ||
      !email ||
      !lnf ||
      !rbhf ||
      !cnap ||
      !city ||
      !approach ||
      !serviceexecutive
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        const config = {
          url: `/editcustomer/${data._id}`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            cardno: data.cardNo,
            customerName: customername,
            contactPerson: contactperson,
            category:category,
            mainContact: maincontact,
            alternateContact: alternatenumber,
            email: email,
            gst: gst,
            rbhf: rbhf,
            cnap: cnap,
            lnf: lnf,
            mainArea: mainarea,
            city: city,
            pinCode: pincode,
            customerType: customertype,
            size: size,
            color: color,
            instructions: instructions,
            approach: approach,
            serviceExecute: serviceexecutive,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            navigate(`/customersearchdetails/${data.cardNo}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };
  useEffect(() => {
    getcity();
    getcustomertype();
    getreferencetype();
    getuser();
    getAllCustomer();
    getcategory();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL+"/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };
  const getcustomertype = async () => {
    let res = await axios.get(
      apiURL+"/master/getcustomertype"
    );
    if ((res.status = 200)) {
      setcustomertypedata(res.data?.mastercustomertype);
    }
  };

  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
    }
  };
  const getuser = async () => {
    let res = await axios.get(apiURL + "/master/getuser");
    if ((res.status = 200)) {
      console.log(res.data.masteruser);
      setuserdata(res.data?.masteruser);
    }
  };
  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  const getAllCustomer = async () => {
    let res = await axios.get(apiURL+"/getcustomer");
    if (res.status === 200) {
      console.log("allCustomer----", res);
      setallCustomer(res.data?.customers);
      setLatestCardNo(res.data?.customers[0]?.cardNo);
    }
  };
  console.log("latestCardNo==", latestCardNo + 1);
  return (
    <div className="">
      <Header />
      <Customernav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="vhs-sub-heading">
                    <h5>Customer Basic Information</h5>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-sub-heading">
                      Card No : 
                    </div>
                    <div className="group pt-1 vhs-non-editable">{data.cardNo}{" "} </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Customer Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomername(e.target.value)}
                        defaultValue={data.customerName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      {" "}
                      Contact Person<span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontactperson(e.target.value)}
                        defaultValue={data.contactPerson}

                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading">
                    Customer Contact & GST Information
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Main Contact <span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <input
                        type="tel"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaincontact(e.target.value)}
                        defaultValue={data.mainContact}

                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Alternate Contact</div>
                    <div className="group pt-1">
                      <input
                        type="tel"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setalternate(e.target.value)}
                        defaultValue={data.alternateContact}

                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Email<span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <input
                        type="email"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setemail(e.target.value)}
                        defaultValue={data.email}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                   Category<span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                    <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        <option value={data.category}> {data.category}</option>
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                        {/* {categorydata.map((item) => (
                          <option value={item.category}>{item.category}</option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      GSTIN Id.
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setgst(e.target.value)}
                        defaultValue={data.gst}

                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading mt-3" ><h5>Customer Detail Address</h5></div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Room / Bunglow / House / Flat No.
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setrbhf(e.target.value)}
                        defaultValue={data.rbhf}

                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Colony / Nagar / Apartment / Plot Name
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcnap(e.target.value)}
                        defaultValue={data.cnap}

                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Landmark / Near By Famous Place
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setlnf(e.target.value)}
                        defaultValue={data.lnf}

                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Main Area</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setarea(e.target.value)}
                        defaultValue={data.mainArea}

                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option value={data.city}>{data.city}</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                        {/* {citydata.map((item) => (
                          <option value={item.city}>{item.city}</option>
                        ))} */}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Pincode</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setpincode(e.target.value)}
                        defaultValue={data.pinCode}

                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading mt-3">
                   <h5>Customer Other Information</h5> 
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Customer Type
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomertype(e.target.value)}
                      >
                        <option value={data.customerType}>{data.customerType}</option>
                        {customertypedata.map((item) => (
                          <option value={item.customertype}>
                            {item.customertype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Size / Area In Sq Ft
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setsize(e.target.value)}
                        defaultValue={data.size}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Color</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcolor(e.target.value)}
                      >
                        <option value={data.color}>-select-</option>
                        <option value="red">RED</option>
                        <option value="orange">
                          ORANGE
                        </option>
                        <option value="green">
                          GREEN Company
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Instructions</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setinstructions(e.target.value)}
                        defaultValue={data.instructions}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Approach
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setapproach(e.target.value)}
                      >
                        <option>-select all-</option>
                        {referecetypedata.map((item) => (
                          <option value={item.referencetype}>
                            {item.referencetype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      {" "}
                      Service Executive
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setserviceexc(e.target.value)}
                      >
                       {data.serviceExecute?<option value={data.serviceExecute}>{data.serviceExecute}</option>:<option>-select-</option>} 
                        {userdata.map((item) => (
                          <option value={item.displayname}>
                            {item.displayname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={editcustomer}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-1">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customeredit;
