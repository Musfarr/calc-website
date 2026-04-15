'use client';

import { useState } from 'react';
import Layout from '../components/Layout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = 'info@finalgradescalculator.com';
    const subject = encodeURIComponent(form.subject || 'Contact Form Inquiry');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <h1 className="mb-2">Contact Us</h1>
      <p className="text-muted mb-4">
        Have a question or suggestion? Fill out the form below and your email client will open with everything
        pre-filled. We typically respond within 24–48 hours.
      </p>

      <div className="calculator-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-semibold">
                Your Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="e.g. John Smith"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-semibold">
                Your Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="e.g. john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="subject" className="form-label fw-semibold">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                placeholder="e.g. Question about the Grade Calculator"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="message" className="form-label fw-semibold">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows={6}
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary px-4">
                Send Message
              </button>
            </div>
          </div>
        </form>

        <hr className="my-4" />

        <div className="d-flex align-items-start gap-2 mt-3">
          <div>
            <p className="mb-1 fw-semibold">Email us directly:</p>
            <a href="mailto:info@finalgradescalculator.com" className="text-decoration-none">
              info@finalgradescalculator.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
