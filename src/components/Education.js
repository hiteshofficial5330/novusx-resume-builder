import React, { useState } from 'react';

const InputField = ({ label, name, type = "text", placeholder, value, onChange, error }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
      {label}
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
    {error && <span className="text-xs text-red-500 mt-1 font-bold">⚠️ {error}</span>}
  </div>
);

const SelectBoard = ({ label, name, value, onChange }) => (
    <div className="flex flex-col">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full p-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
      >
        <option value="">Select Board</option>
        <option value="CBSE (Central Board of Secondary Education)">CBSE</option>
        <option value="Maharashtra State Board (MSBSHSE)">Maharashtra (MSBSHSE)</option>
        <option value="Uttar Pradesh (UPMSP)">Uttar Pradesh (UPMSP)</option>
        <option value="Rajasthan (RBSE)">Rajasthan (RBSE)</option>
        <option value="Gujarat (GSEB)">Gujarat (GSEB)</option>
        <option value="Haryana (BSEH)">Haryana (BSEH)</option>
        <option value="Punjab (PSEB)">Punjab (PSEB)</option>
        <option value="Odisha (BSE & CHSE)">Odisha (BSE & CHSE)</option>
        <option value="Madhya Pradesh (MPBSE)">Madhya Pradesh (MPBSE)</option>
        <option value="Bihar (BSEB)">Bihar (BSEB)</option>
        <option value="Andhra Pradesh (BSEAP)">Andhra Pradesh (BSEAP)</option>
        <option value="Telangana (TSBIE)">Telangana (TSBIE)</option>
        <option value="Himachal Pradesh (HPBOSE)">Himachal Pradesh (HPBOSE)</option>
        <option value="Assam (ASSEB)">Assam (ASSEB)</option>
        <option value="West Bengal (WBBSE)">West Bengal (WBBSE)</option>
        <option value="Karnataka (KSEEB)">Karnataka (KSEEB)</option>
        <option value="Jharkhand (JAC)">Jharkhand (JAC)</option>
        <option value="Goa (GBSHSE)">Goa (GBSHSE)</option>
        <option value="J&K (JKBOSE)">J&K (JKBOSE)</option>
        <option value="ICSE">ICSE</option>
        <option value="Other">Other / International</option>
      </select>
    </div>
);

const Education = ({ data, handleChange, onBack, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateScore = (score) => {
    if (!score) return null;
    const num = parseFloat(score);
    if (isNaN(num)) return "Invalid number";
    if (num > 10 && num < 35) {
        return "Percentage cannot be less than 35%";
    }
    return null;
  };

  const validate = () => {
    let tempErrors = {};
    if (!data.degree) tempErrors.degree = "Highest Degree is required";
    if (!data.university) tempErrors.university = "University is required";

    const degreeError = validateScore(data.eduScore);
    if (degreeError) tempErrors.eduScore = degreeError;

    const class12Error = validateScore(data.score12);
    if (class12Error) tempErrors.score12 = class12Error;

    const class10Error = validateScore(data.score10);
    if (class10Error) tempErrors.score10 = class10Error;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) onNext();
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm form-section max-h-[70vh] overflow-y-auto">
      <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Education Details</h2>
          <p className="text-slate-500 text-sm mt-1">Academics & Board selection.</p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          Step 2 / 4
        </span>
      </div>

      <div className="space-y-8">
        
        {/* Highest Qualification */}
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">🎓 Graduation / Highest Degree <span className="text-red-500">*</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <InputField label="College / University Name" name="university" value={data.university} onChange={handleChange} error={errors.university} placeholder="e.g. Pune University" />
                </div>
                <div className="md:col-span-2">
                    <InputField label="Degree / Course Name" name="degree" value={data.degree} onChange={handleChange} error={errors.degree} placeholder="e.g. B.Tech Computer Science" />
                </div>
                <InputField label="Passing Year" name="eduEnd" type="number" value={data.eduEnd} onChange={handleChange} placeholder="2024" />
                <InputField label="CGPA / Percentage" name="eduScore" value={data.eduScore} onChange={handleChange} error={errors.eduScore} placeholder="e.g. 8.5 CGPA" />
            </div>
        </div>

        {/* Class 12th / Diploma */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="text-slate-700 font-bold mb-3">🏫 Intermediate / Diploma</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Type Selector */}
                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Qualification Type</label>
                    <select name="type12" value={data.type12} onChange={handleChange} className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-600">
                        <option value="12th">Class 12th</option>
                        <option value="diploma">Diploma</option>
                    </select>
                </div>

                {/* LOGIC: If Diploma, Show Input. If 12th, Show Dropdown */}
                {data.type12 === 'diploma' ? (
                     <InputField label="University / Institute Name" name="board12" value={data.board12} onChange={handleChange} placeholder="e.g. MSBTE / Govt Polytechnic" />
                ) : (
                     <SelectBoard label="Board" name="board12" value={data.board12} onChange={handleChange} />
                )}
                
                <div className="md:col-span-2">
                    <InputField label={data.type12 === 'diploma' ? "Branch Name" : "Stream"} name="stream12" value={data.stream12} onChange={handleChange} placeholder={data.type12 === 'diploma' ? "e.g. Computer Engineering" : "e.g. Science"} />
                </div>

                <InputField label="Passing Year" name="year12" type="number" value={data.year12} onChange={handleChange} placeholder="2020" />
                <InputField label="Percentage (%)" name="score12" value={data.score12} onChange={handleChange} error={errors.score12} placeholder="e.g. 88%" />
            </div>
        </div>

        {/* Class 10th */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="text-slate-700 font-bold mb-3">🏫 Class 10th</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <SelectBoard label="Board" name="board10" value={data.board10} onChange={handleChange} />
                </div>
                <InputField label="Passing Year" name="year10" type="number" value={data.year10} onChange={handleChange} placeholder="2018" />
                <InputField label="Percentage (%)" name="score10" value={data.score10} onChange={handleChange} error={errors.score10} placeholder="e.g. 92%" />
            </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
        <button onClick={onBack} className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors flex items-center gap-2">← Back</button>
        <button onClick={handleNextClick} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center gap-2">Save & Next →</button>
      </div>
    </div>
  );
};

export default Education;