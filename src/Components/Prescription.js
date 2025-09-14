import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Prescription.css"; // custom CSS for A4 layout
import logo from "../Images/JeetClinic.png";
import map from "../Images/map.png";
import { db, auth } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function Prescription() {
  // Patient info states
  const [prefix, setPrefix] = useState("Mr.");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [tests, setTests] = useState("");
  const [notes, setNotes] = useState("");
  const notesRef = useRef(null);

  // Suggestions states
  const [allNotes, setAllNotes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch previous prescriptions for suggestions
  const fetchSuggestions = async () => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "prescriptions"),
      where("uid", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    // Split notes by line and flatten into a single array of medicines
    const historyLines = snapshot.docs
      .map((doc) => doc.data().notes)
      .flatMap((note) => note.split('\n').map(line => line.trim()).filter(Boolean));
    setAllNotes(historyLines);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Handle notes input and filter suggestions
  const handleNotesChange = (e) => {
    const value = e.target.value;
    setNotes(value);
    // Get text after last newline (current medicine line)
    const currentLine = value.substring(value.lastIndexOf('\n') + 1);
    if (!currentLine) {
      setSuggestions([]);
      return;
    }
    const matches = allNotes.filter((line) =>
      line.toLowerCase().startsWith(currentLine.toLowerCase())
    );
    setSuggestions(matches.slice(0, 5));
  };

  const insertAtCursor = (text) => {
    const textarea = notesRef.current;
    if (!textarea) return;

    // Get current value and cursor position
    const value = notes;
    const cursorPos = textarea.selectionStart;

    // Find start of the current line
    const lastNewline = value.lastIndexOf('\n', cursorPos - 1);
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    // Find end of the current line (before any selection)
    const lineEnd = value.indexOf('\n', cursorPos);
    const actualEnd = lineEnd === -1 ? value.length : lineEnd;

    // Replace only the current line with suggestion
    const newValue =
      value.substring(0, lineStart) +
      text +
      value.substring(actualEnd);

    setNotes(newValue);

    // Place cursor right after inserted text
    setTimeout(() => {
      const newCursorPos = lineStart + text.length;
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  // Save prescription
  const handleSave = async () => {
    if (!auth.currentUser) return;

    await addDoc(collection(db, "prescriptions"), {
      uid: auth.currentUser.uid,
      tests,
      notes,
      date: new Date(),
    });
    alert("Prescription saved!");
    fetchSuggestions(); // refresh suggestions after saving
    handleNewPrescription();
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  const handleNewPrescription = () => {
  setPrefix("Mr.");
  setName("");
  setAge("");
  setBloodGroup("");
  setDate(new Date().toISOString().slice(0, 10));
  setTests("");
  setNotes("");
};


  return (
    <div className="d-flex flex-column align-items-center" >

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
            {[{ label: "B.P.", placeholder: "Enter BP" },
            { label: "Temp", placeholder: "Enter Temp" },
            { label: "B.S.R", placeholder: "Enter BSR" },
            { label: "SpO2", placeholder: "Enter SpO2" },
            { label: "Pulse", placeholder: "Enter Pulse" },
            { label: "Weight", placeholder: "Enter Weight" }].map((field, index) => (
              <div key={index} className="mb-2 d-flex align-items-center">
                <span className="fw-semibold" style={{ width: "70px" }}>{field.label} :</span>
                <input
                  type="text"
                  className="form-control form-control-sm border-0 border-bottom"
                  placeholder={field.placeholder}
                  style={{ maxWidth: "120px", color:"black" }}
                />
              </div>
            ))}

            <p className="text-danger fw-bold mt-3 mb-1">Test Advised</p>

            {/* Tests textarea */}
            <textarea
              className="form-control"
              rows={9}
              placeholder="Write advised tests here…"
              value={tests}
              onChange={(e) => setTests(e.target.value)}
              style={{color: "black"}}
            />
          </div>

          {/* Right column */}
          <div className="col-8 ps-3" style={{ minHeight: 300 }}>
            {/* Prescription / Notes textarea */}
            <div className="textarea-container textarea-wrapper" style={{ position: 'relative', width: '100%' }}>
              <textarea
  ref={notesRef}
  name="notes"
  className="form-control"
  rows={20}
  value={notes.startsWith("Rx\n") ? notes : "Rx\n" + notes}
  onChange={(e) => {
    let val = e.target.value;
    // Always enforce Rx at the start
    if (!val.startsWith("Rx\n")) {
      val = "Rx\n" + val.replace(/^Rx\s*/, "");
    }
    handleNotesChange({ target: { value: val } });
  }}
  style={{ height: "100%", color: "black" }}
/>

              {/* Suggestions dropdown will go here */}
            </div>

            {/* Suggestions */}
            {suggestions.length === 1 ? (
  <div
    className="border bg-white p-2"
    style={{
      width:"200px",
      position: 'absolute',
      left: '70%',
      right: '30%',
      top: '90%',
      zIndex: 1000,
      cursor: "pointer"
    }}
    onClick={() => {
      insertAtCursor(suggestions[0]);
      setSuggestions([]);
    }}
  >
    {suggestions[0]}
  </div>
) : suggestions.length > 1 && (
  <select
    className="form-select"
    size={Math.min(5, suggestions.length)}
    style={{
      width:"200px",
      position: 'absolute',
      left: '70%',
      right: '30%',
      top: '90%',
      zIndex: 1000
    }}
    onChange={e => {
      insertAtCursor(e.target.value);
      setSuggestions([]);
    }}
  >
    {suggestions.map((s, i) => (
      <option key={i} value={s}>
        {s}
      </option>
    ))}
  </select>
)}



          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-top footer-section">
          <span className="badge bg-danger mb-3 fs-4">24x7 Open Emergency</span>
          <div className="row text-center text-danger align-items-center gap-4 ">
            {/* First Clinic */}
            <div className="col-4 text-center fw-bold text-start">
              <h6 className="fw-bold">First Clinic :-</h6>
              <p className="mb-1">474 Dabua Tyagi Market</p>
              <p className="mb-1">NIT Faridabad - 121001</p>
              <br/>
              <p className="mb-1">Clinic Timing</p>
              <p className="mb-1" style={{ whiteSpace: "nowrap" }}>
                Morning 10:30 to 2.00 P.m.
              </p>
              <p className="mb-1" style={{ whiteSpace: "nowrap" }}>
                Evening 6.00 P.m. to 10.00 P.m.
              </p>
            </div>

            {/* Second Clinic */}
            <div className="col-4 text-center fw-bold text-start">
              <h6 className="fw-bold">Second Clinic :-</h6>
              <p className="mb-1">719 New Janta Colony</p>
              <p className="mb-1">NIT Faridabad - 121001</p>
              <br/>
              <p className="mb-1">Clinic Timing</p>
              <p className="mb-1" style={{ whiteSpace: "nowrap" }}>
                Morning 08:30 to 10.30 A.m.
              </p>
              <p className="mb-1" style={{ whiteSpace: "nowrap" }}>
                Evening 4.00 P.m. to 6.00 P.m.
              </p>
            </div>

            {/* Map Image */}
            <div className="col-3 d-flex justify-content-center">
              <img
                src={map}
                alt="Clinic Location Map"
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <button
        className="btn btn-danger my-3 d-print-none"
        onClick={()=>{handlePrint()
          handleSave()
        }}
      >
        Print Prescription
      </button>

      {/* <button
        className="btn btn-success my-3 d-print-none"
        onClick={handleSave}
      >
        Save & New Prescription
      </button> */}
    </div>
  );
}
