import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Nav1 from "./Nav1";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function User() {
  const [selected, setSelected] = useState(0);
  const [displayname, setdisplayname] = useState("");
  const [contactno, setcontactno] = useState("");
  const [nameOrEmail, setNameOrEmail] = useState("");

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState({});
  const [changedisplayname, setChangeDisplayName] = useState("");
  const [changecontactno, setChangeContactNo] = useState("");
  const [changenameoremail, setChangeNameOrEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmpassword, setNewConfirmPassword] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(userdata);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  // add new user========
  const AddNewUser = async (e) => {
    e.preventDefault();
    if (!displayname || !contactno || !nameOrEmail || !password || !cpassword) {
      alert("Enter all fields");
    }
    if (password !== cpassword) {
      alert("Password doestn't matched");
    } else {
      try {
        const config = {
          url: "/master/adduser",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            displayname: displayname,
            contactno: contactno,
            loginnameOrEmail: nameOrEmail,
            password: password,
            confirmPassword: cpassword,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert("Account Created");
            window.location.assign("/user");
          }
        });
      } catch (error) {
        console.error(error);
        alert("Not Added");
      }
    }
  };

  // get user=============
  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    let res = await axios.get(apiURL + "/master/getuser");
    if ((res.status = 200)) {
      console.log(res.data.masteruser);
      setuserdata(res.data?.masteruser);
      setfilterdata(res.data?.masteruser);
    }
  };

  // update user===============
  const edituser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/edituser/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          userid: data._id,
          contactno: changecontactno,
          displayname: changedisplayname,
          loginnameOrEmail: changenameoremail,
          password: oldPassword,
          // cpassword: cpassword,
          // newpassword: newPassword,
          // newcpassword: newConfirmpassword,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully updates");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // delete user =================
  const deleteuser = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteuser/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  // chnage password
  const changepassword = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/changepassword/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newConfirmPassword: newConfirmpassword,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Password Updated Successfully");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Can't able to update the password");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Display Name",
      selector: (row) => row.displayname,
    },
    {
      name: "Contact no",
      selector: (row) => row.contactno,
    },
    {
      name: "Name/Email",
      selector: (row) => row.loginnameOrEmail,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <span
            className="hyperlink"
            onClick={() => edit(row)}
            style={{ cursor: "pointer" }}
          >
            <i
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>
          <Link to="/userrights" state={{ data: row }}>
            <i
              class="fa-solid fa-circle-check"
              title="Rights"
              style={{ color: "blue" }}
            ></i>{" "}
            |{" "}
          </Link>
          <a onClick={() => deleteuser(row._id)} className="hyperlink mx-1">
            <i
              class="fa-solid fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];
  const edit = (data) => {
    setdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = userdata.filter((item) => {
      return item.displayname.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  return (
    <div>
      <Header />
      <Nav1 />
      <div className="row m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end pt-3">
            <button
              className="btn-primary-button mx-2"
              style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              User Add
            </button>

            <button
              style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-secondary-button"
            >
              User View
            </button>
          </div>
          {/* default it will show user data in table view ======================================== */}
          {selected == 0 ? (
            <>
              {" "}
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Search here.."
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
              <div className="mt-1 border">
                <DataTable
                  columns={columns}
                  data={filterdata}
                  pagination
                  fixedHeader
                  selectableRowsHighlight
                  subHeaderAlign="left"
                  highlightOnHover
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              {/* user add card will visible when click User Add button ================================== */}
              <div className="card" style={{ marginTop: "60px" }}>
                <div className="card-body p-4">
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">Display Name</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setdisplayname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">Contact No</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcontactno(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Name/Email
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setNameOrEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-2">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Password
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="password"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setpassword(e.target.value)}
                            // min="4"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Confirm Password{" "}
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="password"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcpassword(e.target.value)}
                            // min="4"
                          />
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-1">
                        <button className="vhs-button" onClick={AddNewUser}>
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
            </>
          )}
        </div>
      </div>
      {/* model for edit user data and update password ============================================*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="dynamic"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-3">
            {/* this form for change user name ================================== */}
            <form>
              <div className="card">
                <div className="card-body p-2">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="vhs-input-label">Display Name</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setChangeDisplayName(e.target.value)}
                          // placeholder={data.displayname}
                          defaultValue={data?.displayname}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="vhs-input-label">Contact No</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={data?.contactno}
                          onChange={(e) => setChangeContactNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Name/Email
                        <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={data?.loginnameOrEmail}
                          onChange={(e) => setChangeNameOrEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-1 ">
                      <button className="vhs-button" onClick={edituser}>
                        Save
                      </button>
                    </div>
                    <div className="col-md-1 mx-3">
                      <button className="vhs-button mx-3">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-5">
                <div className="card-body p-2">
                  {/* this form for change password====================== */}
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Name/Email
                          <span className="text-danger"></span>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {data?.loginnameOrEmail}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Old Password
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Password
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Confirm Password
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) =>
                              setNewConfirmPassword(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-1">
                        <button className="vhs-button" onClick={changepassword}>
                          Save
                        </button>
                      </div>
                      <div className="col-md-1 mx-3">
                        <button className="vhs-button mx-3">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;