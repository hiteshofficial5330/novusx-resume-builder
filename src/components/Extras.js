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

const Extras = ({ data, handleChange, onBack, onNext }) => {
  const handleFinishClick = () => {
      onNext();
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm form-section max-h-[70vh] overflow-y-auto">
      <div className="mb-8 pb-4 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Skills & Extras</h2>
          <p className="text-slate-500 text-sm mt-1">Technical details.</p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          Step 4 / 4
        </span>
      </div>

      <div className="space-y-6">
        
        {/* SKILLS SECTION WITH LABEL SELECTOR */}
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Skills</label>
                
                {/* Skill Label Selector */}
                <div className="flex items-center gap-2">
                    <label className="text-[10px] uppercase font-bold text-indigo-600">Title:</label>
                    <select 
                        name="skillLabel" 
                        value={data.skillLabel || 'Technical Skills'} 
                        onChange={handleChange}
                        className="text-xs p-1 rounded border border-indigo-200 bg-white text-indigo-900 outline-none focus:border-indigo-500"
                    >
                        <option value="Technical Skills">Technical Skills</option>
                        <option value="Skills">Skills</option>
                        <option value="Core Skills">Core Skills</option>
                        <option value="Key Competencies">Key Competencies</option>
                        <option value="Expertise">Expertise</option>
                    </select>
                </div>
            </div>
            
            <textarea 
                name="skills" 
                value={data.skills || ''} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Java, Python, C++, React.js, SQL..." 
                className="w-full p-3 text-slate-900 bg-white border border-indigo-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"
            ></textarea>
            <p className="text-xs text-slate-400 mt-1">Tip: Press Enter to list them vertically.</p>
        </div>

        <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Languages</label>
            <textarea name="languages" value={data.languages || ''} onChange={handleChange} rows="3" placeholder="English, Hindi, Marathi" className="w-full p-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"></textarea>
            <p className="text-xs text-slate-400 mt-1">Tip: Press Enter to list them vertically.</p>
        </div>

        <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Certifications & Projects</label>
            <textarea name="certifications" value={data.certifications || ''} onChange={handleChange} rows="4" placeholder="• AWS Certified Developer&#10;• Library Management System Project" className="w-full p-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"></textarea>
            <p className="text-xs text-slate-400 mt-1">Tip: Press Enter for new line. It will show as bullets.</p>
        </div>

        {/* Custom Section */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-slate-700 font-bold mb-3 text-sm uppercase">➕ Add Custom Section (Optional)</h3>
            <div className="space-y-3">
                <InputField label="Section Title" name="customTitle" value={data.customTitle} onChange={handleChange} placeholder="e.g. Achievements / Volunteering" />
                <div>
                     <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Description</label>
                     <textarea name="customDesc" value={data.customDesc || ''} onChange={handleChange} rows="3" placeholder="Details..." className="w-full p-3 text-slate-900 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"></textarea>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
        <button onClick={onBack} className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors flex items-center gap-2">← Back</button>
        <button onClick={handleFinishClick} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg shadow-green-200 transition-all transform active:scale-95 flex items-center gap-2">
          Finish & Download <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Extras;