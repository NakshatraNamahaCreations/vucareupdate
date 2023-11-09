import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Customernav from "../Customernav";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";

function Customersearch() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate=useNavigate();
  const [customername, setcustomername] = useState("");
  const [maincontact, setmaincontact] = useState("");
  const [city, setcity] = useState("");
  const [customertype, setcustomertype] = useState("");
  const [citydata, setcitydata] = useState([]);
  const [customerdata, setcustomerdata] = useState([]);
  const [results, setfilterdata] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getcity();
    getcustomer();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };
  const getcustomer = async () => {
    let res = await axios.get(apiURL + "/getcustomer");
    if (res.status === 200) {
      setcustomerdata(res.data?.customers);
      console.log("customerdata===>", res.data.customers);
    }
  };

  const filterData = () => {
    if (!customername && !city && !customertype && !maincontact) {
      // No search criteria entered, show a message or perform any desired action
      setHasResults(false);
      return;
    }

    const result = customerdata.filter((item) => {
      const itemCustomerName = item.customerName
        ? item.customerName.toLowerCase()
        : "";
      const itemCity = item.city ? item.city.toLowerCase() : "";
      const itemCustomerType = item.customerType
        ? item.customerType.toLowerCase()
        : "";
      const itemMainContact = item.mainContact
        ? item.mainContact.toString()
        : "";

      const filterCustomerName = customername ? customername.toLowerCase() : "";
      const filterCity = city ? city.toLowerCase() : "";
      const filterCustomerType = customertype ? customertype.toLowerCase() : "";
      const filterMainContact = maincontact ? maincontact.toString() : "";
      const matchMainContact = itemMainContact.includes(filterMainContact);
      return (
        itemCustomerName.includes(filterCustomerName) &&
        itemCity.includes(filterCity) &&
        itemCustomerType.includes(filterCustomerType) &&
        matchMainContact
        // itemMainContact.includes(filterMainContact)
      );
    });
    setfilterdata(result);
    setHasResults(result.length > 0);
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchClicked(true);
    filterData();
  };

  const columns = [
    {
      name: "Sl  No",
      cell: (row, i) => <div>{i + 1}</div>,
    },
    {
      name: "Card No",
      selector: (row) => row.cardNo,
    },
    {
      name: "Customer name",
      selector: (row) => row.customerName,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactPerson,
    },
    {
      name: "Contact",
      selector: (row) => row.mainContact,
    },
    {
      name: "Address",
      cell: (row) => (
        <div>
          <p>{row.rbhf}{row.cnap}{row.lnf}</p>
        </div>
      )
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mainContact,
    },
    {
      name: "Customer type",
      selector: (row) => row.customerType,
    },
    // {
    //   name: "Action",
    //   cell:(row)=>(
    //     <div>
    //       <Link to="/customeredit" state={{data:row}} >Edit</Link>
    //     </div>
    //   )
    // },
  ];

  

  const handleRowClick = (row) => {
    navigate(`/customersearchdetails/${row.cardNo}`);
  };
  
  return (
    <div className="web">
      <Header />
      <Customernav  />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card mt-4">
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="vhs-sub-heading">Customer Search :</div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Customer Name </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label"> Mobile Number</div>
                    <div className="group pt-1">
                      <input
                        // type="tel"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaincontact(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">City</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option value="">-select-</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Customer type</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomertype(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="text-center pt-2"
                  style={{ color: "#848181", fontSize: "14px" }}
                >
                  Input Atleast 1 Filter For Quick Search
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={handleSearchClick}>
                      Search
                    </button>
                  </div>
                  <div className="col-md-1">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-1 border">
            {searchClicked && !hasResults && (
              <p style={{ textAlign: "center", marginTop: "18px" }}>
                {" "}
                No matching results found.
              </p>
            )}
            {searchClicked && hasResults && (
              <DataTable
                columns={columns}
                data={results}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
                onRowClicked={handleRowClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customersearch;
