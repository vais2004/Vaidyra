import React, { useState } from "react";
import { contactPageStyles as s } from "../assets/dummyStyles";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  SendHorizonal,
  Stethoscope,
  User,
} from "lucide-react";

const ContactPage = () => {
  const initial = {
    name: "",
    email: "",
    phone: "",
    department: "",
    service: "",
    message: "",
  };

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const departments = [
    "General Physician",
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
  ];

  const servicesMapping = {
    "General Physician": [
      "General Consultation",
      "Adult Checkup",
      "Vaccination",
      "Health Screening",
    ],
    Cardiology: [
      "ECG",
      "Echocardiography",
      "Stress Test",
      "Heart Consultation",
    ],
    Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
    Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
    Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
    Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
  };

  const genericServices = [
    "General Consultation",
    "ECG",
    "Blood Test",
    "X-Ray",
    "Ultrasound",
    "Physiotherapy",
    "Vaccination",
  ];

  //this function validates that all fields are filled
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      e.phone = "Phone number must be exactly 10 digits";

    if (!form.department && !form.service) {
      e.department = "Please choose a department or service";
      e.service = "Please choose a department or service";
    }

    if (!form.message.trim()) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "department") {
      setForm((prev) => ({ ...prev, department: value, service: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "department" || name === "service") {
      setErrors((prev) => {
        const copy = { ...prev };
        if (
          (name === "department" && value) ||
          (name === "service" && value) ||
          form.department ||
          form.service
        ) {
          delete copy.department;
          delete copy.service;
        }
        return copy;
      });
    }
  }

  //to submit data to whatsApp
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const text = `*Contact Request*\nName: ${form.name}\nEmail: ${
      form.email
    }\nPhone: ${form.phone}\nDepartment: ${
      form.department || "N/A"
    }\nService: ${form.service || "N/A"}\nMessage: ${form.message}`;

    const url = `https://wa.me/8767843011?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setForm(initial); //reset
    setErrors({});
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  //showa the department specific services for screens
  const availableServices = form.department
    ? servicesMapping[form.department] || []
    : genericServices;

  return (
    <div className={s.pageContainer}>
      <div className={s.bgAccent1}></div>
      <div className={s.bgAccent2}></div>

      <div className={s.gridContainer}>
        <div className={s.formContainer}>
          <h2 className={s.formTitle}>Contact Our Clinic</h2>
          <p className={s.formSubtitle}>
            Fill the form - we'll open WhatsApp so you can connect with us
            instantly.
          </p>
          <form onSubmit={handleSubmit} className={s.formSpace}>
            <div className={s.formGrid}>
              <div>
                <label className={s.label}>
                  <User size={16} /> Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={s.input}
                />
                {errors.name && <p className={s.error}>{errors.name}</p>}
              </div>

              <div>
                <label className={s.label}>
                  <Mail size={16} /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={s.input}
                />
                {errors.email && <p className={s.error}>{errors.email}</p>}
              </div>
            </div>

            <div className={s.formGrid}>
              <div>
                <label className={s.label}>
                  <Phone size={16} /> Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={s.input}
                  maxLength="10"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className={s.error}>{errors.phone}</p>}
              </div>

              <div>
                <label className={s.label}>
                  <MapPin size={16} /> Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={s.input}>
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className={s.error}>{errors.department}</p>
                )}
              </div>
            </div>

            <div>
              <label className={s.label}>
                <Stethoscope size={16} /> Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={s.input}>
                <option value="">
                  Select Service (or choose Department above)
                </option>
                {availableServices.map((sel) => (
                  <option key={sel} value={sel}>
                    {sel}
                  </option>
                ))}
              </select>
              {errors.service && <p className={s.error}>{errors.service}</p>}
            </div>
            <div>
              <label className={s.label}>
                <MessageSquare size={16} />
                Message
              </label>
              <textarea
                className={s.textarea}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your concern briefly..."
                rows={4}
              />
              {errors.message && <p className={s.error}>{errors.message}</p>}
            </div>

            <div className={s.buttonContainer}>
              <button type="submit" className={s.button}>
                <SendHorizonal size={18} /> <span>Send via whatsapp</span>
              </button>
              {sent && (
                <p className={s.sentMessage}>
                  Opening WhatsApp and clearing form...
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
