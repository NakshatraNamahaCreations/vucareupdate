import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

function Subcategory() {
  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [search, setsearch] = useState("");

  const [subcategoryImg, setsubcategoryImg] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [subcatvideo, setsubcatvideo] = useState("");
  const [titledata, settitledata] = useState([]);
  const [editCategory, setEditCategory] = useState("");
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editSubcategoryImage, setEditSubcategoryImage] = useState("");
  const [editSubcategoryVideo, setEditSubcategoryVideo] = useState("");
  const [edithomePagetitle, setedithomePagetitle] = useState("");

  const [editSubcategoryData, setEditSubcategoryData] = useState({});
  const [homePagetitle, sethomePagetitle] = useState("");

  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subcategory) => {
    setEditSubcategoryData(subcategory);
    handleShow(true);
  };

  useEffect(() => {
    getcategory();
    getsubcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("http://localhost:8008/api/getcategory");
    if ((res.status = 200)) {
      setdata1(res.data?.category);
      console.log(res.data?.category);
    }
  };
  const postsubcategory = async (e) => {
    e.preventDefault();

    if (!category || !subcategory || !subcategoryImg) {
      alert("Please Select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("subcategory", subcategory);
      formdata.append("subcatimg", subcategoryImg);
      formdata.append("subcatvideo", subcatvideo);
      formdata.append("homePagetitle", homePagetitle);

      console.log("formdata", formdata);
      try {
        const config = {
          url: "/userapp/addappsubcat",
          method: "post",
          baseURL: "http://localhost:8008/api",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.reload();
          }
        });
      } catch (error) {
        if (error.response) {
          // Server responded with a status code outside of the 2xx range
          alert(error.response.data.error);
          console.log("Error response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          alert("Network error. Please try again later.");
          console.log("Error response data:", error.response.data);
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("An unexpected error occurred. Please try again later.");
          console.log("Error:", error.message);
        }
      }
    }
  };

  const onupdate = () => {
    getsubcategory();
  };

  const getsubcategory = async () => {
    let res = await axios.get("http://localhost:8008/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      console.log(res);
      setsubcategorydata(res.data?.subcategory);
      setfilterdata(res.data?.subcategory);
    }
  };

  const editservices = async (e) => {
    e.preventDefault();
    try {
      formdata.append("category", editCategory);
      formdata.append("subcategory", editSubcategory);
      formdata.append("homePagetitle", edithomePagetitle);

      if (editSubcategoryImage) {
        formdata.append("subcatimg", editSubcategoryImage);
      }
      if (editSubcategoryVideo) {
        formdata.append("subcatvideo", editSubcategoryVideo);
      }

      const config = {
        url: `/userapp/editappsubcat/${editSubcategoryData._id}`,
        method: "post",
        baseURL: "http://localhost:8008/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
          // onupdate();
          // handleClose();
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category ",
      selector: (row) => row.category,
    },
    {
      name: "Subcategory  ",
      selector: (row) => row.subcategory,
    },
    // {
    //   name: "Home Page Title  ",
    //   selector: (row) => row.homePagetitle,
    // },
    {
      name: "Subcategory image",
      cell: (row) => (
        <div>
          <img
            className="header_logo"
            src={`http://localhost:8008/subcat/${row.subcatimg}`}
            width={"50px"}
            height={"50px"}
          />
        </div>
      ),
    },
    {
      name: "Subcategory video",
      cell: (row) => (
        <div>
          <video width="150" height="150" controls>
            <source
              src={`http://localhost:8008/subcat/${row.subcatvideo}`}
              type="video/mp4"
            />
          </video>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a
            className="hyperlink"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          >
            Edit |
          </a>
          <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = subcategorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteservices = async (id) => {
    axios({
      method: "post",
      url: "http://localhost:8008/api/userapp/deleteappsubcat/" + id,
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

  useEffect(() => {
    gettitle();
  }, []);

  const gettitle = async () => {
    let res = await axios.get("http://localhost:8008/api/userapp/gettitle");
    if ((res.status = 200)) {
      settitledata(res.data?.homepagetitle);
    }
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Subcategory</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                {/* <div className=" vhs-sub-heading pb-2">Add New Record</div> */}
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className=" vhs-input-label">
                        Category <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12  vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {data1.map((i) => (
                            <option value={i.category}>{i.category}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vhs-input-label">
                        Subcategory <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className=" vhs-input-value col-md-12"
                          onChange={(e) => setsubcategory(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vhs-input-label">Subcategory Image</div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          className="col-md-12  vhs-input-value"
                          onChange={(e) => setsubcategoryImg(e.target.files[0])}
                        />
                        <p style={{ fontSize: "12px" }}>
                          <b>Width:50px, Height:50px </b>
                        </p>
                        <p style={{ fontSize: "12px" }}>
                          <b>format(jpg,png)</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-4">
                      <div className=" vhs-input-label">Subcategory Video</div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          accept="video/*"
                          className="col-md-12  vhs-input-value"
                          onChange={(e) => setsubcatvideo(e.target.files[0])}
                        />
                      </div>
                      <p className="mt-2">
                        {" "}
                        <b>
                          Note:Width= 400px ,Height:200px and mp4 format
                        </b>{" "}
                      </p>
                    </div>
                    {/* <div className="col-md-4 mt-4">
                      <div className=" vhs-input-label">Home page title</div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12  vhs-input-value"
                          onChange={(e) => sethomePagetitle(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {titledata.map((i) => (
                            <option value={i.title}>{i.title}</option>
                          ))}
                        </select>
                      </div>
                    </div> */}
                  </div>
                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className=" vhs-button vucare_btn" onClick={postsubcategory}>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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

        {/* edit subcategory */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className=" vhs-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <div className="group pt-1">
                      <select
                        className="col-md-12  vhs-input-value"
                        onChange={(e) => setEditCategory(e.target.value)}
                        defaultValue={data1.id}
                      >
                        {data1.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className=" vhs-input-label">
                    Subcategory name <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12  vhs-input-value"
                      onChange={(e) => setEditSubcategory(e.target.value)}
                      // placeholder={data.subcategory}
                      defaultValue={
                        editSubcategory || editSubcategoryData
                          ? editSubcategoryData.subcategory
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12 m-4">
                  <div className=" vhs-input-label">
                    Subcategory image <span className="text-danger">*</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="file"
                      className="col-md-12  vhs-input-value"
                      onChange={(e) =>
                        setEditSubcategoryImage(e.target.files[0])
                      }
                    />
                     <p style={{ fontSize: "12px" }}>
                          <b>format(jpg,png)</b>
                        </p>
                  </div>
                </div>

                <div className="col-md-12 m-4">
                  <div className=" vhs-input-label">
                    Subcategory Video <span className="text-danger"> *</span>
                  </div>

                  <input
                    type="file"
                    accept="video/*"
                    className="col-md-12  vhs-input-value"
                    onChange={(e) => setEditSubcategoryVideo(e.target.files[0])}
                  />
                </div>
                {/* <div className="col-md-12 mt-4">
                  <div className=" vhs-input-label">Home page title</div>
                  <div className="group pt-12">
                    <select
                      className="col-md-12  vhs-input-value"
                      onChange={(e) => setedithomePagetitle(e.target.value)}
                      defaultValue={editSubcategoryData?.homePagetitle}
                    >
                      <option>---SELECT---</option>
                      {titledata.map((i) => (
                        <option value={i.title}>{i.title}</option>
                      ))}
                    </select>
                  </div>
                </div> */}

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className=" vhs-button vucare_btn" onClick={editservices}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Subcategory;
