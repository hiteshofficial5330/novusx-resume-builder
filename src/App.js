import React, { useState } from 'react';
import PersonalDetails from './components/PersonalDetails';
import Education from './components/Education';
import Experience from './components/Experience';
import Extras from './components/Extras';
import { generateEnhancedResume } from './utils/AIResumeGenerator';

function App() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // CONFIGURATION
  const [themeColor, setThemeColor] = useState('cyan'); 
  const [templateMode, setTemplateMode] = useState('fresh'); // 'fresh' or 'pro'
  const [layoutStyle, setLayoutStyle] = useState('modern'); // 'modern', 'classic', 'elegant', 'bold'

  const [resumeData, setResumeData] = useState({
    photo: null,
    fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', address: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
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

  // --- REUSABLE SECTIONS ---

  const EducationSec = ({ data }) => (
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

  const ExperienceSec = ({ data }) => data.company && (
    <div className="mb-6">
        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-4 text-slate-800`}>Experience</h3>
        <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-slate-800 text-lg">{data.company}</h4>
                <span className="text-xs font-bold text-slate-500">{data.expStart} - {data.expEnd}</span>
            </div>
            <p className={`${theme.text} font-semibold text-sm mb-2`}>{data.role}</p>
            {isFinished && data.expDescFormatted ? (
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-sm leading-relaxed">
                    {data.expDescFormatted.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
            ) : (
                <p className="text-slate-700 whitespace-pre-line text-sm">{data.expDesc}</p>
            )}
        </div>
    </div>
  );

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

  const Summary = ({ data }) => data.summary && (
    <div className="mb-6">
        <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>About Me</h3>
        <p className="text-slate-700 text-sm leading-relaxed text-justify">{data.summary}</p>
    </div>
  );

  const MainContent = ({ data }) => (
    <>
        <Summary data={data} />
        {templateMode === 'fresh' ? (
            <>
                <EducationSec data={data} />
                <ExperienceSec data={data} />
            </>
        ) : (
            <>
                <ExperienceSec data={data} />
                <EducationSec data={data} />
            </>
        )}
    </>
  );

  // --- TEMPLATE 1: MODERN ---
  const renderModern = (data, skillsList, langList) => (
    <div className="bg-white shadow-2xl w-full max-w-[850px] mx-auto min-h-[1100px] flex items-stretch print:shadow-none print:w-full print:max-w-none print:min-h-screen">
        
        {/* Sidebar */}
        <div className={`${theme.side} w-[30%] text-white p-6 flex flex-col items-center min-h-full print:bg-white print:text-black print:border-r print:border-slate-200`} style={{backgroundColor: themeColor === 'cyan' ? '#0e7490' : undefined}}>
            
            {/* 1. Photo Section */}
            {data.photo && (
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden mb-6 shadow-md bg-white/20 flex items-center justify-center shrink-0">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
            )}

            {/* 2. Contact Section (Spaced Out) */}
            <div className="w-full space-y-4 text-sm mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3">Contact</h3>
                {data.email && <div className="break-all flex gap-2"><span>✉️</span> <span>{data.email}</span></div>}
                {data.phone && <div className="flex gap-2"><span>📞</span> <span>{data.phone}</span></div>}
                {data.address && <div className="flex gap-2"><span>📍</span> <span>{data.address}</span></div>}
                {data.linkedin && <div className="break-all flex gap-2"><span>🔗</span> <span>{data.linkedin.replace(/^https?:\/\//, '')}</span></div>}
            </div>

            {/* 3. Skills Section (Spaced Out) */}
            {skillsList.length > 0 && (
                <div className="w-full space-y-2 mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">{data.skillLabel || 'Technical Skills'}</h3>
                    <ul className="text-sm space-y-2">
                        {skillsList.map((s, i) => <li key={i} className="block border-b border-white/10 pb-1">{s}</li>)}
                    </ul>
                </div>
            )}

            {/* 4. Languages Section */}
            {langList.length > 0 && (
                <div className="w-full space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-2">Languages</h3>
                    <ul className="text-sm space-y-2">
                         {langList.map((l, i) => <li key={i} className="block border-b border-white/10 pb-1">{l}</li>)}
                    </ul>
                </div>
            )}
        </div>

        {/* Right Content */}
        <div className="w-[70%] p-8 bg-white flex flex-col min-h-[1100px] justify-between">
            <div className="flex flex-col gap-2">
                <div className="shrink-0 mb-6">
                    <h1 className="text-4xl font-extrabold uppercase text-slate-900 tracking-tight leading-none mb-2">{data.fullName || "Your Name"}</h1>
                    {data.jobTitle && <p className={`text-lg font-bold uppercase tracking-widest ${theme.text}`}>{data.jobTitle}</p>}
                </div>
                
                <MainContent data={data} />
                <CertsAndCustom data={data} />
            </div>
        </div>
    </div>
  );

  // --- TEMPLATE 2: CLASSIC ---
  const renderClassic = (data, skillsList, langList) => (
    <div className="bg-white shadow-2xl w-full max-w-[850px] mx-auto min-h-[1100px] p-10 flex flex-col print:shadow-none print:w-full print:max-w-none print:min-h-screen">
        <div className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-start">
            <div className="flex-1">
                <h1 className="text-4xl font-extrabold uppercase text-slate-900 tracking-tight leading-none mb-2">{data.fullName || "Your Name"}</h1>
                {data.jobTitle && <p className={`text-xl font-bold uppercase tracking-widest ${theme.text} mb-4`}>{data.jobTitle}</p>}
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
                    {data.email && <span>✉️ {data.email}</span>}
                    {data.phone && <span>📞 {data.phone}</span>}
                    {data.address && <span>📍 {data.address}</span>}
                    {data.linkedin && <span>🔗 {data.linkedin.replace(/^https?:\/\//, '')}</span>}
                </div>
            </div>
            {data.photo && (
                 <div className="w-24 h-24 rounded-md border border-slate-200 overflow-hidden shadow-sm shrink-0 ml-4">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="flex flex-col gap-6 flex-grow">
            
            <MainContent data={data} />

            {skillsList.length > 0 && (
                <div>
                     <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>{data.skillLabel || 'Technical Skills'}</h3>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {skillsList.map((s, i) => <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded border border-slate-200">{s}</span>)}
                     </div>
                </div>
            )}

            {langList.length > 0 && (
                <div className="mb-6">
                    <h3 className={`text-sm font-bold uppercase tracking-widest border-b-2 ${theme.border} pb-1 mb-3 text-slate-800`}>Languages</h3>
                    <p className="text-slate-700 text-sm">{langList.join(' • ')}</p>
                </div>
            )}

            <CertsAndCustom data={data} />
        </div>
    </div>
  );

  // --- TEMPLATE 3: ELEGANT ---
  const renderElegant = (data, skillsList, langList) => (
    <div className="bg-white shadow-2xl w-full max-w-[850px] mx-auto min-h-[1100px] p-12 flex flex-col print:shadow-none print:w-full print:max-w-none print:min-h-screen">
        <div className="text-center mb-10">
            {data.photo && (
                 <div className="w-28 h-28 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm mx-auto mb-4">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
            )}
            <h1 className="text-4xl font-serif text-slate-900 tracking-wide mb-2">{data.fullName || "Your Name"}</h1>
            {data.jobTitle && <p className={`text-lg uppercase tracking-widest ${theme.text} mb-4`}>{data.jobTitle}</p>}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.address && <span>{data.address}</span>}
                {data.linkedin && <span>🔗 {data.linkedin.replace(/^https?:\/\//, '')}</span>}
            </div>
            <div className="w-20 h-1 bg-slate-200 mx-auto mt-6"></div>
        </div>
        <div className="flex flex-col gap-8 flex-grow">
            <MainContent data={data} />
            <CertsAndCustom data={data} />
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                   <h3 className="text-xs font-bold uppercase mb-2">{data.skillLabel || 'Technical Skills'}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{skillsList.join(', ')}</p>
                </div>
                <div>
                   <h3 className="text-xs font-bold uppercase mb-2">Languages</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{langList.join(', ')}</p>
                </div>
            </div>
        </div>
    </div>
  );

  // --- TEMPLATE 4: BOLD ---
  const renderBold = (data, skillsList, langList) => (
    <div className="bg-white shadow-2xl w-full max-w-[850px] mx-auto min-h-[1100px] flex flex-col print:shadow-none print:w-full print:max-w-none print:min-h-screen">
        <div className={`${theme.bg} text-white p-10 flex justify-between items-center`} style={{backgroundColor: themeColor === 'cyan' ? '#0e7490' : undefined}}>
            <div>
                 <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-2">{data.fullName || "Your Name"}</h1>
                 {data.jobTitle && <p className="text-xl font-medium opacity-90">{data.jobTitle}</p>}
            </div>
            {data.photo && (
                 <div className="w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden shadow-lg">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        <div className="bg-slate-900 text-white p-4 flex flex-wrap gap-8 justify-center text-sm font-medium">
             {data.email && <span>✉️ {data.email}</span>}
             {data.phone && <span>📞 {data.phone}</span>}
             {data.address && <span>📍 {data.address}</span>}
             {data.linkedin && <span>🔗 {data.linkedin.replace(/^https?:\/\//, '')}</span>}
        </div>
        <div className="p-10 flex flex-col gap-8 flex-grow">
            <MainContent data={data} />
            <CertsAndCustom data={data} />
            <div className="p-6 bg-slate-50 rounded-xl">
                 <h3 className="text-sm font-bold uppercase mb-4 text-slate-800">Skills & Languages</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillsList.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">{data.skillLabel || 'Technical Skills'}</h4>
                            <div className="flex flex-wrap gap-2">
                                {skillsList.map((s, i) => <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-full">{s}</span>)}
                            </div>
                        </div>
                    )}
                    {langList.length > 0 && (
                        <div>
                             <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">Languages</h4>
                             <div className="flex flex-wrap gap-2">
                                {langList.map((l, i) => <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-full">{l}</span>)}
                             </div>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-['Inter'] pb-20 main-container">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* NEW BRANDING: NovusX.AI */}
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
               <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Choose Template</span>
                      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                          {['modern', 'classic', 'elegant', 'bold'].map((mode) => (
                              <button 
                                key={mode}
                                onClick={() => setLayoutStyle(mode)} 
                                className={`px-3 py-1 text-xs font-bold rounded-md capitalize transition-all ${layoutStyle === mode ? 'bg-white shadow text-slate-800 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                              >
                                {mode}
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className="flex flex-col items-end">
                       <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Layout & Color</span>
                       <div className="flex gap-4 items-center">
                           <div className="flex bg-slate-100 p-1 rounded-lg">
                               <button onClick={() => setTemplateMode('fresh')} className={`px-2 py-1 text-xs font-bold rounded ${templateMode === 'fresh' ? 'bg-white shadow' : 'text-slate-500'}`}>Fresher</button>
                               <button onClick={() => setTemplateMode('pro')} className={`px-2 py-1 text-xs font-bold rounded ${templateMode === 'pro' ? 'bg-white shadow' : 'text-slate-500'}`}>Pro</button>
                           </div>
                           <div className="flex gap-2">
                               {['cyan', 'slate', 'indigo', 'rose'].map(c => (
                                   <button key={c} onClick={() => setThemeColor(c)} className={`w-5 h-5 rounded-full border ring-1 ${themeColor === c ? 'ring-offset-2 ring-slate-400' : 'ring-transparent'} ${c === 'cyan' ? 'bg-[#0e7490]' : `bg-${c}-700`}`}></button>
                               ))}
                           </div>
                       </div>
                  </div>
               </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {isGenerating && (
            <div className="fixed inset-0 bg-white/90 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0e7490] mb-4"></div>
                <h2 className="text-2xl font-bold text-slate-800 animate-pulse">Building Resume...</h2>
            </div>
        )}

        <div className={`grid gap-10 ${isFinished ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          {!isFinished ? (
            <div className="lg:col-span-5 space-y-6 form-section">
               {step === 1 && <PersonalDetails data={resumeData} handleChange={handleChange} onNext={nextStep} handleImageUpload={handleImageUpload} handleImageRemove={handleImageRemove} />}
               {step === 2 && <Education data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 3 && <Experience data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={nextStep} />}
               {step === 4 && <Extras data={resumeData} handleChange={handleChange} onBack={prevStep} onNext={handleFinish} />}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4 no-print max-w-[850px] mx-auto w-full">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">🎉</div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Resume Ready!</h2>
                        <p className="text-slate-500 text-sm">Choose a Template above.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={editResume} className="px-4 py-2 text-slate-600 font-medium hover:text-indigo-600 border border-slate-200 rounded-lg hover:bg-slate-50">Edit Data</button>
                    <button onClick={downloadPDF} className="px-6 py-2 bg-[#0e7490] text-white font-medium rounded-lg hover:opacity-90 shadow-md">Download PDF</button>
                </div>
            </div>
          )}

          <div className={isFinished ? 'w-full flex justify-center' : 'lg:col-span-7'}>
            <div className={`${isFinished ? '' : 'sticky top-24'} w-full`}>
               {(() => {
                   const data = isFinished ? finalResume : resumeData;
                   const skillsList = getList(isFinished ? (data.skillsFormatted?.join(',') || data.skills) : data.skills);
                   const langList = getList(data.languages);

                   switch(layoutStyle) {
                       case 'classic': return renderClassic(data, skillsList, langList);
                       case 'elegant': return renderElegant(data, skillsList, langList);
                       case 'bold': return renderBold(data, skillsList, langList);
                       default: return renderModern(data, skillsList, langList);
                   }
               })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;