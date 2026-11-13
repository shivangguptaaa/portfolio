export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  domain: string;
  badge: "PRODUCTION PLATFORM" | "LIVE WEB APP" | "RESEARCH CASE STUDY";
  description: string;
  whatItDoes: string[];
  whatItRefuses: string[]; // Strict limits / boundaries
  metrics: ProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  isBciInteractive?: boolean;
}

export interface Internship {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  badge?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  title: string;
  organization: string;
  detail: string;
}

export const PERSONAL_INFO = {
  name: "Shivang Gupta",
  handle: "shivangguptaaa",
  title: "Full Stack Developer & AI Engineer",
  headline: "AI THAT KNOWS ITS LIMITS",
  tagline: "High-performance full-stack platforms, deterministic AI boundaries, and biomedical DSP.",
  bio: "Computer Science Engineering student at JECRC Foundation, Jaipur (CGPA: 9.22). Experienced in building production-grade full-stack web platforms, machine learning pipelines, and clinical biomedical signal processing (EEG & BCI). SIH 2025 Top 10 Finalist.",
  phone: "(+91) 7610993308",
  email: "shivang2005gupta@gmail.com",
  github: "https://github.com/shivangguptaaa",
  linkedin: "https://linkedin.com/in/shivanggupta",
  leetcode: "https://leetcode.com/u/shivangguptaaa",
  location: "Jaipur, Rajasthan, India",
  timezone: "IST · UTC+5:30",
  status: "Open to Full Stack & AI Roles",
};

export const NUMBERS_TICKER = [
  { value: "9.22", label: "CGPA at JECRC" },
  { value: "Top 10", label: "Smart India Hackathon Finalist" },
  { value: "36", label: "Clinical EEG Subjects" },
  { value: "93%", label: "BCI Random Forest Acc" },
  { value: "99.2%", label: "CNN MNIST Accuracy" },
  { value: "9", label: "Public GitHub Repositories" },
  { value: "3", label: "Live Production Cloud Apps" },
  { value: "8", label: "Disaster Protocols Grounded" },
  { value: "3rd Prize", label: "MNIT Energy Hackathon" },
];

export const PROJECTS: Project[] = [
  {
    id: "aegis",
    index: "01 / 04",
    title: "Aegis Disaster Preparedness",
    subtitle: "Autonomous disaster management, live GDACS telemetry, and protocol-grounded RAG AI",
    domain: "Full-Stack • Autonomous Systems • RAG AI",
    badge: "PRODUCTION PLATFORM",
    liveUrl: "https://aegis-elvv.onrender.com",
    githubUrl: "https://github.com/shivangguptaaa/aegis",
    description:
      "A comprehensive institutional disaster response platform built for Smart India Hackathon 2025 (Top 10 Finalist). Integrates real-time geospatial satellite feeds from GDACS, autonomous emergency alert broadcasting, 8 interactive bilingual disaster safety modules, and an NDMA/FEMA protocol-grounded RAG chatbot.",
    whatItDoes: [
      "Polls GDACS GeoJSON satellite telemetry to detect and ingest active global disaster hazards in real time",
      "Institutional command center with campus-wide emergency broadcast dispatching via Nodemailer",
      "8 interactive disaster modules (Earthquake, Flood, Landslide, Tsunami, Drought, Cyclone, Heatwave, Fire)",
      "Gemini 2.5 Flash RAG chatbot grounded strictly in official NDMA & FEMA emergency checklists",
      "Bilingual 3D interactive flipbook safety manuals and persistent readiness scorecards on MongoDB Atlas"
    ],
    whatItRefuses: [
      "Never hallucinates medical triage: every emergency response strictly references official NDMA/FEMA protocols",
      "Never stores unhashed credentials or exposes student contact telemetry to unverified origins",
      "Zero single-point-of-failure: built-in Option 3 OTP fallback ensures zero campus registration lockouts"
    ],
    metrics: [
      { label: "Disaster Modules", value: "8 Complete" },
      { label: "AI Grounding", value: "NDMA/FEMA" },
      { label: "Deployment", value: "Render Live" },
      { label: "Hackathon", value: "SIH Top 10" }
    ],
    techStack: ["Node.js", "Express.js", "MongoDB Atlas", "Gemini 2.5 Flash", "GDACS API", "Vite", "Tailwind CSS", "GSAP"]
  },
  {
    id: "focus-jumper",
    index: "02 / 04",
    title: "Focus Jumper / NeuralFocus BCI",
    subtitle: "Closed-loop neurofeedback arcade game powered by clinical EEG spectral analysis",
    domain: "Neurotechnology • Biomedical DSP • ML Gaming",
    badge: "RESEARCH CASE STUDY",
    isBciInteractive: true,
    githubUrl: "https://github.com/shivangguptaaa/bci-model",
    description:
      "Built at Swaarogym Medical Devices (MIIC, MNIT Jaipur). A Brain-Computer Interface (BCI) system bridging clinical EEG brainwave processing and interactive game mechanics. Evaluates 36 subjects from the PhysioNet dataset, computing real-time Theta/Beta spectral ratios and Phase Locking Values (PLV) to power in-game jump mechanics via cognitive focus.",
    whatItDoes: [
      "Evaluates 36 clinical EEG subjects recorded at 500 Hz across 19 scalp channels (rest vs arithmetic)",
      "Extracts Welch's Power Spectral Density across Theta (4-8 Hz) and Beta (13-30 Hz) bands",
      "Computes Theta/Beta Ratio (TBR) as a neurobiological biomarker for cognitive attention",
      "Extracts functional inter-electrode connectivity via Alpha-band Phase Locking Value (PLV)",
      "Achieved 93% classification accuracy with Random Forest, driving closed-loop Pygame jump mechanics"
    ],
    whatItRefuses: [
      "Never fabricates synthetic brainwaves: all models trained exclusively on real clinical EDF recordings",
      "Rejects unfiltered raw EEG: enforces strict 1–40 Hz bandpass FIR filtering to eliminate 50 Hz powerline hum",
      "Zero cloud latency: model inference executes in under 2ms locally via joblib estimators without cloud egress"
    ],
    metrics: [
      { label: "Random Forest Acc", value: "93.0%" },
      { label: "Clinical Subjects", value: "36 PhysioNet" },
      { label: "DSP Metric", value: "Theta/Beta (TBR)" },
      { label: "Research Lab", value: "MNIT MIIC" }
    ],
    techStack: ["Python", "MNE-Python", "SciPy (Welch / Hilbert)", "Scikit-Learn", "Pygame", "NumPy", "Matplotlib"]
  },
  {
    id: "signalscale",
    index: "03 / 04",
    title: "SignalScale (Lead Scoring)",
    subtitle: "Real-time enterprise lead conversion scoring and predictive analytics engine",
    domain: "Predictive Analytics • Enterprise ML • MLOps",
    badge: "LIVE WEB APP",
    liveUrl: "https://lead-scoring-q7dj.onrender.com",
    githubUrl: "https://github.com/shivangguptaaa/lead-scoring",
    description:
      "A high-throughput predictive machine learning system designed to score inbound B2B sales leads in real time. Features gradient boosting classification, automated feature transformation pipelines, and dynamic conversion probability distribution gauges.",
    whatItDoes: [
      "Gradient Boosting model calibrated for calibrated conversion probabilities across lead cohorts",
      "Instant 3-tier lead classification: Hot (High Priority), Warm (Nurture), Cold (Low Propensity)",
      "Interactive Streamlit scoring workspace with real-time parameter tweaking and batch CSV uploads",
      "Automated outlier handling, missing value imputation, and categorical frequency encoding"
    ],
    whatItRefuses: [
      "Refuses uncalibrated raw logit outputs: enforces Platt probability calibration",
      "Zero customer PII leakage: all feature scalers run in-memory without persistent exfiltration",
      "Rejects unvalidated lead payloads missing core historical engagement heuristics"
    ],
    metrics: [
      { label: "Inference Latency", value: "<15ms" },
      { label: "Architecture", value: "Gradient Boost" },
      { label: "Deployment", value: "Render Live" },
      { label: "Segmentation", value: "3-Tier Cohorts" }
    ],
    techStack: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "NumPy", "Joblib", "Render Cloud"]
  },
  {
    id: "digit-recognition",
    index: "04 / 04",
    title: "Handwritten Digit Recognition",
    subtitle: "Real-time interactive canvas drawing and Convolutional Neural Network inference",
    domain: "Deep Learning • Computer Vision • Canvas DSP",
    badge: "LIVE WEB APP",
    liveUrl: "https://handwritten-digit-recognition-1mv5.onrender.com",
    githubUrl: "https://github.com/shivangguptaaa/handwritten-digit-recognition",
    description:
      "An interactive web-based deep learning application that performs real-time classification of hand-drawn digits. Features custom client-side bounding box normalization, center-of-mass centering, and top-3 softmax confidence distribution visualization.",
    whatItDoes: [
      "Custom Convolutional Neural Network (CNN) trained with spatial dropout and batch normalization",
      "High-performance HTML5 raster canvas with brush smoothing and bounding box extraction",
      "Bi-cubic image downsampling matching MNIST 28x28 grayscale feature distributions",
      "Real-time top-3 prediction visualizer with live probability confidence bars"
    ],
    whatItRefuses: [
      "Refuses blind resizing: enforces center-of-mass translation to preserve digit morphology",
      "Zero tracking cookies or external canvas telemetry: drawn strokes are evaluated entirely ephemeral",
      "Strict input rejection for empty or single-pixel artifact canvases"
    ],
    metrics: [
      { label: "Test Accuracy", value: "99.2%" },
      { label: "Downsampling", value: "28x28 Centroid" },
      { label: "Deployment", value: "Render Live" },
      { label: "Confidence", value: "Softmax Top-3" }
    ],
    techStack: ["Python", "PyTorch / CNN", "HTML5 Canvas", "Flask / REST", "NumPy", "CSS3"]
  }
];

export const INTERNSHIPS: Internship[] = [
  {
    role: "Data Science Intern",
    company: "Celebal Technologies",
    location: "Jaipur, India",
    period: "May 2026 – Jul 2026",
    badge: "Celebal Excellence Internship",
    description: [
      "Selected for the prestigious Celebal Excellence Internship (CEI) in the Data Science domain.",
      "Working on enterprise data preprocessing, machine learning, and real-world data science projects using Python.",
      "Applying advanced exploratory data analysis, feature engineering, and model development techniques on industry-oriented datasets."
    ]
  },
  {
    role: "Summer Research Intern — AI & ML in Healthcare",
    company: "MNIT Jaipur (Malaviya National Institute of Technology)",
    location: "Jaipur, India",
    period: "Jun 2025 – Jul 2025",
    badge: "Academic Research",
    description: [
      "Learned and implemented machine learning techniques on healthcare datasets using Python and Scikit-learn under academic mentorship.",
      "Conducted data preprocessing, biomarker feature extraction, model training, and performance evaluation for healthcare diagnostic workflows.",
      "Gained hands-on exposure to clinical classification models, ROC-AUC calibration, and medical AI pipelines."
    ]
  },
  {
    role: "EEG Research & Machine Learning Engineer",
    company: "Swaarogym Medical Devices (MIIC, MNIT Jaipur)",
    location: "Jaipur, India",
    period: "Jun 2025 – Jul 2025",
    badge: "Medical Device Incubation",
    description: [
      "Built an EEG-based cognitive attention regulation system utilizing clinical multi-channel electroencephalogram signals.",
      "Extracted spectral theta-beta power ratios using Welch's method and trained SVM, Logistic Regression, and Random Forest models.",
      "Achieved 93% accuracy with Random Forest and integrated it into an interactive closed-loop brainwave-feedback arcade game."
    ]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    degree: "B. Tech in Computer Science and Engineering",
    institution: "JECRC Foundation",
    location: "Jaipur, Rajasthan",
    period: "2023 – Present",
    score: "CGPA: 9.22"
  },
  {
    degree: "Senior Secondary Education (CBSE Class XII)",
    institution: "Maheshwari Public School",
    location: "Jaipur, Rajasthan",
    period: "2023",
    score: "88.4%"
  },
  {
    degree: "Secondary Education (CBSE Class X)",
    institution: "Maheshwari Public School",
    location: "Jaipur, Rajasthan",
    period: "2021",
    score: "97.0%"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "ServiceNow Certified Application Developer (CAD)",
    issuer: "ServiceNow",
    date: "Jun 2026"
  },
  {
    name: "ServiceNow Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    date: "Jun 2026"
  },
  {
    name: "Fundamentals of Deep Learning",
    issuer: "NVIDIA Deep Learning Institute",
    date: "Mar 2026"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Student Head Coordinator",
    organization: "Aashayein - The Life Saviours",
    detail: "Managed and coordinated large-scale blood donation drives, emergency patient response campaigns, and student social initiatives across Rajasthan."
  },
  {
    title: "Top 10 Finalist (out of 250+ teams)",
    organization: "Smart India Hackathon 2025 (SIH)",
    detail: "Developed Aegis: Disaster Preparedness Platform for Colleges featuring live GDACS telemetry, 8 disaster modules, and NDMA RAG AI."
  },
  {
    title: "3rd Prize Winner",
    organization: "Energy Taskmaster Hackathon (MIIC, MNIT Jaipur)",
    detail: "Secured 3rd prize for innovative energy optimization and predictive modeling at MNIT Innovation & Incubation Centre (March 2024)."
  },
  {
    title: "International Committee Delegate",
    organization: "Model United Nations (MUN)",
    detail: "Represented Luxembourg (UN COPUOS) on space colonization & resource utilization, and Sweden (IMF Committee) on international de-dollarization."
  }
];

export const TECH_MATRIX = [
  { tech: "Python", aegis: false, bci: true, signal: true, mnist: true },
  { tech: "C++", aegis: false, bci: false, signal: false, mnist: false, core: true },
  { tech: "Node.js / Express.js", aegis: true, bci: false, signal: false, mnist: false },
  { tech: "MongoDB Atlas", aegis: true, bci: false, signal: false, mnist: false },
  { tech: "MNE-Python & DSP", aegis: false, bci: true, signal: false, mnist: false },
  { tech: "Scikit-Learn", aegis: false, bci: true, signal: true, mnist: false },
  { tech: "PyTorch / CNN", aegis: false, bci: false, signal: false, mnist: true },
  { tech: "Gemini 2.5 Flash RAG", aegis: true, bci: false, signal: false, mnist: false },
  { tech: "HTML5 Canvas Raster", aegis: false, bci: true, signal: false, mnist: true },
  { tech: "Pygame Neuro Engine", aegis: false, bci: true, signal: false, mnist: false },
  { tech: "Streamlit Workspace", aegis: false, bci: false, signal: true, mnist: false },
  { tech: "Render Cloud Hosting", aegis: true, bci: false, signal: true, mnist: true },
];

export const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "HTML5/CSS3"]
  },
  {
    title: "AI & Neurotech",
    skills: ["PyTorch", "Scikit-Learn", "MNE-Python", "SciPy DSP", "Welch PSD", "NumPy", "Pandas"]
  },
  {
    title: "Back-End & Cloud",
    skills: ["Node.js", "Express.js", "MongoDB Atlas", "REST APIs", "Streamlit", "Render", "Git/GitHub"]
  },
  {
    title: "Engineering Disciplines",
    skills: ["RAG Systems", "Closed-Loop BCI", "Geospatial Telemetry", "Calibrated ML", "Disaster AI"]
  }
];
