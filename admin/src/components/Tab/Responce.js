import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DataTable from "react-data-table-component";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function Responce() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(0);
  const [response, setresponse] = useState("");
  const [variable, setvariable] = useState("");
  const [template, setwhatsptemplate] = useState("");
  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [response1, setresponse1] = useState(data.response);
  const [variable1, setvariable1] = useState("");
  const [template1, settemplate1] = useState("");

  const [filterdata, setfilterdata] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const [show1, setShow1] = useState(false);

  const handleShow1 = () => setShow1(true);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
    handleShow();
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/addresponse",
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          response: response,
          template: template,
          variable: variable,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          window.location.assign("/responce");
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };
  useEffect(() => {
    getresponse();
  }, []);

  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if ((res.status = 200)) {
      console.log(res.data.response);
      setdata(res.data?.response);
      setfilterdata(res.data?.response);
    }
  };

  let i = 0;

  const editresponse = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editresponse/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          response: response1,
          template: template1,
          variable: variable1,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Response",
      selector: (row) => row.response,
    },
    // {
    //   name: "WhatsApp template",
    //   selector: (row) => row.template,
    // },
    // {
    //   name: "Variable",
    //   selector: (row) => row.variable,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteresponse(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];


  const edit = (data) => {
    setdata(data);
    handleShow1(true);
  };
  useEffect(() => {
    const result = data.filter((item) => {
      return item.response.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteresponse = async (id) => {
    axios({
      method: "post",
      url: apiURL+"/deleteresponse/" + id,
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
  return (
    <div>
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end pt-3">
            <button className="btn-primary-button mx-2" onClick={handleShow}>
              Response Add
            </button>

            <button className="btn-secondary-button">Response view</button>
          </div>
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
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Responce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Response <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setresponse(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4">
                    <div className="vhs-input-label">WhatsApp Template</div>
                    <div className="group pt-1">
                      <textarea
                        rows={6}
                        cols={6}
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setwhatsptemplate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">VARIABLES</div>
                    <div className="group pt-1">
                      <p>Customer_name</p>
                      <p>Executive_name</p>
                      <p>Executive_contact</p>
                    </div>
                  </div> */}
                </div>

                <div className="row pt-3">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={save}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Responce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Response <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        placeholder={data.response}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setresponse1(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4">
                    <div className="vhs-input-label">WhatsApp Template</div>
                    <div className="group pt-1">
                      <textarea
                        rows={6}
                        cols={6}
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setwhatsptemplate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">VARIABLES</div>
                    <div className="group pt-1">
                      <p>Customer_name</p>
                      <p>Executive_name</p>
                      <p>Executive_contact</p>
                    </div>
                  </div> */}
                </div>

                <div className="row pt-3">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={editresponse}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Responce;
