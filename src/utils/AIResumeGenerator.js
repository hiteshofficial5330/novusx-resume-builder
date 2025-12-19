// This file simulates the AI Career Coach logic

export const generateEnhancedResume = (rawData) => {
  // Helper: Capitalize first letter of every word
  const capitalize = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper: Turn raw text into Bullet Points
  const formatBulletPoints = (text) => {
    if (!text) return [];
    const rawBullets = text.split(/\n|\. /); 
    return rawBullets
      .filter((b) => b.trim().length > 5)
      .map((b) => {
        let cleanB = b.trim();
        cleanB = cleanB.replace(/^[•\-*]\s*/, ""); 
        return cleanB.charAt(0).toUpperCase() + cleanB.slice(1);
      });
  };

  // --- AI LOGIC: ENHANCE THE DATA ---
  return {
    ...rawData,
    fullName: capitalize(rawData.fullName),
    jobTitle: capitalize(rawData.jobTitle).toUpperCase(), 
    
    // FIX: ONLY use user input. No random AI text.
    summary: rawData.summary ? rawData.summary : "",

    // Enhance Experience
    company: capitalize(rawData.company),
    role: capitalize(rawData.role),
    expDescFormatted: formatBulletPoints(rawData.expDesc),

    // Enhance Education
    university: capitalize(rawData.university),
    degree: capitalize(rawData.degree),
    
    // Enhance Skills
    skillsFormatted: rawData.skills 
      ? rawData.skills.split(",").map(s => s.trim().toUpperCase()) 
      : [],
      
    // Links
    linkedin: rawData.linkedin?.startsWith("http") ? rawData.linkedin : (rawData.linkedin ? `https://${rawData.linkedin}` : ""),
    website: rawData.website?.startsWith("http") ? rawData.website : (rawData.website ? `https://${rawData.website}` : ""),
  };
};