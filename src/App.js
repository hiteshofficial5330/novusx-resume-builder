import React, { useState, useEffect } from 'react';
import { generateEnhancedResume } from './utils/AIResumeGenerator';

// --- MASTER DATA: INDIAN BOARDS LIST ---
const BOARDS_LIST = [
  // National
  { value: 'CBSE', label: 'CBSE - Central Board of Secondary Education' },
  { value: 'CISCE', label: 'CISCE - Council for Indian School Certificate (ICSE/ISC)' },
  { value: 'NIOS', label: 'NIOS - National Institute of Open Schooling' },
  { value: 'IB', label: 'IB - International Baccalaureate' },
  // North
  { value: 'UPMSP', label: 'UP Board - Uttar Pradesh Madhyamik Shiksha Parishad' },
  { value: 'HBSE', label: 'HBSE - Board of School Education Haryana' },
  { value: 'PSEB', label: 'PSEB - Punjab School Education Board' },
  { value: 'HPBOSE', label: 'HPBOSE - Himachal Pradesh Board of School Education' },
  { value: 'JKBOSE', label: 'JKBOSE - J&K State Board of School Education' },
  { value: 'RBSE', label: 'RBSE - Board of Secondary Education Rajasthan' },
  // West & Central
  { value: 'MSBSHSE', label: 'Maharashtra State Board (MSBSHSE)' },
  { value: 'GSEB', label: 'GSEB - Gujarat Secondary & Higher Secondary Board' },
  { value: 'MPBSE', label: 'MP Board - Madhya Pradesh Board of Secondary Education' },
  { value: 'CGBSE', label: 'CGBSE - Chhattisgarh Board of Secondary Education' },
  { value: 'GBSHSE', label: 'Goa Board of Secondary & Higher Secondary Education' },
  // East
  { value: 'WBBSE', label: 'West Bengal Board (WBBSE/WBCHSE)' },
  { value: 'BSEB', label: 'BSEB - Bihar School Examination Board' },
  { value: 'JAC', label: 'JAC - Jharkhand Academic Council' },
  { value: 'BSE-ODISHA', label: 'BSE/CHSE - Odisha Board' },
  // South
  { value: 'TNSB', label: 'Tamil Nadu State Board (TNSB)' },
  { value: 'KSEAB', label: 'Karnataka School Examination Board (SSLC/PUC)' },
  { value: 'AP-BOARD', label: 'Andhra Pradesh Board (BIEAP/BSEAP)' },
  { value: 'TSBIE', label: 'Telangana State Board (TSBIE)' },
  { value: 'KBPE', label: 'Kerala Board (Pareeksha Bhavan)' },
  // North East
  { value: 'SEBA', label: 'Assam Board (SEBA/AHSEC)' },
  { value: 'MBOSE', label: 'Meghalaya Board of School Education' }
];

// --- HELPER: AUTO-CAPITALIZE ---
const capitalize = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// --- COMPONENT: PROGRESS BAR ---
const ProgressBar = ({ step }) => (
  <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
    <div 
      className="bg-[#0e7490] h-full transition-all duration-500 ease-out" 
      style={{ width: `${step * 25}%` }}
    ></div>
  </div>
);

// --- COMPONENT: 1. PERSONAL DETAILS ---
const PersonalDetails = ({ data, handleChange, onNext, handleImageUpload, handleImageRemove, errors }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      👤 <span className="border-b-2 border-cyan-500 pb-1">Personal Details</span>
    </h2>
    
    <div className="flex flex-col md:flex-row gap-6 mb-6 items-center">
      {/* Photo Upload */}
      <div className="relative group shrink-0">
         <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
            {data.photo ? (
                <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <span className="text-3xl text-slate-300">📷</span>
            )}
         </div>
         <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
         {data.photo && (
             <button onClick={handleImageRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm hover:bg-red-600">×</button>
         )}
         <p className="text-[10px] text-center text-slate-400 mt-2">Tap to Upload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Target Role</label>
            <input type="text" name="jobTitle" value={data.jobTitle} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="" className={`w-full p-3 border rounded focus:ring-2 outline-none transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:ring-cyan-500'}`} />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ Invalid Email Format</p>}
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Phone (10 Digits)</label>
            <div className="relative">
                <input type="tel" name="phone" value={data.phone} onChange={handleChange} maxLength="10" placeholder="" className={`w-full p-3 border rounded focus:ring-2 outline-none transition-all ${data.phone.length === 10 ? 'border-green-500 ring-1 ring-green-200' : 'border-slate-300 focus:ring-cyan-500'}`} />
                {data.phone.length === 10 && <span className="absolute right-3 top-3 text-green-500 text-sm">✅</span>}
            </div>
        </div>
        <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Address / City</label>
            <input type="text" name="address" value={data.address} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
        </div>
         <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">LinkedIn URL</label>
            <input type="text" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
        </div>
      </div>
    </div>
    
    <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase">Professional Summary</label>
        <textarea name="summary" value={data.summary} onChange={handleChange} rows="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none transition-all"></textarea>
    </div>

    <div className="flex justify-end">
      <button onClick={onNext} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-lg flex items-center gap-2 font-medium w-full md:w-auto justify-center">
         Next Step <span>→</span>
      </button>
    </div>
  </div>
);

// --- COMPONENT: 2. EDUCATION ---
const Education = ({ data, handleChange, onBack, onNext }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      🎓 <span className="border-b-2 border-cyan-500 pb-1">Education</span>
    </h2>

    {/* College / Degree */}
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Highest Qualification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">University / College Name</label>
                <input type="text" name="university" value={data.university} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Degree</label>
                <input type="text" name="degree" value={data.degree} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Pass Year</label>
                    <input type="text" name="eduEnd" value={data.eduEnd} onChange={handleChange} maxLength="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">CGPA / %</label>
                    <input type="text" name="eduScore" value={data.eduScore} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>
        </div>
    </div>

    {/* Class 12th / Diploma */}
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Class 12th / Diploma</h3>
            <div className="flex bg-white rounded-md border border-slate-300 overflow-hidden">
                <button onClick={() => handleChange({ target: { name: 'type12', value: '12th' } })} className={`px-3 py-1 text-xs font-bold ${data.type12 === '12th' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>12th</button>
                <button onClick={() => handleChange({ target: { name: 'type12', value: 'diploma' } })} className={`px-3 py-1 text-xs font-bold ${data.type12 === 'diploma' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Diploma</button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">{data.type12 === '12th' ? 'Board Name' : 'University / Institute'}</label>
                {data.type12 === '12th' ? (
                     <select name="board12" value={data.board12} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
                        <option value="">Select Board</option>
                        {BOARDS_LIST.map((b, i) => <option key={i} value={b.label}>{b.label}</option>)}
                     </select>
                ) : (
                     <input type="text" name="board12" value={data.board12} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                )}
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Stream / Branch</label>
                <input type="text" name="stream12" value={data.stream12} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="text" name="year12" value={data.year12} onChange={handleChange} maxLength="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Percentage</label>
                    <input type="text" name="score12" value={data.score12} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>
        </div>
    </div>

    {/* Class 10th */}
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
                    <input type="text" name="year10" value={data.year10} onChange={handleChange} maxLength="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Percentage</label>
                    <input type="text" name="score10" value={data.score10} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
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
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      💼 <span className="border-b-2 border-cyan-500 pb-1">Experience / Internship</span>
    </h2>
    
    <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
            <input type="text" name="company" value={data.company} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Job Role / Designation</label>
            <input type="text" name="role" value={data.role} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Start Year</label>
                <input type="text" name="expStart" value={data.expStart} onChange={handleChange} maxLength="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase">End Year (or 'Present')</label>
                <input type="text" name="expEnd" value={data.expEnd} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
        </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Description (What did you do?)</label>
            <textarea name="expDesc" value={data.expDesc} onChange={handleChange} rows="4" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
            <p className="text-[10px] text-slate-400 mt-1">Tip: Use bullet points for better readability.</p>
        </div>
    </div>

    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-lg font-medium">Next Step →</button>
    </div>
  </div>
);

// --- COMPONENT: 4. EXTRAS ---
const Extras = ({ data, handleChange, onBack, onNext }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-slate-200 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      🚀 <span className="border-b-2 border-cyan-500 pb-1">Skills & Extras</span>
    </h2>
    
    <div className="space-y-4 mb-6">
         <div>
            <div className="flex justify-between items-baseline mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Technical Skills</label>
                <input type="text" name="skillLabel" value={data.skillLabel} onChange={handleChange} placeholder="Custom Title" className="text-xs border-b border-slate-300 focus:border-cyan-500 outline-none text-right w-32 bg-transparent" />
            </div>
            <textarea name="skills" value={data.skills} onChange={handleChange} rows="2" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
            <p className="text-[10px] text-slate-400">Separate with commas.</p>
        </div>
        
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Languages Known (Alphabets Only)</label>
            <input type="text" name="languages" value={data.languages} onChange={handleChange} placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>

        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Certifications / Projects</label>
            <textarea name="certifications" value={data.certifications} onChange={handleChange} rows="3" placeholder="" className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100">
             <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Custom Section (Optional)</label>
             <input type="text" name="customTitle" value={data.customTitle} onChange={handleChange} placeholder="Section Title" className="w-full p-3 border border-slate-300 rounded mb-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
             <textarea name="customDesc" value={data.customDesc} onChange={handleChange} rows="2" placeholder="Details..." className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
        </div>
    </div>

    <div className="flex justify-between mt-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-bold px-4">← Back</button>
      <button onClick={onNext} className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all font-bold tracking-wide w-full md:w-auto">
        ✨ Generate Resume
      </button>
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---

function App() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false); // For Mobile Preview
  
  // CONFIGURATION
  const [themeColor, setThemeColor] = useState('cyan'); 
  const [templateMode, setTemplateMode] = useState('fresh');
  const [layoutStyle, setLayoutStyle] = useState('modern'); 

  // --- INITIAL STATE: ALL BLANK ---
  const [resumeData, setResumeData] = useState({
    photo: null,
    fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', address: '', summary: '',
    university: '', degree: '', eduEnd: '', eduScore: '',
    type12: '12th',
    board12: '', stream12: '', year12: '', score12: '',
    board10: '', year10: '', score10: '',
    company: '', role: '', expStart: '', expEnd: '', expDesc: '',
    skills: '', skillLabel: 'Technical Skills',
    languages: '', certifications: '',
    customTitle: '', customDesc: ''
  });

  const [finalResume, setFinalResume] = useState({});

  // Theme Config
  const getThemeClasses = () => {
    switch (themeColor) {
        case 'cyan':    return { side: 'bg-[#0e7490]',  text: 'text-[#0e7490]',  border: 'border-[#0e7490]', bg: 'bg-[#0e7490]' };
        case 'slate':   return { side: 'bg-slate-800',   text: 'text-slate-800',   border: 'border-slate-800', bg: 'bg-slate-800' };
        case 'indigo':  return { side: 'bg-indigo-700',  text: 'text-indigo-700',  border: 'border-indigo-700', bg: 'bg-indigo-700' };
        case 'rose':    return { side: 'bg-rose-700',    text: 'text-rose-700',    border: 'border-rose-700', bg: 'bg-rose-700' };
        default:        return { side: 'bg-[#0e7490]',  text: 'text-[#0e7490]',  border: 'border-[#0e7490]', bg: 'bg-[#0e7490]' };
    }
  };
  const theme = getThemeClasses();

  // --- STRICT VALIDATION LOGIC ---
  const validateInput = (name, value) => {
    const currentYear = new Date().getFullYear(); // 2025

    // 1. Name & Languages & City: Letters only (and spaces/commas/hyphens)
    if (['fullName', 'languages', 'address', 'city', 'university', 'degree', 'stream12', 'role', 'company', 'customTitle', 'skillLabel'].includes(name)) {
        if (value === '') return '';
        // Allow letters, spaces, commas, dots, hyphens (for "Co-Founder" or "B.Tech")
        if (/^[a-zA-Z\s,.\-/()]+$/.test(value)) {
            // Auto-Capitalize Name & Job
            if (['fullName', 'jobTitle', 'city', 'university', 'company'].includes(name)) {
                return capitalize(value);
            }
            return value;
        }
        return null; // Reject numbers/symbols
    }

    // 2. Phone: Numbers only, Max 10
    if (name === 'phone') {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value)) {
            if (value.length <= 10) return value;
        }
        return null;
    }

    // 3. Years (10th, 12th, ExpStart): Numbers only, Max 4, NO FUTURE YEARS
    if (['year10', 'year12', 'expStart'].includes(name)) {
        if (value === '') return '';
        if (/^[0-9]+$/.test(value)) {
            if (value.length <= 4) {
                // If they typed 4 digits, check if future
                if (value.length === 4 && parseInt(value) > currentYear) return null; // Block future
                return value;
            }
        }
        return null;
    }

    // 4. Future Degrees (Allow up to Current + 5 years)
    if (['eduEnd', 'expEnd'].includes(name)) {
        if (value === '') return '';
        if (value.toLowerCase() === 'present') return 'Present'; // Allow 'Present'
        if (/^[0-9]+$/.test(value)) {
             if (value.length <= 4) {
                 if (value.length === 4 && parseInt(value) > currentYear + 6) return null; // Limit future grad
                 return value;
             }
        }
        return null;
    }

    // 5. Percentages/Scores: Numbers, dot, %
    if (['score10', 'score12', 'eduScore'].includes(name)) {
        if (value === '') return '';
        if (/^[0-9.%]+$/.test(value)) return value;
        return null; 
    }

    // 6. Email: Allow typing, but validate format on render
    if (name === 'email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setErrors(prev => ({ ...prev, email: !isValid && value.length > 0 }));
        return value; 
    }

    // Default: Allow standard input for textareas
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Pass through Validator
    const validatedValue = validateInput(name, value);
    
    // If validator returns null, input is blocked. If not null, update state.
    if (validatedValue !== null) {
        setResumeData({ ...resumeData, [name]: validatedValue });
    }
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
        const enhancedData = generateEnhancedResume(resumeData);
        setFinalResume(enhancedData);
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

  // --- RESUME RENDERING LOGIC (Identical to previous perfect version) ---
  const MainContent = ({ data }) => {
    const ExperienceSec = data.company && (
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
    );

    const EducationSec = (
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
                    {data.score12 && <p className="text-xs text-slate-500 mt-1">Score: {data.score12}</p>}
                </div>
            )}
            {data.board10 && (
                <div className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800">Class 10th</h4>
                        <span className="text-xs font-bold text-slate-500">{data.year10}</span>
                    </div>
                    <p className="text-sm text-slate-600 italic">{data.board10}</p>
                    {data.score10 && <p className="text-xs text-slate-500 mt-1">Score: {data.score10}</p>}
                </div>
            )}
        </div>
    );

    return (
        <>
            {data.summary && (
                <div className="mb-6">
                    <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>About Me</h3>
                    <p className="text-slate-700 text-sm leading-relaxed text-justify">{data.summary}</p>
                </div>
            )}
            {templateMode === 'fresh' ? <>{EducationSec}{ExperienceSec}</> : <>{ExperienceSec}{EducationSec}</>}
        </>
    );
  };
  
  const CertsAndCustom = ({ data }) => {
     const certList = getList(data.certifications);
     return (
        <>
            {certList.length > 0 && (
                <div className="mb-6">
                    <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>Certificates & Projects</h3>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm leading-relaxed">
                        {certList.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </div>
            )}
            {data.customTitle && (
                <div className="mb-6">
                    <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>{data.customTitle}</h3>
                    <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">{data.customDesc}</p>
                </div>
            )}
        </>
     );
  };

  const renderResumeContent = () => {
    const data = isFinished ? finalResume : resumeData;
    const skillsList = getList(data.skills);
    const langList = getList(data.languages);

    return (
        <div className="bg-white shadow-2xl w-full mx-auto min-h-[1000px] flex items-stretch print:shadow-none print:w-full print:min-h-screen">
             {/* Sidebar */}
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
                {skillsList.length > 0 && (
                    <div className="w-full space-y-2 mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">{data.skillLabel || 'Technical Skills'}</h3>
                        <ul className="text-sm space-y-2">
                            {skillsList.map((s, i) => <li key={i} className="block border-b border-white/10 pb-1">{s}</li>)}
                        </ul>
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
            {/* Right */}
            <div className="w-[70%] p-8 bg-white flex flex-col justify-between">
                <div>
                    <div className="shrink-0 mb-6">
                        <h1 className="text-4xl font-extrabold uppercase text-slate-900 tracking-tight leading-none mb-2">{data.fullName || "YOUR NAME"}</h1>
                        {data.jobTitle && <p className={`text-lg font-bold uppercase tracking-widest ${theme.text}`}>{data.jobTitle}</p>}
                    </div>
                    <MainContent data={data} />
                    <CertsAndCustom data={data} />
                </div>
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
               <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg border border-slate-700">
                  <span className="bg-clip-text text-transparent bg-gradient-to-tr from-cyan-400 to-indigo-400">NX</span>
               </div>
               <div className="flex flex-col">
                   <span className="font-bold text-xl text-slate-800 tracking-tight leading-none font-['Outfit']">
                       Novus<span className="text-indigo-600">X</span>.AI
                   </span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                       Designed for Impact
                   </span>
               </div>
            </div>
            {isFinished && (
               <div className="flex items-center gap-4">
                   <button onClick={editResume} className="px-3 py-1 text-slate-600 text-sm font-medium border rounded hover:bg-slate-50">Edit</button>
                   <button onClick={downloadPDF} className="px-4 py-2 bg-[#0e7490] text-white font-medium rounded hover:opacity-90 text-sm">Download PDF</button>
               </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Loading Spinner */}
        {isGenerating && (
            <div className="fixed inset-0 bg-white/90 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0e7490] mb-4"></div>
                <h2 className="text-2xl font-bold text-slate-800 animate-pulse">Building Resume...</h2>
            </div>
        )}

        <div className={`grid gap-8 ${isFinished ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 lg:grid-cols-12'}`}>
          
          {/* LEFT COLUMN: FORM (Hidden if finished) */}
          {!isFinished && (
            <div className="lg:col-span-5 space-y-6">
               <ProgressBar step={step} />
               {step === 1 && <PersonalDetails data={resumeData} handleChange={handleChange} onNext={nextStep} handleImageUpload={handleImageUpload} handleImageRemove={handleImageRemove} errors={errors} />}
               {step === 2 && <Education data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 3 && <Experience data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 4 && <Extras data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={handleFinish} />}
            </div>
          )}

          {/* RIGHT COLUMN: PREVIEW */}
          <div className={`${isFinished ? 'w-full max-w-[850px]' : 'lg:col-span-7'}`}>
             
             {/* Desktop Preview (Sticky) */}
             <div className="hidden lg:block sticky top-24 scale-90 origin-top-left">
                {renderResumeContent()}
             </div>

             {/* Mobile Preview Button (Floating) */}
             {!isFinished && (
                 <button 
                    onClick={() => setShowPreviewModal(true)}
                    className="lg:hidden fixed bottom-6 right-6 bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl z-40 border-2 border-white"
                 >
                    👁️
                 </button>
             )}

             {/* Mobile Preview Modal */}
             {showPreviewModal && !isFinished && (
                <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col overflow-auto p-4">
                    <div className="flex justify-end mb-2">
                        <button onClick={() => setShowPreviewModal(false)} className="text-white bg-red-500 rounded-full w-8 h-8 font-bold">×</button>
                    </div>
                    <div className="bg-white rounded overflow-hidden shadow-lg scale-50 origin-top">
                        {renderResumeContent()}
                    </div>
                </div>
             )}

             {/* Final Finished View */}
             {isFinished && renderResumeContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;