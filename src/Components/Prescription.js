import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Prescription() {
  const [prefix, setPrefix] = useState("Mr.");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("")
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [tests, setTests] = useState("");          // EDITABLE AREA #1 (left)
  const [notes, setNotes] = useState("");          // EDITABLE AREA #2 (right)

  return (
    <div className="container my-3 p-3 border" style={{ maxWidth: 980 }}>
      {/* Header */}
      <div className="pb-2 mb-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <img
            alt="logo-left"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Caduceus.svg"
            style={{ width: 40, height: 40 }}
          />
          <div className="text-center flex-grow-1">
            <h2 className="fw-bold text-danger mb-0 text-decoration-underline" style={{fontSize:'45px'}}>JEET CLINIC</h2>
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
            <div className="small">M : <strong>9211699737</strong></div>
          </div>
        </div>
      </div>

      {/* Patient info row (Mr/Mrs, Name, Age, Date) */}
      <div className="row g-2 align-items-end mb-2">
  {/* Title + Patient Name */}
  <div className="col-md-6 d-flex gap-2">
    <div className="text-start">
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

    <div className="col-md-10 text-start">
      <label className="form-label mb-1 small d-block">Patient Name</label>
      <input
        className="form-control form-control-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
    </div>
  </div>

  {/* Age */}
  <div className="col-md-2 text-start">
    <label className="form-label mb-1 small d-block">Age</label>
    <input
      className="form-control form-control-sm"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      placeholder="Years"
    />
  </div>

  {/* Blood Group */}
  <div className="col-md-2 text-start">
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
  <div className="col-md-2 text-start">
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
  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">B.P. :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter BP"
    />
  </div>

  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">Temp :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter Temp"
    />
  </div>

  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">B.S.R :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter BSR"
    />
  </div>

  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">SpO2 :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter SpO2"
    />
  </div>

  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">Pulse :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter Pulse"
    />
  </div>

  <div className="mb-2 d-flex align-items-center">
    <span className="me-2 fw-semibold">Weight :</span>
    <input
      type="text"
      className="flex-grow-1 border-0 border-bottom"
      placeholder="Enter Weight"
    />
  </div>

  <p className="text-danger fw-bold mt-3 mb-1">Test Advised</p>

  {/* EDITABLE AREA #1 */}
  <textarea
    className="form-control"
    rows={10}
    placeholder="Write advised tests here…"
    value={tests}
    onChange={(e) => setTests(e.target.value)}
  />
</div>


        {/* Right column */}
        <div className="col-8 ps-3" style={{ minHeight: 420 }}>
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
      <div className="text-center border-top mt-3 pt-2">
        <span className="badge bg-danger mb-3">24x7 Open Emergency</span>

        <div className="row text-start">
          <div className="col-md-6">
            <h6 className="fw-bold">First Clinic :-</h6>
            <p className="mb-1">474 Dabua Tyagi Market</p>
            <p className="mb-1">NIT Faridabad - 121001</p>
            <p className="mb-1 fw-semibold">Clinic Timing</p>
            <p className="mb-1">Morning 10:30 to 2.00 P.m.</p>
            <p className="mb-1">Evening 6.00 P.m. to 10.00 P.m.</p>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold">Second Clinic :-</h6>
            <p className="mb-1">719 New Janta Colony</p>
            <p className="mb-1">NIT Faridabad - 121001</p>
            <p className="mb-1 fw-semibold">Clinic Timing</p>
            <p className="mb-1">Morning 08:30 to 10.30 A.m.</p>
            <p className="mb-1">Evening 4.00 P.m. to 6.00 P.m.</p>
          </div>
        </div>

        <div className="mt-2">
          <small className="text-muted">[Map placeholder]</small>
        </div>
      </div>
    </div>
  );
}
