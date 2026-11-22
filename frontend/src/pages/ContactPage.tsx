import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    societyName: '',
    category: 'GRIEVANCE',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Citizen Redressal & RWA Onboarding
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact EcoSetu</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Reach out for RWA onboarding, missed collection grievances, or recycler accreditation inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Municipal Liaison Office</h3>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>MCD Sanitation Control Center, Mayur Vihar Ward 42, East Delhi - 110091</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Toll-Free Helpline: 1800-SWACHH-SETU</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>support@ecosetu.in</span>
              </div>
            </div>
          </div>

          <div className="bg-forest-900 text-white p-6 rounded-2xl border border-forest-800 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-emerald-300 text-sm">Techathon 2026 Creator</h4>
            <p className="text-gray-300">
              Ashutosh Pathak • Built with modern civic technology protocols for rapid deployment in urban wards.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Inquiry Logged Successfully</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Ticket #ECOSETU-2026-9041 has been generated and dispatched to the Ward 42 Sanitation Supervisor.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-forest-800 text-white rounded-lg text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. resident@domain.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Society Name / Apartment</label>
                  <input
                    type="text"
                    value={formData.societyName}
                    onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                    placeholder="e.g. Green Meadows Residency"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Inquiry Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="GRIEVANCE">Missed / Irregular Collection Grievance</option>
                    <option value="RWA_ONBOARDING">New Society RWA Registration</option>
                    <option value="RECYCLER_ACCREDITATION">Authorized Recycler Partner Onboarding</option>
                    <option value="TECHNICAL_SUPPORT">Doorstep QR / AI Verification Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, grievance, or society requirements in detail..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Citizen Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
