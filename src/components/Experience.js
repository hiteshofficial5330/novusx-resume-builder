import React from 'react';

const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 whitespace-nowrap">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
    />
  </div>
);

const Experience = ({ data, handleChange, onBack, onNext }) => {
  
  // LOGIC: If fields are empty, we assume Fresher and allow skip.
  // If they start typing, we validate.
  const handleNextClick = () => {
    onNext(); // No strict validation blocking here to support Freshers
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm form-section">
      <div className="mb-8 pb-4 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Experience</h2>
          <p className="text-slate-500 text-sm mt-1">Internships or Jobs (Optional for Freshers).</p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          Step 3 / 4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
            <InputField label="Company Name" name="company" value={data.company} onChange={handleChange} placeholder="Leave blank if Fresher" />
        </div>
        <div className="md:col-span-2">
            <InputField label="Job Title / Role" name="role" value={data.role} onChange={handleChange} placeholder="e.g. Web Development Intern" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
             <InputField label="Start Year" name="expStart" type="number" value={data.expStart} onChange={handleChange} placeholder="2022" />
             <InputField label="End Year" name="expEnd" type="number" value={data.expEnd} onChange={handleChange} placeholder="2023" />
        </div>

        <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Job Description</label>
            <textarea
              name="expDesc"
              value={data.expDesc || ''}
              onChange={handleChange}
              rows="5"
              placeholder="• Describe your responsibilities..."
              className="w-full p-3 text-slate-900 bg-slate-50 border rounded-lg outline-none transition-all duration-200 resize-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            ></textarea>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
        <button onClick={onBack} className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors flex items-center gap-2">
          ← Back
        </button>
        <button onClick={handleNextClick} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center gap-2">
          Save & Next →
        </button>
      </div>
    </div>
  );
};

export default Experience;