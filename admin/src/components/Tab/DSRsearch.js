import React from "react";
import Header from "../layout/Header";
import DSRnav from "../DSRnav";

function DSRsearch() {
  return (
    <div className="web">
      <Header />
      <DSRnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="vhs-sub-heading pb-2">DSR Search :</div>
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Date Range</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Technician Wise</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Service Wise</div>
                    <div className="group pt-1">
                      <select className="col-md-12 vhs-input-value">
                        <option>--select--</option>
                        <option>company</option>
                        <option>construction company</option>
                        <option>Builder</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-4 justify-content-center">
                  <div className="col-md-1">
                    <button className="vhs-button">Save</button>
                  </div>
                  <div className="col-md-1">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                  <div className="col-md-1">
                    <button className="vhs-button mx-5">Print</button>
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

export default DSRsearch;
