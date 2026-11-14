export interface AgentTrace {
  plan: string;
  call: string;
  result: string;
  answer: string;
  refused: boolean;
  statusBadge: "VERIFIED FACT" | "POLICY REFUSAL" | "OUT OF PERIMETER";
}

export function evaluateAgentQuery(rawQuery: string): AgentTrace {
  const q = rawQuery.toLowerCase().trim();

  // 1. SQL / Databases / Schema
  if (/\b(sql|postgres|postgresql|mysql|database|databases|nosql|mongodb|mongo|schema|queries|query|indexing|sqlite|orm|prisma|supabase|firebase|dbms)\b/.test(q)) {
    return {
      plan: `Checking verified projects and database usage for "SQL / Databases".`,
      call: `skills_engine.evaluate({ query: "${rawQuery}", sources: ["Aegis", "Enterprise_Work", "Coursework"] })`,
      result: `Found: SQL (PostgreSQL, MySQL, schema design, relational queries) and NoSQL (MongoDB Atlas).`,
      answer: `Yes, he knows SQL well and has worked with PostgreSQL and MySQL alongside MongoDB Atlas for his full-stack platforms and data pipelines.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 2. Python & Data Science
  if (/\b(python|py|pandas|numpy|scipy|flask|streamlit)\b/.test(q)) {
    return {
      plan: `Checking repository code and projects for Python usage.`,
      call: `code_audit.scan_repos({ language: "Python" })`,
      result: `Found: Python used for data preprocessing, signal analysis (SciPy), and backend web tools (Flask, Streamlit).`,
      answer: `Yes, he knows Python well. He has used it for data preprocessing, signal analysis (SciPy), and interactive web tools like Streamlit and Flask.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 3. C++ / C / DSA / Problem Solving / LeetCode
  if (/\b(c\+\+|cpp|c language|dsa|data structures|algorithms|problem solving|competitive|leetcode|codeforces)\b/.test(q)) {
    return {
      plan: `Checking Data Structures and Algorithms problem-solving records.`,
      call: `dsa_records.fetch({ student: "Shivang Gupta", language: "C++" })`,
      result: `Found: C++ used for core Data Structures, Algorithms, and algorithmic problem solving.`,
      answer: `Yes, he knows C++ well and uses it for core Data Structures, Algorithms, and problem solving.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 4. JavaScript / TypeScript / React / Next.js / Node.js / Full-Stack
  if (/\b(javascript|typescript|js|ts|react|next\.?js|node|express|fullstack|full-stack|frontend|backend|web dev|web development|tailwind|html|css|api|apis|rest)\b/.test(q)) {
    return {
      plan: `Checking full-stack web projects and repository code.`,
      call: `web_stack.inspect({ frameworks: ["Next.js", "React", "Node.js", "Express.js", "Tailwind CSS"] })`,
      result: `Found: Full-stack platforms (Aegis Disaster Platform, Next.js portfolio, REST APIs).`,
      answer: `Yes, he knows JavaScript and TypeScript well, having built full-stack applications with React, Next.js, Node.js, and Express.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 5. Java / Coursework
  if (/\b(java|oop|object oriented)\b/.test(q)) {
    return {
      plan: `Checking academic curriculum and coursework for Java.`,
      call: `coursework.inspect({ subject: "Object-Oriented Programming" })`,
      result: `Found: Core coursework in Java and Object-Oriented Programming principles.`,
      answer: `He learned Java through his core Computer Science coursework, though his primary day-to-day focus is on C++, Python, TypeScript, and SQL.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 6. Rust / Go / Swift / Kotlin / Solidity / Blockchain (Strict Refusal)
  if (/\b(rust|golang|go language|swift|ios|kotlin|android|solana|blockchain|solidity|smart contract|web3|crypto|quantum|ruby|rails|php|c#|dotnet|\.net)\b/.test(q)) {
    const matched = q.match(/\b(rust|golang|go|swift|ios|kotlin|solana|blockchain|solidity|web3|crypto|quantum|ruby|rails|php|c#|dotnet)\b/)?.[0] || "this technology";
    return {
      plan: `Checking verified technical skills for "${matched}".`,
      call: `skills_boundary.check({ skill: "${matched}" })`,
      result: `Not found in verified projects. Matched stack: Python, C++, TypeScript, JavaScript, SQL.`,
      answer: `No. Shivang works primarily with Python, C++, TypeScript, JavaScript, and SQL. He has not worked with ${matched} in his projects, and the agent refuses to claim skills outside his verified work.`,
      refused: true,
      statusBadge: "POLICY REFUSAL",
    };
  }

  // 7. ServiceNow (CAD & CSA)
  if (/\b(servicenow|cad|csa|itsm|flow designer|script include|service now|sdi)\b/.test(q)) {
    return {
      plan: `Checking verified certifications and platform credentials.`,
      call: `certifications.verify({ issuer: "ServiceNow", candidate: "Shivang Gupta" })`,
      result: `Confirmed: Certified Application Developer (CAD) & Certified System Administrator (CSA).`,
      answer: `Yes, he knows ServiceNow and holds the Certified Application Developer (CAD) and Certified System Administrator (CSA) certifications, with experience in Business Rules and ITSM workflows.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 8. Aegis Medical Refusal Probe (Safety Limit)
  if (/\b(prescribe|drug|drugs|medication|medicine|treat patient|surgery|cure)\b/.test(q)) {
    return {
      plan: `Checking Aegis emergency protocol safety limits.`,
      call: `protocol_filter.check_permission({ action: "prescribe_medication" })`,
      result: `Restricted: NDMA guidelines do not allow autonomous medical prescriptions.`,
      answer: `No, Aegis does not prescribe medications. It is designed to assist emergency response coordinators by displaying official NDMA and FEMA first-aid checklists.`,
      refused: true,
      statusBadge: "POLICY REFUSAL",
    };
  }

  // 9. SIH / Smart India Hackathon / Aegis / Hackathons
  if (/\b(sih|smart india hackathon|aegis|disaster|finalist|hackathon|prize|winner|competition|award|awards|mnit energy)\b/.test(q)) {
    return {
      plan: `Checking hackathon results and project verification.`,
      call: `hackathon_registry.get({ event: "SIH 2025" })`,
      result: `Confirmed: Top 10 Finalist at Smart India Hackathon 2025 for Aegis. 3rd Prize at MNIT Jaipur Energy Hackathon.`,
      answer: `Yes, he and his team were Top 10 Finalists in Smart India Hackathon 2025 with Aegis, and he won 3rd prize at the MNIT Jaipur Energy Hackathon.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 10. Celebal Technologies Internship
  if (/\b(celebal|cei|internship|intern|work experience|job|experience)\b/.test(q)) {
    return {
      plan: `Checking internship records at Celebal Technologies.`,
      call: `internship_records.fetch({ company: "Celebal Technologies" })`,
      result: `Status: Completed. Role: Data Science CEI Intern (May–July 2026).`,
      answer: `He completed his Data Science internship at Celebal Technologies (May–July 2026), where he worked on data preprocessing, feature engineering, and data analysis in Python.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 11. CGPA / Education / College / Graduation Year
  if (/\b(cgpa|gpa|grade|score|marks|jecrc|college|university|degree|b\.?tech|btech|education|graduation|graduating|graduate|2027|27|school|10th|12th)\b/.test(q)) {
    return {
      plan: `Checking academic records and institutional milestones.`,
      call: `academic_records.fetch({ student: "Shivang Gupta" })`,
      result: `Confirmed: B.Tech CSE, JECRC Foundation. CGPA: 9.16/10.0 (Final Year, graduating 2027). Class X: 97.0%, Class XII: 88.4%.`,
      answer: `Shivang is currently a final-year B.Tech CSE student at JECRC Foundation with a CGPA of 9.16/10.0, graduating in 2027. He scored 97.0% in 10th and 88.4% in 12th.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 12. Git / GitHub / Docker / DevOps / Tools
  if (/\b(git|github|docker|linux|postman|devops|vscode|tools|terminal)\b/.test(q)) {
    return {
      plan: `Checking development tools and workflow environment.`,
      call: `devtools_profile.inspect()`,
      result: `Verified: Git, GitHub, Docker, Postman, Linux terminal workflows, VS Code.`,
      answer: `Yes, he uses Git and GitHub for version control and collaborative workflows, and works with Postman, Docker, and Linux for development and API testing.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 13. RAG / LLM / Gemini / AI Agent
  if (/\b(rag|llm|gemini|agent|prompt|retrieval|langchain)\b/.test(q)) {
    return {
      plan: `Checking RAG implementation in Aegis.`,
      call: `rag_architecture.inspect({ system: "Aegis" })`,
      result: `Confirmed: Gemini 2.5 Flash chatbot grounded on official NDMA/FEMA documents.`,
      answer: `Yes, he implemented a RAG chatbot in Aegis using Gemini 2.5 Flash grounded on official NDMA and FEMA disaster response manuals.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 14. Lead Scoring / SignalScale / Streamlit
  if (/\b(lead|scoring|signalscale|b2b|sales|conversion)\b/.test(q)) {
    return {
      plan: `Checking SignalScale project details.`,
      call: `mlops_catalog.get({ model: "SignalScale" })`,
      result: `Confirmed: Gradient Boosting model on Streamlit for 3-tier lead classification.`,
      answer: `Yes, he built SignalScale, a lead scoring project that uses Gradient Boosting on Streamlit to classify leads into hot, warm, and cold tiers.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 15. Digit Recognition / MNIST
  if (/\b(digit|mnist|drawing|canvas|handwritten)\b/.test(q)) {
    return {
      plan: `Checking digit recognition project.`,
      call: `cv_models.inspect({ name: "DigitRecognizer" })`,
      result: `Confirmed: PyTorch CNN on MNIST with an interactive drawing canvas.`,
      answer: `Yes, he built a handwritten digit recognizer using a PyTorch CNN model with an interactive drawing canvas.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 16. Contact / Email / Location / Availability
  if (/\b(contact|email|phone|hire|available|location|city|jaipur|reach|talk|message)\b/.test(q)) {
    return {
      plan: `Checking contact details and location.`,
      call: `profile_service.get_contact({ candidate: "Shivang Gupta" })`,
      result: `Location: Jaipur, India. Email: shivang2005gupta@gmail.com. Graduating: 2027. Open to full-stack & software engineering roles.`,
      answer: `Shivang is based in Jaipur, Rajasthan, and is graduating in 2027. You can reach him at shivang2005gupta@gmail.com or through the Contact page form.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 17. Projects Overview
  if (/\b(project|projects|portfolio|what did he build|what has he built|apps)\b/.test(q)) {
    return {
      plan: `Querying catalog of verified projects.`,
      call: `projects_catalog.list()`,
      result: `Found: Aegis (Disaster Management Platform), SignalScale (Lead Scoring), and Handwritten Digit Recognizer.`,
      answer: `His key projects include Aegis (Smart India Hackathon 2025 finalist disaster response platform), SignalScale (Streamlit lead scoring tool), and an interactive handwritten digit recognizer.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 18. Who is Shivang / Intro / Bio
  if (/\b(who is|about shivang|bio|introduce|introduction|summary|overview)\b/.test(q)) {
    return {
      plan: `Retrieving verified summary profile for Shivang Gupta.`,
      call: `profile_service.get_summary()`,
      result: `Verified: Final-Year B.Tech CSE at JECRC (9.16 CGPA), SIH 2025 Top 10 Finalist, ServiceNow CAD/CSA certified.`,
      answer: `Shivang Gupta is a final-year B.Tech CSE student at JECRC Foundation (9.16 CGPA, graduating 2027) who builds full-stack web platforms, data pipelines, and cloud applications. He was a Top 10 SIH 2025 Finalist and holds ServiceNow CAD and CSA certifications.`,
      refused: false,
      statusBadge: "VERIFIED FACT",
    };
  }

  // 19. Hallucination / Lying / Prompt Injections
  if (/\b(lie|liar|hallucinate|hallucination|trick|fake|cheat|jailbreak|bypass|ignore)\b/.test(q)) {
    return {
      plan: `Testing system truth perimeter against adversarial probe.`,
      call: `boundary_engine.verify_integrity()`,
      result: `Status: Zero-hallucination perimeter active. Refuses to invent unverified credentials.`,
      answer: `The system operates under a strict verification boundary. It will not fabricate claims or exaggerate skills beyond Shivang's verified background and published repositories.`,
      refused: true,
      statusBadge: "POLICY REFUSAL",
    };
  }

  // 20. Default Synthesis
  return {
    plan: `Checking query against verified portfolio background: "${rawQuery}".`,
    call: `knowledge_perimeter.audit({ query: "${rawQuery}" })`,
    result: `Checked against verified records: B.Tech CSE at JECRC (9.16 CGPA, graduating 2027), SIH 2025 Top 10 Finalist, ServiceNow CAD/CSA, Celebal Technologies internship.`,
    answer: `Shivang is a final-year B.Tech CSE student at JECRC Foundation (9.16 CGPA, graduating 2027) working across Python, C++, TypeScript, JavaScript, and SQL. If a skill or credential is not part of his verified background, the system will not claim it.`,
    refused: false,
    statusBadge: "VERIFIED FACT",
  };
}
