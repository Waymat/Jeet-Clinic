import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Prescription.css"; // custom CSS for A4 layout
import logo from "../Images/JeetClinic.png";
import map from "../Images/Map.png"

export default function Prescription() {
  const [prefix, setPrefix] = useState("Mr.");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [tests, setTests] = useState("");
  const [notes, setNotes] = useState("");

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="d-flex flex-column align-items-center">

      <div className="a4-sheet border">
        {/* Header */}
        <div className="pb-2 mb-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <img alt="logo-left" src={logo} style={{ width: 100, height: 100 }} />

            <div className="text-center flex-grow-1">
              <h2
                className="fw-bold text-danger mb-0 text-decoration-underline"
                style={{ fontSize: "45px" }}
              >
                JEET CLINIC
              </h2>
              <small className="d-block fw-bold">
                Not Valid for Medical Legal Case (Court &amp; Police)
              </small>
            </div>

            <div className="text-end">
              <img
                alt="logo-right"
                src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Caduceus.svg"
                style={{ width: 40, height: 40 }}
              />
              <div className="small">
                M : <strong>9211699737</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Patient info row */}
        <div className="row g-2 align-items-end mb-3 patient-info">
          {/* Title */}
          <div className="col-title text-start">
            <label className="form-label mb-1 small d-block">Title</label>
            <select
              className="form-select form-select-sm"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            >
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Master</option>
            </select>
          </div>

          {/* Patient Name */}
          <div className="col-name text-start">
            <label className="form-label mb-1 small d-block">Patient Name</label>
            <input
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>

          {/* Age */}
          <div className="col-age text-start">
            <label className="form-label mb-1 small d-block">Age</label>
            <input
              className="form-control form-control-sm"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Years"
            />
          </div>

          {/* Blood Group */}
          <div className="col-blood text-start">
            <label className="form-label mb-1 small d-block">Blood Group</label>
            <select
              className="form-select form-select-sm"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option>Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* Date */}
          <div className="col-date text-start">
            <label className="form-label mb-1 small d-block">Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>



        {/* Body */}
        <div className="row g-0">
          {/* Left column */}
          <div className="col-4 pe-3 border-end" style={{ minHeight: 420 }}>
            {[
              { label: "B.P.", placeholder: "Enter BP" },
              { label: "Temp", placeholder: "Enter Temp" },
              { label: "B.S.R", placeholder: "Enter BSR" },
              { label: "SpO2", placeholder: "Enter SpO2" },
              { label: "Pulse", placeholder: "Enter Pulse" },
              { label: "Weight", placeholder: "Enter Weight" },
            ].map((field, index) => (
              <div key={index} className="mb-2 d-flex align-items-center">
                <span className="fw-semibold" style={{ width: "70px" }}>
                  {field.label} :
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm border-0 border-bottom"
                  placeholder={field.placeholder}
                  style={{ maxWidth: "120px" }}
                />
              </div>
            ))}

            <p className="text-danger fw-bold mt-3 mb-1">Test Advised</p>

            {/* EDITABLE AREA #1 */}
            <textarea
              className="form-control"
              rows={6}
              placeholder="Write advised tests here…"
              value={tests}
              onChange={(e) => setTests(e.target.value)}
            />
          </div>


          {/* Right column */}
          <div className="col-8 ps-3" style={{ minHeight: 300 }}>
            {/* EDITABLE AREA #2 */}
            <textarea
              className="form-control"
              rows={16}
              placeholder="Prescription / Notes…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-top mt-3 pt-2 footer-section">
          <span className="badge bg-danger mb-3 fs-4">24x7 Open Emergency</span>

          <div className="row text-center text-danger align-items-start mt-4 gap-5">
            {/* First Clinic */}
            <div className="col-4 fw-bold">
              <h6 className="fw-bold">First Clinic :-</h6>
              <p className="mb-1">474 Dabua Tyagi Market</p>
              <p className="mb-1">NIT Faridabad - 121001</p>
              <br />
              <p className="mb-1">Clinic Timing</p>
              <p className="mb-1">Morning 10:30 to 2.00 P.m.</p>
              <p className="mb-1">Evening 6.00 P.m. to 10.00 P.m.</p>
            </div>

            {/* Second Clinic */}
            <div className="col-4 fw-bold">
              <h6 className="fw-bold">Second Clinic :-</h6>
              <p className="mb-1">719 New Janta Colony</p>
              <p className="mb-1">NIT Faridabad - 121001</p>
              <br />
              <p className="mb-1">Clinic Timing</p>
              <p className="mb-1">Morning 08:30 to 10.30 A.m.</p>
              <p className="mb-1">Evening 4.00 P.m. to 6.00 P.m.</p>
            </div>

            {/* Map Image */}
            <div className="col-4">
              <img
                src={map}
                alt="Clinic Location Map"
                // className="img-fluid rounded shadow"
                style={{ maxHeight: "250px" }}
              />
            </div>
          </div>
        </div>

      </div>
      {/* Print Button */}
      <button
        className="btn btn-danger my-3 d-print-none"
        onClick={handlePrint}
      >
        Print Prescription
      </button>
    </div>
  );
}
