import React, { useState } from 'react';

// --- MASTER DATA: ALL INDIAN BOARDS ---
const BOARDS_LIST = [
  { value: 'CBSE', label: 'CBSE - Central Board of Secondary Education' },
  { value: 'CISCE', label: 'CISCE - Council for Indian School Certificate (ICSE/ISC)' },
  { value: 'NIOS', label: 'NIOS - National Institute of Open Schooling' },
  { value: 'IB', label: 'IB - International Baccalaureate' },
  { value: 'UPMSP', label: 'UP Board - Uttar Pradesh Madhyamik Shiksha Parishad' },
  { value: 'HBSE', label: 'HBSE - Board of School Education Haryana' },
  { value: 'PSEB', label: 'PSEB - Punjab School Education Board' },
  { value: 'HPBOSE', label: 'HPBOSE - Himachal Pradesh Board of School Education' },
  { value: 'JKBOSE', label: 'JKBOSE - J&K State Board of School Education' },
  { value: 'RBSE', label: 'RBSE - Board of Secondary Education Rajasthan' },
  { value: 'UBSE', label: 'UBSE - Uttarakhand Board' },
  { value: 'MSBSHSE', label: 'Maharashtra State Board (MSBSHSE)' },
  { value: 'GSEB', label: 'GSEB - Gujarat Secondary & Higher Secondary Board' },
  { value: 'MPBSE', label: 'MP Board - Madhya Pradesh Board of Secondary Education' },
  { value: 'CGBSE', label: 'CGBSE - Chhattisgarh Board of Secondary Education' },
  { value: 'GBSHSE', label: 'Goa Board of Secondary & Higher Secondary Education' },
  { value: 'TNSB', label: 'Tamil Nadu State Board (TNSB)' },
  { value: 'KSEAB', label: 'Karnataka School Examination Board (SSLC/PUC)' },
  { value: 'AP-BOARD', label: 'Andhra Pradesh Board (BIEAP/BSEAP)' },
  { value: 'TSBIE', label: 'Telangana State Board (TSBIE)' },
  { value: 'KBPE', label: 'Kerala Board (Pareeksha Bhavan)' },
  { value: 'WBBSE', label: 'West Bengal Board (WBBSE/WBCHSE)' },
  { value: 'BSEB', label: 'BSEB - Bihar School Examination Board' },
  { value: 'JAC', label: 'JAC - Jharkhand Academic Council' },
  { value: 'BSE-ODISHA', label: 'BSE/CHSE - Odisha Board' },
  { value: 'SEBA', label: 'Assam Board (SEBA/AHSEC)' },
  { value: 'MBOSE', label: 'Meghalaya Board of School Education' },
  { value: 'NBSE', label: 'Nagaland Board' },
  { value: 'TBSE', label: 'Tripura Board' }
];

// --- DROPDOWN OPTIONS ---
const SKILL_TITLES = ["Technical Skills", "Key Competencies", "Core Skills", "Expertise", "Technologies", "Professional Skills"];
const SUMMARY_TITLES = ["Professional Summary", "About Me", "Career Profile", "Career Objective", "Summary"];

// --- HELPER: AUTO-CAPITALIZE ---
const capitalize = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// --- COMPONENT: PROGRESS BAR ---
const ProgressBar = ({ step }) => (
  <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
    <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 h-full transition-all duration-500 ease-out" style={{ width: `${step * 25}%` }}></div>
  </div>
);

// --- COMPONENT: 1. PERSONAL DETAILS ---
const PersonalDetails = ({ data, handleChange, onNext, handleImageUpload, handleImageRemove, errors }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      👤 <span className="border-b-2 border-indigo-500 pb-1">Personal Details</span>
    </h2>
    <div className="flex flex-col md:flex-row gap-6 mb-6 items-center">
      <div className="relative group shrink-0">
         <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
            {data.photo ? <img src={data.photo} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-3xl text-slate-300">📷</span>}
         </div>
         <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
         {data.photo && <button onClick={handleImageRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>}
         <p className="text-[10px] text-center text-slate-400 mt-2">Upload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.fullName ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
            {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Name is required</p>}
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
            <input type="text" name="jobTitle" value={data.jobTitle} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={data.email} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Valid Email required</p>}
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Phone <span className="text-red-500">*</span></label>
            <div className="relative">
                <input type="tel" name="phone" value={data.phone} onChange={handleChange} maxLength="10" className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.phone ? 'border-red-500 ring-1 ring-red-200' : (data.phone.length === 10 ? 'border-green-500 ring-1 ring-green-200' : 'border-slate-300 focus:ring-indigo-500')}`} />
                {data.phone.length === 10 && <span className="absolute right-3 top-3 text-green-500 text-sm">✅</span>}
            </div>
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ 10-digit Phone required</p>}
        </div>
        <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">City / Address <span className="text-red-500">*</span></label>
            <input type="text" name="address" value={data.address} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.address ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
            {errors.address && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Address is required</p>}
        </div>
         <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">LinkedIn URL</label>
            <input type="text" name="linkedin" value={data.linkedin} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
      </div>
    </div>
    <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Section Title</label>
        <select name="summaryTitle" value={data.summaryTitle} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded mb-3 focus:ring-2 focus:ring-indigo-500 bg-white">
            {SUMMARY_TITLES.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>
        <label className="text-xs font-bold text-slate-500 uppercase">Content</label>
        <textarea name="summary" value={data.summary} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
    </div>
    <div className="flex justify-end">
      <button onClick={onNext} className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors shadow-lg font-medium w-full md:w-auto">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 2. EDUCATION ---
const Education = ({ data, handleChange, onBack, onNext, errors }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">🎓 <span className="border-b-2 border-indigo-500 pb-1">Education</span></h2>
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Highest Qualification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">University / College <span className="text-red-500">*</span></label>
                <input type="text" name="university" value={data.university} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.university ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
                 {errors.university && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Required</p>}
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Degree <span className="text-red-500">*</span></label>
                <input type="text" name="degree" value={data.degree} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.degree ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
                 {errors.degree && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Required</p>}
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Pass Year <span className="text-red-500">*</span></label>
                    <input type="text" name="eduEnd" value={data.eduEnd} onChange={handleChange} maxLength="4" className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.eduEnd ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-indigo-500'}`} />
                     {errors.eduEnd && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Required</p>}
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">CGPA / %</label>
                    <input type="text" name="eduScore" value={data.eduScore} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
            </div>
        </div>
    </div>
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Class 12th / Diploma</h3>
            <div className="flex bg-white rounded-md border border-slate-300 overflow-hidden">
                <button onClick={() => handleChange({ target: { name: 'type12', value: '12th' } })} className={`px-3 py-1 text-xs font-bold ${data.type12 === '12th' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>12th</button>
                <button onClick={() => handleChange({ target: { name: 'type12', value: 'diploma' } })} className={`px-3 py-1 text-xs font-bold ${data.type12 === 'diploma' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>Diploma</button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">{data.type12 === '12th' ? 'Board Name' : 'Institute Name'}</label>
                {data.type12 === '12th' ? (
                     <select name="board12" value={data.board12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                        <option value="">Select Board</option>
                        {BOARDS_LIST.map((b, i) => <option key={i} value={b.label}>{b.label}</option>)}
                     </select>
                ) : (
                     <input type="text" name="board12" value={data.board12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                )}
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Stream</label>
                <input type="text" name="stream12" value={data.stream12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="text" name="year12" value={data.year12} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">%</label>
                    <input type="text" name="score12" value={data.score12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
            </div>
        </div>
    </div>
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Class 10th</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Board Name</label>
                <select name="board10" value={data.board10} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                        <option value="">Select Board</option>
                        {BOARDS_LIST.map((b, i) => <option key={i} value={b.label}>{b.label}</option>)}
                </select>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="text" name="year10" value={data.year10} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">%</label>
                    <input type="text" name="score10" value={data.score10} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
            </div>
        </div>
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors shadow-lg font-medium">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 3. EXPERIENCE (MULTIPLE) ---
const Experience = ({ data, addExperience, updateExperience, removeExperience, onBack, onNext }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">💼 <span className="border-b-2 border-indigo-500 pb-1">Experience</span></h2>
    
    {data.experiences.map((exp, index) => (
        <div key={exp.id} className="relative bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 group">
            {data.experiences.length > 1 && (
                <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 font-bold z-10">
                    🗑️ Remove
                </button>
            )}
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Experience {index + 1}</h3>
            <div className="grid grid-cols-1 gap-4 mb-2">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Job Role</label>
                    <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500 uppercase">Start Year</label><input type="text" value={exp.start} onChange={(e) => updateExperience(exp.id, 'start', e.target.value)} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                    <div><label className="text-xs font-bold text-slate-500 uppercase">End Year</label><input type="text" value={exp.end} onChange={(e) => updateExperience(exp.id, 'end', e.target.value)} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                    <textarea value={exp.desc} onChange={(e) => updateExperience(exp.id, 'desc', e.target.value)} rows="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                </div>
            </div>
        </div>
    ))}

    <button onClick={addExperience} className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 font-bold hover:bg-indigo-50 transition-colors mb-6 flex items-center justify-center gap-2">
        + Add Another Experience
    </button>

    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors shadow-lg font-medium">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 4. EXTRAS (SKILLS & CUSTOM) ---
const Extras = ({ data, handleChange, onBack, onNext, addCustomSection, updateCustomSection, removeCustomSection }) => {
    return (
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">🚀 <span className="border-b-2 border-indigo-500 pb-1">Skills & Extras</span></h2>
        
        {/* SKILLS SECTION */}
        <div className="mb-6">
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Skills Section Title</label>
             <select name="skillLabel" value={data.skillLabel} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded mb-3 focus:ring-2 focus:ring-indigo-500 bg-white">
                {SKILL_TITLES.map((t, i) => <option key={i} value={t}>{t}</option>)}
             </select>

             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">List your skills (comma separated)</label>
             <textarea name="skills" value={data.skills} onChange={handleChange} rows="3" placeholder="e.g. Java, HTML, CSS, React" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
             <p className="text-[10px] text-slate-400 mt-1">Tip: Use commas to create a list.</p>
        </div>
        
        <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 uppercase">Languages</label>
            <input type="text" name="languages" value={data.languages} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase">Certifications / Projects</label>
            <textarea name="certifications" value={data.certifications} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
        </div>

        {/* CUSTOM SECTIONS WITH YEAR */}
        <div className="pt-4 border-t border-slate-100">
             <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Custom Sections</label>
             </div>
             {data.customSections.map((section) => (
                 <div key={section.id} className="mb-4 bg-slate-50 p-3 rounded border border-slate-200 relative group">
                     <button onClick={() => removeCustomSection(section.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 font-bold">×</button>
                     <div className="flex gap-2 mb-2">
                        <input type="text" placeholder="Title (e.g. Achievement)" value={section.title} onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)} className="w-2/3 p-2 border border-slate-300 rounded text-sm font-bold focus:ring-1 focus:ring-indigo-500 outline-none" />
                        <input type="text" placeholder="Year" value={section.year} onChange={(e) => updateCustomSection(section.id, 'year', e.target.value)} className="w-1/3 p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
                     </div>
                     <textarea placeholder="Details..." value={section.desc} onChange={(e) => updateCustomSection(section.id, 'desc', e.target.value)} rows="2" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-indigo-500 outline-none"></textarea>
                 </div>
             ))}
             <button onClick={addCustomSection} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 border border-indigo-600 rounded px-3 py-1 hover:bg-indigo-50 transition-colors">
                + Add Another Section
             </button>
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
          <button onClick={onNext} className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all font-bold w-full md:w-auto">✨ Generate Resume</button>
        </div>
      </div>
    );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // CONFIGURATION
  const [customColor, setCustomColor] = useState('#0e7490'); // Default Cyan
  const [templateMode, setTemplateMode] = useState('modern'); // modern, classic, elegant, bold
  const [templateType, setTemplateType] = useState('fresher'); // 'fresher' or 'pro'

  // INITIAL STATE
  const [resumeData, setResumeData] = useState({
    photo: null,
    fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', address: '', summary: '',
    summaryTitle: 'Professional Summary',
    university: '', degree: '', eduEnd: '', eduScore: '',
    type12: '12th', board12: '', stream12: '', year12: '', score12: '',
    board10: '', year10: '', score10: '',
    // CHANGED: experiences is now an array
    experiences: [{ id: 1, company: '', role: '', start: '', end: '', desc: '' }],
    skills: '', skillLabel: 'Technical Skills',
    languages: '', certifications: '',
    customSections: [{ id: 1, title: '', desc: '', year: '' }]
  });

  const [finalResume, setFinalResume] = useState({});

  // VALIDATION
  const validateInput = (name, value) => {
    const currentYear = new Date().getFullYear();
    if (['fullName', 'languages', 'address', 'city', 'university', 'degree', 'stream12'].includes(name)) {
        if (value === '') return '';
        if (/^[a-zA-Z\s,.\/()-]+$/.test(value)) {
            if (['fullName', 'city', 'university'].includes(name)) return capitalize(value);
            return value;
        }
        return null;
    }
    if (name === 'jobTitle') {
        if (value === '') return '';
        if (/^[a-zA-Z\s-]+$/.test(value)) return capitalize(value);
        return null;
    }
    if (['summary', 'summaryTitle', 'certifications', 'skills'].includes(name)) return value;
    if (name === 'phone') {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value)) return value.length <= 10 ? value : null;
        return null;
    }
    if (['year10', 'year12', 'eduEnd'].includes(name)) {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value) && value.length <= 4) {
            if (value.length === 4 && parseInt(value) > currentYear + 6) return null;
            return value;
        }
        return null;
    }
    if (['score10', 'score12', 'eduScore'].includes(name)) {
        if (value === '') return '';
        if (/^[0-9.%]+$/.test(value)) return value;
        return null; 
    }
    if (name === 'email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setErrors(prev => ({ ...prev, email: !isValid && value.length > 0 }));
        return value; 
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = validateInput(name, value);
    if (validatedValue !== null) setResumeData({ ...resumeData, [name]: validatedValue });
    // Clear error if typing
    if (validatedValue !== null && errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  // EXPERIENCE HANDLERS
  const addExperience = () => {
      const newId = resumeData.experiences.length + 1;
      setResumeData({ ...resumeData, experiences: [...resumeData.experiences, { id: newId, company: '', role: '', start: '', end: '', desc: '' }] });
  };
  const updateExperience = (id, field, value) => {
      const currentYear = new Date().getFullYear();
      
      // Basic validation for dates
      if (['start', 'end'].includes(field)) {
          // Allow empty or "Present"
          if (value === '') {
             // pass
          } else if (value.toLowerCase() === 'present') {
             // pass
          } else if (!/^[0-9]+$/.test(value)) {
             // Not a number? block it
             return;
          } else {
             // It is a number
             if (value.length > 4) return;
             // Check if future
             if (value.length === 4 && parseInt(value) > currentYear) return;
          }
      }
      const updatedExps = resumeData.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
      setResumeData({ ...resumeData, experiences: updatedExps });
  };
  const removeExperience = (id) => {
      const updatedExps = resumeData.experiences.filter(exp => exp.id !== id);
      setResumeData({ ...resumeData, experiences: updatedExps });
  };

  const addCustomSection = () => {
      const newId = resumeData.customSections.length + 1;
      setResumeData({ ...resumeData, customSections: [...resumeData.customSections, { id: newId, title: '', desc: '', year: '' }] });
  };
  const updateCustomSection = (id, field, value) => {
      const updatedSections = resumeData.customSections.map(sec => sec.id === id ? { ...sec, [field]: value } : sec);
      setResumeData({ ...resumeData, customSections: updatedSections });
  };
  const removeCustomSection = (id) => {
      const updatedSections = resumeData.customSections.filter(sec => sec.id !== id);
      setResumeData({ ...resumeData, customSections: updatedSections });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setResumeData({ ...resumeData, photo: reader.result });
        reader.readAsDataURL(file);
    }
  };
  const handleImageRemove = () => setResumeData({ ...resumeData, photo: null });

  // STEP VALIDATION LOGIC
  const validateStep = (currentStep) => {
      const newErrors = {};
      let isValid = true;

      if (currentStep === 1) {
          if (!resumeData.fullName) newErrors.fullName = true;
          if (!resumeData.email || errors.email) newErrors.email = true;
          if (!resumeData.phone || resumeData.phone.length !== 10) newErrors.phone = true;
          if (!resumeData.address) newErrors.address = true;
      }
      
      if (currentStep === 2) {
          if (!resumeData.university) newErrors.university = true;
          if (!resumeData.degree) newErrors.degree = true;
          if (!resumeData.eduEnd) newErrors.eduEnd = true;
      }

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          isValid = false;
          // Shake effect or alert could go here
          alert("Please fill in all required fields marked with *");
      }
      return isValid;
  };

  const nextStep = () => {
      if (validateStep(step)) {
          setStep(step + 1);
          setErrors({});
          window.scrollTo(0, 0);
      }
  };
  const prevStep = () => setStep(step - 1);
  
  const handleFinish = async () => {
    setIsGenerating(true);
    setTimeout(() => {
        setFinalResume(resumeData);
        setIsGenerating(false);
        setIsFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const downloadPDF = () => window.print();
  const editResume = () => setIsFinished(false);
  const getList = (text) => text ? text.split(/,|\n/).map(item => item.trim()).filter(item => item.length > 0) : [];

  // --- RENDER RESUME CONTENT ---
  const renderResumeContent = () => {
    const data = isFinished ? finalResume : resumeData;
    const langList = getList(data.languages);
    const certList = getList(data.certifications);
    const skillList = getList(data.skills);

    const getScoreLabel = (score) => {
        if (!score) return '';
        if (score.toString().includes('%')) return 'Percentage';
        const num = parseFloat(score);
        if (!isNaN(num) && num <= 10 && num >= 0) return 'CGPA';
        return 'Percentage';
    };

    const styles = {
        modern: {
            container: "flex items-stretch",
            sidebar: "w-[30%] text-white p-6 flex flex-col items-center",
            main: "w-[70%] p-8 bg-white",
            header: "shrink-0 mb-6",
            headerText: "text-slate-900",
            sectionTitle: "text-sm font-bold uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-3 text-slate-800"
        },
        classic: {
            container: "flex flex-col bg-white p-8",
            sidebar: "hidden",
            main: "w-full",
            header: "border-b-2 border-slate-900 pb-6 mb-6 flex items-center gap-6",
            headerText: "text-slate-900",
            sectionTitle: "text-lg font-extrabold uppercase border-b border-slate-900 pb-1 mb-4 text-slate-900 mt-6"
        },
        elegant: {
            container: "flex flex-col bg-white p-12 font-serif lining-nums",
            sidebar: "hidden",
            main: "w-full text-left",
            header: "mb-8 border-b-2 border-slate-800 pb-6 text-center", 
            headerText: "text-gray-900",
            sectionTitle: "text-lg font-bold font-serif text-gray-900 mb-4 mt-8 border-b-2 border-slate-800 pb-1 uppercase tracking-widest", 
            align: "left"
        },
        bold: {
            container: "flex flex-col bg-white p-8",
            sidebar: "hidden",
            main: "w-full",
            header: "p-10 text-white mb-6 flex items-center gap-6",
            headerText: "text-white",
            sectionTitle: "bg-slate-100 p-2 font-extrabold uppercase text-slate-900 mb-4 mt-6 text-sm tracking-wide"
        }
    };
    
    const t = styles[templateMode];
    const userColor = customColor;

    // CHANGED: Map through all experiences
    const ExperienceSection = data.experiences && data.experiences.length > 0 && data.experiences[0].company && (
        <div className="mb-6">
            <h3 className={t.sectionTitle} style={templateMode === 'classic' ? {borderColor: userColor} : {}}>Experience</h3>
            {data.experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-extrabold text-slate-900 text-lg">{exp.role}</h4>
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap ml-4">
                            {exp.start} - {exp.end}
                        </span>
                    </div>
                    <div className={`text-slate-600 font-medium mb-2`}>{exp.company}</div>
                    <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">{exp.desc}</p>
                </div>
            ))}
        </div>
    );

    const EducationSection = (
        <div className="mb-6">
            <h3 className={t.sectionTitle} style={templateMode === 'classic' ? {borderColor: userColor} : {}}>Education</h3>
            {data.university && (
                <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-extrabold text-slate-900 text-lg">{data.degree}</h4>
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap ml-4">{data.eduEnd}</span>
                    </div>
                    <div className="text-slate-600 font-medium">{data.university}</div>
                    {data.eduScore && <div className="text-sm font-bold text-slate-800 mt-1">{getScoreLabel(data.eduScore)}: {data.eduScore}</div>}
                </div>
            )}
            {(data.board12 || data.stream12) && (
                <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-900 text-base">{data.type12 === 'diploma' ? 'Diploma' : 'Class 12th'}</h4>
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap ml-4">{data.year12}</span>
                    </div>
                    <div className="text-slate-600">{data.board12}</div>
                    {data.stream12 && <div className="text-sm text-slate-500 italic">{data.stream12}</div>}
                    {data.score12 && <div className="text-sm font-bold text-slate-800 mt-1">{getScoreLabel(data.score12)}: {data.score12}</div>}
                </div>
            )}
            {data.board10 && (
                <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-900 text-base">Class 10th</h4>
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap ml-4">{data.year10}</span>
                    </div>
                    <div className="text-slate-600">{data.board10}</div>
                    {data.score10 && <div className="text-sm font-bold text-slate-800 mt-1">{getScoreLabel(data.score10)}: {data.score10}</div>}
                </div>
            )}
        </div>
    );

    return (
        <div className={`shadow-xl mx-auto print:shadow-none print:w-full w-full bg-white ${t.container} min-h-[1000px]`}>
            {templateMode === 'modern' && (
                <div className={t.sidebar} style={{backgroundColor: userColor}}>
                    {data.photo && (
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden mb-6 shadow-md bg-white/20 flex items-center justify-center shrink-0">
                            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="w-full space-y-4 text-sm mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">Contact</h3>
                        {data.email && <div className="break-all flex gap-2"><span>✉️</span> <span>{data.email}</span></div>}
                        {data.phone && <div className="flex gap-2"><span>📞</span> <span>{data.phone}</span></div>}
                        {data.address && <div className="flex gap-2"><span>📍</span> <span>{data.address}</span></div>}
                        {data.linkedin && <div className="break-all flex gap-2"><span>🔗</span> <span>{data.linkedin.replace(/^https?:\/\//, '')}</span></div>}
                    </div>
                    {skillList.length > 0 && (
                        <div className="w-full space-y-2 mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">{data.skillLabel || 'Skills'}</h3>
                            <ul className="text-sm list-disc ml-4 space-y-1">
                                {skillList.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    )}
                    {langList.length > 0 && (
                        <div className="w-full space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">Languages</h3>
                            <ul className="text-sm space-y-1">
                                 {langList.map((l, i) => <li key={i}>{l}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className={t.main} style={{textAlign: t.align || 'left'}}>
                <div className={t.header} style={templateMode === 'bold' ? {backgroundColor: userColor} : {}}>
                     {templateMode !== 'modern' && data.photo && (
                         <div className={`w-28 h-28 rounded-full border-2 border-white/50 overflow-hidden shrink-0 ${templateMode === 'elegant' ? 'mx-auto mb-4' : ''} ${templateMode === 'classic' ? 'border-slate-200' : ''}`}>
                            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                     )}
                     <div className={templateMode === 'elegant' ? 'mx-auto' : ''}>
                        <h1 className={`text-4xl font-extrabold uppercase tracking-tight leading-none mb-2 ${t.headerText}`} style={templateMode === 'modern' ? {color: userColor} : {}}>{data.fullName || "YOUR NAME"}</h1>
                        {data.jobTitle && <p className={`text-lg font-bold uppercase tracking-widest opacity-80 ${t.headerText}`} style={templateMode === 'modern' ? {color: userColor} : {}}>{data.jobTitle}</p>}
                        
                        {templateMode !== 'modern' && (
                             <div className={`flex flex-wrap gap-4 text-sm mt-3 opacity-80 ${t.headerText} ${templateMode === 'elegant' ? 'justify-center' : ''}`}>
                                {data.email && <span className="flex items-center gap-1">✉️ {data.email}</span>}
                                {data.phone && <span className="flex items-center gap-1">📞 {data.phone}</span>}
                                {data.address && <span className="flex items-center gap-1">📍 {data.address}</span>}
                                {data.linkedin && <span className="flex items-center gap-1">🔗 {data.linkedin.replace(/^https?:\/\//, '')}</span>}
                             </div>
                        )}
                     </div>
                </div>

                {data.summary && (
                    <div className="mb-8">
                        <h3 className={t.sectionTitle} style={templateMode === 'classic' ? {borderColor: userColor} : {}}>{data.summaryTitle || 'Professional Summary'}</h3>
                        <p className="text-slate-700 text-sm leading-relaxed">{data.summary}</p>
                    </div>
                )}

                {templateType === 'pro' ? <>{ExperienceSection}{EducationSection}</> : <>{EducationSection}{ExperienceSection}</>}

                {data.customSections.map((section) => (
                    section.title && (
                        <div key={section.id} className="mb-6">
                            <h3 className={t.sectionTitle} style={templateMode === 'classic' ? {borderColor: userColor} : {}}>{section.title}</h3>
                            <div className={`flex justify-between items-baseline mb-1 ${templateMode === 'elegant' ? 'flex-col items-start' : ''}`}>
                                 <h4 className="font-bold text-slate-800 text-sm">{section.desc}</h4>
                                 {section.year && <span className="text-xs font-bold text-slate-500">{section.year}</span>}
                            </div>
                        </div>
                    )
                ))}

                {certList.length > 0 && (
                    <div className="mb-8">
                        <h3 className={t.sectionTitle} style={templateMode === 'classic' ? {borderColor: userColor} : {}}>Certifications</h3>
                        <ul className={`list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm leading-relaxed ${templateMode === 'elegant' ? 'ml-4' : ''}`}>
                            {certList.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                )}

                {templateMode !== 'modern' && (
                    <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8">
                        {skillList.length > 0 && (
                            <div>
                                <h3 className="font-extrabold uppercase text-slate-800 text-sm mb-2">{data.skillLabel || 'Skills'}</h3>
                                <ul className={`list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm`}>
                                    {skillList.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                        {langList.length > 0 && (
                            <div>
                                <h3 className="font-extrabold uppercase text-slate-800 text-sm mb-2">Languages</h3>
                                <ul className={`list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm`}>
                                    {langList.map((l, i) => <li key={i}>{l}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-['Inter'] pb-20 main-container">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg border border-slate-700">
                  <span className="bg-clip-text text-transparent bg-gradient-to-tr from-cyan-400 to-indigo-400">NX</span>
               </div>
               <div className="flex flex-col">
                   <span className="font-bold text-xl text-slate-800 tracking-tight leading-none font-['Outfit']">Novus<span className="text-indigo-600">X</span>.AI</span>
               </div>
            </div>
            {isFinished && (
               <div className="flex items-center gap-4">
                   <button onClick={editResume} className="px-3 py-1 text-slate-600 text-sm font-medium border rounded hover:bg-slate-50">Edit</button>
                   <button onClick={downloadPDF} className="px-4 py-2 bg-[#0e7490] text-white font-medium rounded hover:opacity-90 text-sm shadow-lg">Download PDF</button>
               </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isGenerating && (
            <div className="fixed inset-0 bg-white/90 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                <h2 className="text-2xl font-bold text-slate-800 animate-pulse">Building Resume...</h2>
            </div>
        )}

        {isFinished && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 mb-8 flex flex-col md:flex-row gap-6 items-center justify-center no-print">
                 <div className="flex flex-wrap gap-2 items-center justify-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mr-2">Type:</span>
                    <button onClick={() => setTemplateType('fresher')} className={`px-4 py-2 text-sm rounded-lg border ${templateType === 'fresher' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Fresher</button>
                    <button onClick={() => setTemplateType('pro')} className={`px-4 py-2 text-sm rounded-lg border ${templateType === 'pro' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Pro</button>
                 </div>
                 <div className="flex flex-wrap gap-2 items-center justify-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mr-2">Template:</span>
                    {['modern', 'classic', 'elegant', 'bold'].map(t => (
                        <button key={t} onClick={() => setTemplateMode(t)} className={`px-4 py-2 text-sm rounded-lg border capitalize ${templateMode === t ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>{t}</button>
                    ))}
                 </div>
                 <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mr-2">Theme Color:</span>
                    <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-10 p-1 rounded cursor-pointer border border-slate-300" />
                 </div>
            </div>
        )}

        {isFinished ? (
          <div className="w-full max-w-[850px] mx-auto">{renderResumeContent()}</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
               <ProgressBar step={step} />
               {step === 1 && <PersonalDetails data={resumeData} handleChange={handleChange} onNext={nextStep} handleImageUpload={handleImageUpload} handleImageRemove={handleImageRemove} errors={errors} />}
               {step === 2 && <Education data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} errors={errors} />}
               {/* CHANGED: Passing new props to Experience */}
               {step === 3 && <Experience data={resumeData} addExperience={addExperience} updateExperience={updateExperience} removeExperience={removeExperience} onBack={prevStep} onNext={nextStep} />}
               {step === 4 && <Extras data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={handleFinish} addCustomSection={addCustomSection} updateCustomSection={updateCustomSection} removeCustomSection={removeCustomSection} />}
            </div>
            <div className="lg:col-span-7">
               <div className="hidden lg:block sticky top-24 scale-90 origin-top-left">{renderResumeContent()}</div>
               <button onClick={() => setShowPreviewModal(true)} className="lg:hidden fixed bottom-6 right-6 bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl z-40 border-2 border-white">👁️</button>
               {showPreviewModal && (
                  <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col overflow-auto p-4 animate-fadeIn">
                      <div className="flex justify-end mb-2"><button onClick={() => setShowPreviewModal(false)} className="text-white bg-red-500 rounded-full w-8 h-8 font-bold flex items-center justify-center">×</button></div>
                      <div className="bg-white rounded overflow-hidden shadow-lg scale-95 origin-top">{renderResumeContent()}</div>
                  </div>
               )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;