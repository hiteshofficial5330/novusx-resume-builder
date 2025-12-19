import React, { useState } from 'react';

const InputField = ({ label, name, type = "text", placeholder, value, onChange, error, required }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 whitespace-nowrap">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 text-slate-900 bg-slate-50 border rounded-lg outline-none transition-all duration-200 ${
        error 
          ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200" 
          : "border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      }`}
    />
    {error && <span className="text-xs text-red-500 mt-1 font-medium">⚠️ {error}</span>}
  </div>
);

const PersonalDetails = ({ data, handleChange, onNext, handleImageUpload, handleImageRemove }) => {
  const [errors, setErrors] = useState({});

  const handleLocalChange = (e) => {
    const { name } = e.target;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    handleChange(e);
  };

  const validate = () => {
    let tempErrors = {};
    if (!data.fullName) tempErrors.fullName = "Full Name is required";
    // Job Title is now OPTIONAL (Removed check)
    if (!data.email) tempErrors.email = "Email is required";
    if (!data.phone) tempErrors.phone = "Phone is required";
    if (!data.address) tempErrors.address = "Address is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) onNext();
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm form-section">
      <div className="mb-8 pb-4 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Personal Details</h2>
          <p className="text-slate-500 text-sm mt-1">Contact information & Photo.</p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          Step 1 / 4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Photo Upload & Remove Section */}
        <div className="md:col-span-2 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                {data.photo ? <img src={data.photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
            </div>
            <div className="flex-1">
                <label className="text-sm font-bold text-slate-700 block mb-1">Profile Picture (Optional)</label>
                <div className="flex gap-2 items-center">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                    
                    {/* Remove Photo Button */}
                    {data.photo && (
                        <button 
                            onClick={handleImageRemove}
                            className="px-3 py-2 bg-red-100 text-red-600 text-xs font-bold rounded-full hover:bg-red-200 transition-colors"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>

        <InputField label="Full Name" name="fullName" value={data.fullName} onChange={handleLocalChange} error={errors.fullName} placeholder="e.g. Rahul Sharma" required />
        
        {/* Job Title - No longer required */}
        <InputField label="Job Title" name="jobTitle" value={data.jobTitle} onChange={handleLocalChange} placeholder="e.g. Web Developer" />
        
        <InputField label="Email Address" name="email" type="email" value={data.email} onChange={handleLocalChange} error={errors.email} placeholder="e.g. rahul@example.com" required />
        <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleLocalChange} error={errors.phone} placeholder="e.g. +91 98765 43210" required />
        
        <div className="md:col-span-2">
           <InputField label="Current Address" name="address" value={data.address} onChange={handleLocalChange} error={errors.address} placeholder="e.g. Flat 101, Shivam Society, Pune, Maharashtra" required />
        </div>

        <div className="md:col-span-2">
           <InputField label="LinkedIn Profile" name="linkedin" value={data.linkedin} onChange={handleLocalChange} placeholder="linkedin.com/in/rahul" />
        </div>
      </div>

      <div className="mt-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Professional Summary</label>
        <textarea name="summary" value={data.summary || ''} onChange={handleLocalChange} rows="4" placeholder="Briefly describe your experience..." className="w-full p-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"></textarea>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
        <button onClick={handleNextClick} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center gap-2">
          Save & Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;