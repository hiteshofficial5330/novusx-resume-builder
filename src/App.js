import React, { useState, useEffect, useRef } from 'react';
import { generateEnhancedResume } from './utils/AIResumeGenerator';

// --- MASTER DATA: BOARDS ---
const BOARDS_LIST = [
  { value: 'CBSE', label: 'CBSE - Central Board of Secondary Education' },
  { value: 'CISCE', label: 'CISCE - Council for Indian School Certificate' },
  { value: 'NIOS', label: 'NIOS - National Institute of Open Schooling' },
  { value: 'MSBSHSE', label: 'Maharashtra State Board (MSBSHSE)' },
  { value: 'UPMSP', label: 'UP Board - Uttar Pradesh' },
  { value: 'GSEB', label: 'GSEB - Gujarat Board' },
  { value: 'RBSE', label: 'RBSE - Rajasthan Board' },
  { value: 'MPBSE', label: 'MP Board - Madhya Pradesh' },
  { value: 'TNSB', label: 'Tamil Nadu State Board' },
  { value: 'KSEAB', label: 'Karnataka State Board' },
  { value: 'WBBSE', label: 'West Bengal Board' },
  { value: 'BSEB', label: 'Bihar Board' }
];

// --- HELPER: AUTO-CAPITALIZE ---
const capitalize = (str) => str.replace(/\b\w/g, char => char.toUpperCase());

// --- COMPONENT: PROGRESS BAR ---
const ProgressBar = ({ step }) => (
  <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
    <div className="bg-[#0e7490] h-full transition-all duration-500 ease-out" style={{ width: `${step * 25}%` }}></div>
  </div>
);

// --- COMPONENT: 1. PERSONAL DETAILS ---
const PersonalDetails = ({ data, handleChange, onNext, handleImageUpload, handleImageRemove, errors }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      👤 <span className="border-b-2 border-cyan-500 pb-1">Personal Details</span>
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
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
            {/* RENAMED FROM TARGET ROLE TO JOB TITLE */}
            <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
            <input type="text" name="jobTitle" value={data.jobTitle} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <input type="email" name="email" value={data.email} onChange={handleChange} className={`w-full p-3 border rounded focus:ring-2 outline-none ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-cyan-500'}`} />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Invalid Email</p>}
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Phone (10 Digits)</label>
            <div className="relative">
                <input type="tel" name="phone" value={data.phone} onChange={handleChange} maxLength="10" className={`w-full p-3 border rounded focus:ring-2 outline-none ${data.phone.length === 10 ? 'border-green-500 ring-1 ring-green-200' : 'border-slate-300 focus:ring-cyan-500'}`} />
                {data.phone.length === 10 && <span className="absolute right-3 top-3 text-green-500 text-sm">✅</span>}
            </div>
        </div>
        <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">City / Address</label>
            <input type="text" name="address" value={data.address} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
         <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">LinkedIn URL</label>
            <input type="text" name="linkedin" value={data.linkedin} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
      </div>
    </div>
    
    <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase">Professional Summary</label>
        {/* Validation Relaxed for Summary to allow Numbers/Symbols */}
        <textarea name="summary" value={data.summary} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
    </div>

    <div className="flex justify-end">
      <button onClick={onNext} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-lg font-medium w-full md:w-auto">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 2. EDUCATION ---
const Education = ({ data, handleChange, onBack, onNext }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">🎓 <span className="border-b-2 border-cyan-500 pb-1">Education</span></h2>
    
    {/* Degree */}
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Highest Qualification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">University / College</label>
                <input type="text" name="university" value={data.university} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Degree</label>
                <input type="text" name="degree" value={data.degree} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Pass Year</label>
                    <input type="text" name="eduEnd" value={data.eduEnd} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">CGPA / %</label>
                    <input type="text" name="eduScore" value={data.eduScore} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>
        </div>
    </div>

    {/* 12th */}
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
                     <select name="board12" value={data.board12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
                        <option value="">Select Board</option>
                        {BOARDS_LIST.map((b, i) => <option key={i} value={b.label}>{b.label}</option>)}
                     </select>
                ) : (
                     <input type="text" name="board12" value={data.board12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                )}
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Stream</label>
                <input type="text" name="stream12" value={data.stream12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="text" name="year12" value={data.year12} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">%</label>
                    <input type="text" name="score12" value={data.score12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>
        </div>
    </div>

    {/* 10th */}
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Class 10th</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Board Name</label>
                <select name="board10" value={data.board10} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
                        <option value="">Select Board</option>
                        {BOARDS_LIST.map((b, i) => <option key={i} value={b.label}>{b.label}</option>)}
                </select>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="text" name="year10" value={data.year10} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">%</label>
                    <input type="text" name="score10" value={data.score10} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>
        </div>
    </div>

    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-lg font-medium">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 3. EXPERIENCE ---
const Experience = ({ data, handleChange, onBack, onNext }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">💼 <span className="border-b-2 border-cyan-500 pb-1">Experience</span></h2>
    <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
            <input type="text" name="company" value={data.company} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Job Role</label>
            <input type="text" name="role" value={data.role} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div><label className="text-xs font-bold text-slate-500 uppercase">Start Year</label><input type="text" name="expStart" value={data.expStart} onChange={handleChange} maxLength="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
             <div><label className="text-xs font-bold text-slate-500 uppercase">End Year</label><input type="text" name="expEnd" value={data.expEnd} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" /></div>
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea name="expDesc" value={data.expDesc} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
        </div>
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-lg font-medium">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 4. EXTRAS (SKILLS & CUSTOM) ---
const Extras = ({ data, handleChange, onBack, onNext, addSkill, removeSkill, addCustomSection, updateCustomSection, removeCustomSection }) => {
    const [skillInput, setSkillInput] = useState('');

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(skillInput);
            setSkillInput('');
        }
    };

    return (
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">🚀 <span className="border-b-2 border-cyan-500 pb-1">Skills & Extras</span></h2>
        
        {/* SKILLS CHIPS UI */}
        <div className="mb-6">
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Technical Skills (Type & Press Enter)</label>
             <div className="flex flex-wrap gap-2 mb-2 p-3 border border-slate-300 rounded focus-within:ring-2 focus-within:ring-cyan-500 bg-white">
                {data.skillsArray && data.skillsArray.map((skill, index) => (
                    <span key={index} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-slate-200">
                        {skill}
                        <button onClick={() => removeSkill(index)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
                    </span>
                ))}
                <input 
                    type="text" 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder={data.skillsArray.length === 0 ? "Type skill (e.g. React) & Enter" : ""} 
                    className="outline-none flex-grow min-w-[120px] bg-transparent text-sm"
                />
             </div>
        </div>
        
        <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 uppercase">Languages (Alphabets Only)</label>
            <input type="text" name="languages" value={data.languages} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>

        <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase">Certifications / Projects</label>
            <textarea name="certifications" value={data.certifications} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
        </div>

        {/* DYNAMIC CUSTOM SECTIONS */}
        <div className="pt-4 border-t border-slate-100">
             <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Custom Sections (e.g. Awards)</label>
             </div>
             {data.customSections.map((section, index) => (
                 <div key={section.id} className="mb-4 bg-slate-50 p-3 rounded border border-slate-200 relative group">
                     <button onClick={() => removeCustomSection(section.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 font-bold">×</button>
                     <input 
                        type="text" 
                        placeholder="Title (e.g. Achievement)" 
                        value={section.title} 
                        onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)} 
                        className="w-full p-2 border border-slate-300 rounded mb-2 text-sm font-bold focus:ring-1 focus:ring-cyan-500 outline-none" 
                     />
                     <textarea 
                        placeholder="Details..." 
                        value={section.desc} 
                        onChange={(e) => updateCustomSection(section.id, 'desc', e.target.value)} 
                        rows="2" 
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
                     ></textarea>
                 </div>
             ))}
             <button onClick={addCustomSection} className="text-sm font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 border border-cyan-600 rounded px-3 py-1 hover:bg-cyan-50 transition-colors">
                + Add Another Section
             </button>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
          <button onClick={onNext} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all font-bold w-full md:w-auto">✨ Generate Resume</button>
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
  
  // RESTORED TEMPLATE & COLOR OPTIONS
  const [themeColor, setThemeColor] = useState('cyan'); 
  const [templateMode, setTemplateMode] = useState('modern'); // 'modern' or 'classic'

  // INITIAL STATE
  const [resumeData, setResumeData] = useState({
    photo: null,
    fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', address: '', summary: '',
    university: '', degree: '', eduEnd: '', eduScore: '',
    type12: '12th', board12: '', stream12: '', year12: '', score12: '',
    board10: '', year10: '', score10: '',
    company: '', role: '', expStart: '', expEnd: '', expDesc: '',
    skillsArray: [], // Changed to Array for Chip UI
    languages: '', certifications: '',
    customSections: [{ id: 1, title: '', desc: '' }] // Array for Multiple Custom Sections
  });

  const [finalResume, setFinalResume] = useState({});

  // Theme Config
  const getThemeClasses = () => {
    switch (themeColor) {
        case 'cyan':    return { side: 'bg-[#0e7490]',  text: 'text-[#0e7490]',  border: 'border-[#0e7490]' };
        case 'slate':   return { side: 'bg-slate-800',   text: 'text-slate-800',   border: 'border-slate-800' };
        case 'indigo':  return { side: 'bg-indigo-700',  text: 'text-indigo-700',  border: 'border-indigo-700' };
        case 'rose':    return { side: 'bg-rose-700',    text: 'text-rose-700',    border: 'border-rose-700' };
        default:        return { side: 'bg-[#0e7490]',  text: 'text-[#0e7490]',  border: 'border-[#0e7490]' };
    }
  };
  const theme = getThemeClasses();

  // VALIDATION LOGIC
  const validateInput = (name, value) => {
    const currentYear = new Date().getFullYear();

    // 1. Strict Letters (Name, City, Language)
    if (['fullName', 'languages', 'address', 'city', 'university', 'degree', 'stream12'].includes(name)) {
        if (value === '') return '';
        if (/^[a-zA-Z\s,.\-/()]+$/.test(value)) {
            if (['fullName', 'city', 'university'].includes(name)) return capitalize(value);
            return value;
        }
        return null;
    }

    // 2. Job Title (Allows Alpha + Hyphen + Space) - RENAMED from Target Role
    if (name === 'jobTitle') {
        if (value === '') return '';
        if (/^[a-zA-Z\s\-]+$/.test(value)) return capitalize(value);
        return null;
    }

    // 3. Summary & Custom (Relaxed Validation for Numbers/Symbols)
    if (['summary', 'certifications', 'company', 'role'].includes(name)) return value; // Allow all

    // 4. Phone (10 Digits)
    if (name === 'phone') {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value)) return value.length <= 10 ? value : null;
        return null;
    }

    // 5. Years (No Future)
    if (['year10', 'year12', 'expStart'].includes(name)) {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value) && value.length <= 4) {
            if (value.length === 4 && parseInt(value) > currentYear) return null;
            return value;
        }
        return null;
    }
    
    // 6. End Years (Present allowed)
    if (['eduEnd', 'expEnd'].includes(name)) {
        if (value === '') return '';
        if (value.toLowerCase() === 'present') return 'Present'; 
        if (/^[0-9]+$/.test(value) && value.length <= 4) {
             if (value.length === 4 && parseInt(value) > currentYear + 6) return null;
             return value;
        }
        return null;
    }

    // 7. Scores
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
  };

  // SKILL HANDLERS
  const addSkill = (skill) => {
      if (skill && !resumeData.skillsArray.includes(skill)) {
          setResumeData({ ...resumeData, skillsArray: [...resumeData.skillsArray, skill] });
      }
  };
  const removeSkill = (index) => {
      const newSkills = resumeData.skillsArray.filter((_, i) => i !== index);
      setResumeData({ ...resumeData, skillsArray: newSkills });
  };

  // CUSTOM SECTION HANDLERS
  const addCustomSection = () => {
      const newId = resumeData.customSections.length + 1;
      setResumeData({ ...resumeData, customSections: [...resumeData.customSections, { id: newId, title: '', desc: '' }] });
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
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  const handleFinish = async () => {
    setIsGenerating(true);
    setTimeout(() => {
        setFinalResume(resumeData); // No AI processing needed for structure, just mapping
        setIsGenerating(false);
        setIsFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const downloadPDF = () => window.print();
  const editResume = () => setIsFinished(false);

  const getList = (text) => {
      if (!text) return [];
      return text.split(/,|\n/).map(item => item.trim()).filter(item => item.length > 0);
  };

  // --- RENDER RESUME ---
  const renderResumeContent = () => {
    const data = isFinished ? finalResume : resumeData;
    const langList = getList(data.languages);
    const certList = getList(data.certifications);

    // DYNAMIC LAYOUT: Sidebar (Modern) vs Top (Classic)
    const isModern = templateMode === 'modern';

    return (
        <div className={`bg-white shadow-2xl w-full mx-auto min-h-[1000px] flex items-stretch print:shadow-none print:w-full print:min-h-screen ${!isModern ? 'flex-col' : ''}`}>
             
            {/* SIDEBAR (Only for Modern) */}
            {isModern && (
                <div className={`${theme.side} w-[30%] text-white p-6 flex flex-col items-center min-h-full print:bg-white print:text-black print:border-r print:border-slate-200`} style={{backgroundColor: themeColor === 'cyan' ? '#0e7490' : undefined}}>
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
                    {data.skillsArray.length > 0 && (
                        <div className="w-full space-y-2 mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skillsArray.map((s, i) => <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">{s}</span>)}
                            </div>
                        </div>
                    )}
                    {langList.length > 0 && (
                        <div className="w-full space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">Languages</h3>
                            <ul className="text-sm space-y-2">
                                 {langList.map((l, i) => <li key={i} className="block border-b border-white/10 pb-1">{l}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div className={`${isModern ? 'w-[70%]' : 'w-full'} p-8 bg-white flex flex-col`}>
                
                {/* HEADER (If Classic Mode, show photo here) */}
                {!isModern && (
                    <div className="flex items-center gap-6 border-b-2 border-slate-100 pb-6 mb-6">
                         {data.photo && (
                            <div className="w-24 h-24 rounded-full border border-slate-200 overflow-hidden shrink-0">
                                <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                             <h1 className={`text-4xl font-extrabold uppercase ${theme.text} tracking-tight`}>{data.fullName || "YOUR NAME"}</h1>
                             {data.jobTitle && <p className="text-lg font-bold uppercase text-slate-500 tracking-widest mt-1">{data.jobTitle}</p>}
                             <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                                {data.email && <span>✉️ {data.email}</span>}
                                {data.phone && <span>📞 {data.phone}</span>}
                                {data.address && <span>📍 {data.address}</span>}
                             </div>
                        </div>
                    </div>
                )}

                {/* HEADER (If Modern Mode) */}
                {isModern && (
                    <div className="shrink-0 mb-6">
                        <h1 className="text-4xl font-extrabold uppercase text-slate-900 tracking-tight leading-none mb-2">{data.fullName || "YOUR NAME"}</h1>
                        {data.jobTitle && <p className={`text-lg font-bold uppercase tracking-widest ${theme.text}`}>{data.jobTitle}</p>}
                    </div>
                )}

                {/* SUMMARY */}
                {data.summary && (
                    <div className="mb-6">
                        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>Professional Summary</h3>
                        <p className="text-slate-700 text-sm leading-relaxed text-justify">{data.summary}</p>
                    </div>
                )}

                {/* EXPERIENCE */}
                {data.company && (
                    <div className="mb-6">
                        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-4 text-slate-800`}>Experience</h3>
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-slate-800 text-lg">{data.company}</h4>
                                <span className="text-xs font-bold text-slate-500">{data.expStart} - {data.expEnd}</span>
                            </div>
                            <p className={`${theme.text} font-semibold text-sm mb-2`}>{data.role}</p>
                            <p className="text-slate-700 whitespace-pre-line text-sm">{data.expDesc}</p>
                        </div>
                    </div>
                )}

                {/* EDUCATION */}
                <div className="mb-6">
                    <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-4 text-slate-800`}>Education</h3>
                    {data.university && (
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-slate-800">{data.degree}</h4>
                                <span className="text-xs font-bold text-slate-500">{data.eduEnd}</span>
                            </div>
                            <p className="text-sm text-slate-600">{data.university}</p>
                            {data.eduScore && <p className="text-xs text-slate-500 mt-1">Score: {data.eduScore}</p>}
                        </div>
                    )}
                    {(data.board12 || data.stream12) && (
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-slate-800">{data.type12 === 'diploma' ? 'Diploma' : 'Class 12th'}</h4>
                                <span className="text-xs font-bold text-slate-500">{data.year12}</span>
                            </div>
                            {data.board12 && <p className="text-sm text-slate-600 italic">{data.board12}</p>}
                            {data.stream12 && <p className="text-sm text-slate-600">{data.stream12}</p>}
                        </div>
                    )}
                    {data.board10 && (
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-slate-800">Class 10th</h4>
                                <span className="text-xs font-bold text-slate-500">{data.year10}</span>
                            </div>
                            <p className="text-sm text-slate-600 italic">{data.board10}</p>
                        </div>
                    )}
                </div>

                {/* EXTRAS */}
                {certList.length > 0 && (
                    <div className="mb-6">
                        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>Certifications</h3>
                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm leading-relaxed">
                            {certList.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                )}

                {/* CUSTOM SECTIONS */}
                {data.customSections.map((section) => (
                    section.title && (
                        <div key={section.id} className="mb-6">
                            <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>{section.title}</h3>
                            <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">{section.desc}</p>
                        </div>
                    )
                ))}

                {/* SKILLS FOR CLASSIC MODE (Bottom) */}
                {!isModern && data.skillsArray.length > 0 && (
                     <div className="mb-6 pt-4 border-t border-slate-100">
                        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>Technical Skills</h3>
                        <div className="flex flex-wrap gap-2">
                             {data.skillsArray.map((s, i) => <span key={i} className="bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">{s}</span>)}
                        </div>
                     </div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-['Inter'] pb-20 main-container">
      {/* HEADER */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">NX</div>
               <span className="font-bold text-xl text-slate-800">Novus<span className="text-cyan-600">X</span>.AI</span>
            </div>
            {isFinished && (
               <div className="flex items-center gap-4">
                   <button onClick={editResume} className="px-3 py-1 text-slate-600 text-sm font-medium border rounded hover:bg-slate-50">Edit Data</button>
                   <button onClick={downloadPDF} className="px-4 py-2 bg-slate-900 text-white font-medium rounded hover:bg-black text-sm shadow-md">Download PDF</button>
               </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isGenerating && (
            <div className="fixed inset-0 bg-white/90 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-600 mb-4"></div>
                <h2 className="text-2xl font-bold text-slate-800 animate-pulse">Building Resume...</h2>
            </div>
        )}

        {/* RESTORED TOOLBAR FOR TEMPLATE & COLOR */}
        {isFinished && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 mb-8 flex flex-col md:flex-row gap-6 items-center justify-center no-print">
                 <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Layout:</span>
                    <button onClick={() => setTemplateMode('modern')} className={`px-4 py-2 text-sm rounded-lg border ${templateMode === 'modern' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Modern (Sidebar)</button>
                    <button onClick={() => setTemplateMode('classic')} className={`px-4 py-2 text-sm rounded-lg border ${templateMode === 'classic' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Classic (Top)</button>
                 </div>
                 <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Color:</span>
                    <button onClick={() => setThemeColor('cyan')} className="w-8 h-8 rounded-full bg-[#0e7490] ring-2 ring-offset-2 ring-transparent hover:ring-slate-300"></button>
                    <button onClick={() => setThemeColor('slate')} className="w-8 h-8 rounded-full bg-slate-800 ring-2 ring-offset-2 ring-transparent hover:ring-slate-300"></button>
                    <button onClick={() => setThemeColor('indigo')} className="w-8 h-8 rounded-full bg-indigo-700 ring-2 ring-offset-2 ring-transparent hover:ring-slate-300"></button>
                    <button onClick={() => setThemeColor('rose')} className="w-8 h-8 rounded-full bg-rose-700 ring-2 ring-offset-2 ring-transparent hover:ring-slate-300"></button>
                 </div>
            </div>
        )}

        <div className={`grid gap-8 ${isFinished ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 lg:grid-cols-12'}`}>
          {!isFinished && (
            <div className="lg:col-span-5 space-y-6">
               <ProgressBar step={step} />
               {step === 1 && <PersonalDetails data={resumeData} handleChange={handleChange} onNext={nextStep} handleImageUpload={handleImageUpload} handleImageRemove={handleImageRemove} errors={errors} />}
               {step === 2 && <Education data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 3 && <Experience data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 4 && <Extras data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={handleFinish} addSkill={addSkill} removeSkill={removeSkill} addCustomSection={addCustomSection} updateCustomSection={updateCustomSection} removeCustomSection={removeCustomSection} />}
            </div>
          )}

          <div className={`${isFinished ? 'w-full max-w-[850px]' : 'lg:col-span-7'}`}>
             <div className="hidden lg:block sticky top-24 scale-90 origin-top-left">
                {renderResumeContent()}
             </div>
             {!isFinished && (
                 <button onClick={() => setShowPreviewModal(true)} className="lg:hidden fixed bottom-6 right-6 bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl z-40 border-2 border-white">👁️</button>
             )}
             {showPreviewModal && !isFinished && (
                <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col overflow-auto p-4">
                    <div className="flex justify-end mb-2"><button onClick={() => setShowPreviewModal(false)} className="text-white bg-red-500 rounded-full w-8 h-8 font-bold">×</button></div>
                    <div className="bg-white rounded overflow-hidden shadow-lg scale-50 origin-top">{renderResumeContent()}</div>
                </div>
             )}
             {isFinished && renderResumeContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;