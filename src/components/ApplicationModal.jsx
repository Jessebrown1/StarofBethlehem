import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import "./ApplicationModal.css";

// Paste the deployed Google Apps Script Web App URL here once the Google
// Sheet backend is set up — see GOOGLE_SHEETS_SETUP.md at the project root
// for the full step-by-step guide (create sheet, deploy script, get URL).
const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

const initialFormState = {
  studentName: "",
  dateOfBirth: "",
  gender: "",
  classApplyingFor: "",
  previousSchool: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianAddress: "",
  message: "",
};

const CLASS_OPTIONS = [
  "Creche / Nursery",
  "Kindergarten 1",
  "Kindergarten 2",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JHS 1",
  "JHS 2",
  "JHS 3",
  "SHS 1",
  "SHS 2",
  "SHS 3",
];

function validate(values) {
  const errors = {};
  if (!values.studentName.trim()) errors.studentName = "Student name is required.";
  if (!values.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
  if (!values.gender) errors.gender = "Please select a gender.";
  if (!values.classApplyingFor) errors.classApplyingFor = "Please select a class.";
  if (!values.guardianName.trim()) errors.guardianName = "Guardian name is required.";
  if (!values.guardianPhone.trim()) {
    errors.guardianPhone = "Phone number is required.";
  } else if (!/^[+0-9\s()-]{7,20}$/.test(values.guardianPhone.trim())) {
    errors.guardianPhone = "Enter a valid phone number.";
  }
  if (!values.guardianEmail.trim()) {
    errors.guardianEmail = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.guardianEmail.trim())) {
    errors.guardianEmail = "Enter a valid email address.";
  }
  if (!values.guardianAddress.trim()) errors.guardianAddress = "Address is required.";
  return errors;
}

export default function ApplicationModal({ isOpen, onClose }) {
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(modalRef.current, { opacity: 1, scale: 1, y: 0 });
        return;
      }
      gsap.set(modalRef.current, { scale: 0.96, y: 24, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.35 }).to(
        modalRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.5 },
        "-=0.15"
      );
    });

    document.body.classList.add("no-scroll");
    firstFieldRef.current?.focus();

    return () => {
      ctx.revert();
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeAnimated();
      } else if (e.key === "Tab") {
        trapFocus(e);
      }
    }

    function trapFocus(e) {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function closeAnimated() {
    const reduced = prefersReducedMotion();
    if (reduced || !modalRef.current || !overlayRef.current) {
      onClose();
      return;
    }
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: onClose,
    });
    tl.to(modalRef.current, { opacity: 0, scale: 0.97, y: 16, duration: 0.3 }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.25 },
      "-=0.2"
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      if (GOOGLE_APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL") {
        // No backend connected yet — simulate a network round trip so the
        // UI/UX (loading + success states) can be demonstrated end to end.
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } else {
        // Apps Script Web Apps don't support CORS preflight, so this must
        // be a "simple request": mode "no-cors" and a safelisted
        // Content-Type. Apps Script reads the raw body via
        // e.postData.contents regardless of the header, so the JSON
        // payload still parses correctly on the other end (see
        // google-apps-script/Code.gs). The response is opaque under
        // no-cors, so success can't be confirmed from the response itself —
        // if fetch doesn't throw, the request was delivered.
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(values),
        });
      }
      setStatus("success");
      setValues(initialFormState);
    } catch {
      setStatus("error");
    }
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) closeAnimated();
  }

  if (!isOpen) return null;

  return (
    <div
      className="app-modal-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
    >
      <div
        className="app-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
      >
        <button type="button" className="app-modal-close" onClick={closeAnimated} aria-label="Close application form">
          &times;
        </button>

        {status === "success" ? (
          <div className="app-modal-success" role="status">
            <span className="app-modal-success-icon" aria-hidden="true">
              ✓
            </span>
            <h2>Thank You</h2>
            <p>Application submitted successfully. We will contact you shortly.</p>
            <button type="button" className="btn btn-primary" onClick={closeAnimated}>
              Close
            </button>
          </div>
        ) : (
          <>
            <header className="app-modal-header">
              <span className="eyebrow">Admissions</span>
              <h2 id="application-modal-title">Application Form</h2>
              <p>Please complete the form below. Fields marked * are required.</p>
            </header>

            <form className="app-modal-form" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Student Information</legend>

                <div className="field">
                  <label htmlFor="studentName">Student Full Name *</label>
                  <input
                    ref={firstFieldRef}
                    id="studentName"
                    name="studentName"
                    type="text"
                    value={values.studentName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.studentName)}
                    aria-describedby={errors.studentName ? "studentName-error" : undefined}
                  />
                  {errors.studentName && (
                    <span className="field-error" id="studentName-error">
                      {errors.studentName}
                    </span>
                  )}
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.dateOfBirth)}
                      aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
                    />
                    {errors.dateOfBirth && (
                      <span className="field-error" id="dateOfBirth-error">
                        {errors.dateOfBirth}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.gender)}
                      aria-describedby={errors.gender ? "gender-error" : undefined}
                    >
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                    {errors.gender && (
                      <span className="field-error" id="gender-error">
                        {errors.gender}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="classApplyingFor">Class Applying For *</label>
                    <select
                      id="classApplyingFor"
                      name="classApplyingFor"
                      value={values.classApplyingFor}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.classApplyingFor)}
                      aria-describedby={errors.classApplyingFor ? "classApplyingFor-error" : undefined}
                    >
                      <option value="">Select a class</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.classApplyingFor && (
                      <span className="field-error" id="classApplyingFor-error">
                        {errors.classApplyingFor}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="previousSchool">Previous School</label>
                    <input
                      id="previousSchool"
                      name="previousSchool"
                      type="text"
                      value={values.previousSchool}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Parent / Guardian</legend>

                <div className="field">
                  <label htmlFor="guardianName">Parent/Guardian Name *</label>
                  <input
                    id="guardianName"
                    name="guardianName"
                    type="text"
                    value={values.guardianName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.guardianName)}
                    aria-describedby={errors.guardianName ? "guardianName-error" : undefined}
                  />
                  {errors.guardianName && (
                    <span className="field-error" id="guardianName-error">
                      {errors.guardianName}
                    </span>
                  )}
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="guardianPhone">Phone *</label>
                    <input
                      id="guardianPhone"
                      name="guardianPhone"
                      type="tel"
                      value={values.guardianPhone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.guardianPhone)}
                      aria-describedby={errors.guardianPhone ? "guardianPhone-error" : undefined}
                    />
                    {errors.guardianPhone && (
                      <span className="field-error" id="guardianPhone-error">
                        {errors.guardianPhone}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="guardianEmail">Email *</label>
                    <input
                      id="guardianEmail"
                      name="guardianEmail"
                      type="email"
                      value={values.guardianEmail}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.guardianEmail)}
                      aria-describedby={errors.guardianEmail ? "guardianEmail-error" : undefined}
                    />
                    {errors.guardianEmail && (
                      <span className="field-error" id="guardianEmail-error">
                        {errors.guardianEmail}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="guardianAddress">Address *</label>
                  <input
                    id="guardianAddress"
                    name="guardianAddress"
                    type="text"
                    value={values.guardianAddress}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.guardianAddress)}
                    aria-describedby={errors.guardianAddress ? "guardianAddress-error" : undefined}
                  />
                  {errors.guardianAddress && (
                    <span className="field-error" id="guardianAddress-error">
                      {errors.guardianAddress}
                    </span>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend>Additional Information</legend>
                <div className="field">
                  <label htmlFor="message">Message / Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={values.message}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              {status === "error" && (
                <p className="app-modal-status-error" role="alert">
                  Something went wrong submitting your application. Please try again.
                </p>
              )}

              <button type="submit" className="btn btn-primary app-modal-submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
