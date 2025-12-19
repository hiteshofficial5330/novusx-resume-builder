/// src/utils/AIResumeGenerator.js

export const generateEnhancedResume = (formData) => {
    // 1. Auto-Capitalize Helper
    const capitalize = (str) => {
      if (!str) return '';
      return str.replace(/\b\w/g, char => char.toUpperCase());
    };
  
    // 2. Smart Bullet Point Formatter
    const formatBullets = (text) => {
      if (!text) return [];
      // Split by newline or comma, filter empty, and trim
      return text.split(/,|\n/).map(item => item.trim()).filter(item => item.length > 0);
    };
  
    // 3. Process the Data
    return {
      ...formData,
      // Enhanced Fields
      fullName: capitalize(formData.fullName),
      jobTitle: capitalize(formData.jobTitle).toUpperCase(),
      city: capitalize(formData.city),
      university: capitalize(formData.university),
      degree: capitalize(formData.degree),
      company: capitalize(formData.company),
      role: capitalize(formData.role),
      
      // Formatted Lists
      skills: formData.skills, // Kept as string for the UI to handle, or processed if needed
      summary: formData.summary || `A dedicated ${formData.jobTitle || 'Professional'} with experience in ${formData.skills ? formData.skills.split(',')[0] : 'modern technologies'}.`,
    };
  };