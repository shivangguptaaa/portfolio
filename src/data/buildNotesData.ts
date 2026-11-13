export interface BuildMetric {
  value: string;
  label: string;
}

export interface BuildArchitectureItem {
  component: string;
  tech: string;
  role: string;
}

export interface BuildFeatureItem {
  name: string;
  detail: string;
}

export interface BuildLimitItem {
  rule: string;
  reason: string;
}

export interface BuildNote {
  id: string;
  index: number;
  total: number;
  title: string;
  domain: string;
  year: string;
  badge: string;
  summary: string;
  wontStamp: {
    prefix: string;
    text: string;
  };
  datasheet: {
    role: string;
    when: string;
    builtWith: string[];
    liveUrl?: string;
    githubUrl: string;
    docsUrl?: string;
    hostname: string;
  };
  whyItExists: string[];
  whatItDoes: {
    overview: string;
    features: BuildFeatureItem[];
  };
  whatItWontDo: {
    overview: string;
    limits: BuildLimitItem[];
  };
  howItWorks: {
    overview: string;
    architecture: BuildArchitectureItem[];
    deepDive: string[];
  };
  byTheNumbers: BuildMetric[];
  whatsNext: string[];
  nextProject: {
    id: string;
    title: string;
    subtitle: string;
    domain: string;
  };
}

export const BUILD_NOTES: Record<string, BuildNote> = {
  aegis: {
    id: "aegis",
    index: 1,
    total: 4,
    title: "Aegis Disaster Platform",
    domain: "Full-Stack • Autonomous Systems • RAG AI",
    year: "2025 – 2026",
    badge: "PRODUCTION PLATFORM",
    summary:
      "An emergency preparedness and response platform combining real-time global satellite hazard feeds, verified NDMA/FEMA protocol guidance, and multi-channel disaster alert coordination.",
    wontStamp: {
      prefix: "Won’t",
      text: "Never prescribes medical treatments autonomously and never operates outside verified NDMA/FEMA disaster protocols.",
    },
    datasheet: {
      role: "Lead Full Stack Architect (SIH 2025 Finalist)",
      when: "2025 – 2026 · Top 10 National Finalist",
      builtWith: [
        "Node.js",
        "Express.js",
        "MongoDB Atlas",
        "Gemini 2.5 Flash",
        "GDACS Satellite API",
        "Vite",
        "Tailwind CSS",
        "Leaflet.js",
        "Nodemailer",
        "GSAP",
      ],
      liveUrl: "https://aegis-elvv.onrender.com",
      githubUrl: "https://github.com/shivangguptaaa/aegis",
      hostname: "aegis-elvv.onrender.com",
    },
    whyItExists: [
      "During major natural disasters like earthquakes, flash floods, or cyclones, standard municipal portals and messaging channels experience critical bottlenecks. First responders and citizens struggle to separate unverified rumors from official safety protocols.",
      "Most emergency response applications are either static text archives or bloated portals that require heavy bandwidth and complex user onboarding. In emergency situations, every second spent navigating convoluted interfaces or deciphering unverified advice poses direct safety risks.",
      "Aegis was conceived and built for Smart India Hackathon 2025 to solve this exact communication breakdown: providing a unified, lightweight command center that synchronizes live satellite telemetry from GDACS with official government disaster management protocols.",
    ],
    whatItDoes: {
      overview:
        "Aegis unifies global satellite hazard ingestion, verified AI disaster advice, and multi-channel emergency broadcast dispatching into an accessible web platform.",
      features: [
        {
          name: "GDACS Satellite Telemetry Ingestion",
          detail:
            "Continuously polls and parses GeoJSON hazard telemetry from the Global Disaster Alert and Coordination System (GDACS), pinpointing real-time coordinates, severity levels, and impact radiuses on an interactive Leaflet map.",
        },
        {
          name: "Protocol-Grounded RAG Assistant",
          detail:
            "Integrates Google Gemini 2.5 Flash grounded strictly in official National Disaster Management Authority (NDMA) and FEMA emergency action manuals, answering emergency questions with zero medical hallucinations.",
        },
        {
          name: "8 Specialized Disaster Safety Modules",
          detail:
            "Dedicated interactive safety workflows for Earthquakes, Floods, Cyclones, Landslides, Tsunamis, Droughts, Heatwaves, and Fires with bilingual guidance and printable offline action checklists.",
        },
        {
          name: "Campus Emergency Broadcast Dispatcher",
          detail:
            "Institutional command interface allowing incident commanders to dispatch urgent safety bulletins, evacuation coordinates, and alert notices directly to registered students via Nodemailer.",
        },
        {
          name: "Fault-Tolerant Student Access",
          detail:
            "Built with multi-factor OTP fallbacks and resilient session caching on MongoDB Atlas so users in disrupted network environments never face login lockouts during active emergencies.",
        },
      ],
    },
    whatItWontDo: {
      overview:
        "Aegis enforces strict technical and ethical boundaries designed around disaster response safety standards.",
      limits: [
        {
          rule: "No Autonomous Medical Prescriptions",
          reason:
            "Aegis strictly refuses to recommend prescription medications, triage dosages, or chemical treatments. In life-threatening medical situations, it directs users exclusively to official emergency numbers and basic first-aid stabilization checklists.",
        },
        {
          rule: "No Unverified Rumor Ingestion",
          reason:
            "Hazard alerts are strictly accepted only from certified government and meteorological APIs (GDACS, IMD). Social media scraping or unverified crowd reports are rejected to eliminate panic-inducing false alarms.",
        },
        {
          rule: "Zero Plaintext Telemetry or Credential Storage",
          reason:
            "User credentials and campus contact telemetry are strictly hashed using bcrypt and isolated within secure MongoDB Atlas clusters with role-based access control.",
        },
      ],
    },
    howItWorks: {
      overview:
        "The architecture is organized as a decoupled full-stack platform with a performant Express REST backend and a responsive frontend client.",
      architecture: [
        {
          component: "Ingestion Worker",
          tech: "Node.js / GDACS GeoJSON API",
          role: "Polls active disaster feeds, computes alert severity thresholds, and caches spatial features in memory.",
        },
        {
          component: "RAG Safety Service",
          tech: "Gemini 2.5 Flash / NDMA Protocols",
          role: "Grounds user queries against indexed NDMA SOP guidelines using temperature 0.1 for high factual consistency.",
        },
        {
          component: "Data Layer",
          tech: "MongoDB Atlas / Mongoose",
          role: "Manages encrypted user records, institutional incident logs, and safety module progress metrics.",
        },
        {
          component: "Client Interface",
          tech: "Vite / Tailwind CSS / Leaflet",
          role: "Renders smooth 60fps geospatial maps, emergency action drawers, and offline-accessible checklist cards.",
        },
      ],
      deepDive: [
        "Geospatial Telemetry Processing: The server regularly polls GDACS GeoJSON feeds, filtering hazards by geographic bounding boxes and severity thresholds. Events are normalized into lightweight coordinates sent to client map layers without overloading mobile client bandwidth.",
        "Grounding Constraints: When a user queries the emergency AI assistant, the query is combined with official NDMA/FEMA procedural context in an isolated inference envelope. If an inquiry falls outside emergency preparedness (e.g. asking for specific pharmaceutical dosages), the model is instructed to output an explicit refusal and redirect to emergency helpline contacts.",
        "Resilient Offline Strategy: Disaster modules and emergency contact cards are cached using service worker storage, ensuring that users with spotty cell reception can still reference life-saving checklists.",
      ],
    },
    byTheNumbers: [
      { value: "Top 10", label: "SIH 2025 Finalist" },
      { value: "8", label: "Disaster Modules" },
      { value: "250+", label: "Teams Competed" },
      { value: "<200ms", label: "Hazard Telemetry Sync" },
    ],
    whatsNext: [
      "Offline SMS Gateway: Integrating Twilio/GSM hardware fallbacks to deliver alert dispatches to basic non-smartphone devices without active cellular internet.",
      "Community Crowdsourced Hazard Verification: Introducing peer-reviewed check-ins with multi-signature verification from nearby local authorities before surfacing hazard pins.",
    ],
    nextProject: {
      id: "signalscale",
      title: "SignalScale (Lead Scoring)",
      subtitle: "Enterprise lead conversion scoring and predictive analytics engine",
      domain: "Predictive Analytics • Enterprise ML • MLOps",
    },
  },

  signalscale: {
    id: "signalscale",
    index: 2,
    total: 4,
    title: "SignalScale (Lead Scoring)",
    domain: "Predictive Analytics • Enterprise ML • MLOps",
    year: "2026",
    badge: "LIVE WEB APP",
    summary:
      "A high-throughput predictive machine learning engine designed to score inbound B2B sales leads in real time, featuring calibrated conversion probabilities and 3-tier cohort segmentation.",
    wontStamp: {
      prefix: "Won’t",
      text: "Never outputs uncalibrated raw scores and never retains customer PII in persistent storage.",
    },
    datasheet: {
      role: "ML Engineer & Full Stack Developer",
      when: "2026 · Production Deployment",
      builtWith: [
        "Python",
        "Scikit-Learn",
        "Gradient Boosting",
        "Streamlit",
        "Pandas",
        "NumPy",
        "Joblib",
        "Render Cloud",
      ],
      liveUrl: "https://lead-scoring-q7dj.onrender.com",
      githubUrl: "https://github.com/shivangguptaaa/lead-scoring",
      hostname: "lead-scoring-q7dj.onrender.com",
    },
    whyItExists: [
      "In B2B sales organizations, sales development reps spend up to 60% of their working hours manually triaging incoming leads, contacting unqualified prospects while high-value inbound opportunities grow cold.",
      "Traditional heuristic scoring (e.g. points for opening an email) fails to capture nonlinear feature interactions between company size, website visit dwell time, referral channels, and content engagement.",
      "SignalScale was built to replace brittle manual rule sets with a statistical, calibrated machine learning pipeline that classifies prospects into actionable Hot, Warm, and Cold tiers with sub-15ms inference latency.",
    ],
    whatItDoes: {
      overview:
        "An end-to-end ML scoring dashboard providing real-time inference, batch CSV scoring, and visual probability distributions.",
      features: [
        {
          name: "Calibrated Gradient Boosting Classifier",
          detail:
            "Trained on historical enterprise lead cohorts using Scikit-Learn's Gradient Boosting classifier with Platt scaling to guarantee that predicted scores reflect true empirical conversion rates.",
        },
        {
          name: "Instant 3-Tier Cohort Segmentation",
          detail:
            "Automatically groups leads into Hot (conversion prob > 70%), Warm (35–70%), and Cold (< 35%), providing immediate sales routing recommendations.",
        },
        {
          name: "Interactive Scoring Dashboard",
          detail:
            "Built with Streamlit, enabling revenue operations teams to tweak lead attributes via interactive sliders and immediately observe the model's prediction.",
        },
        {
          name: "Batch Enterprise CSV Upload",
          detail:
            "Allows sales teams to upload bulk prospect lists (10,000+ rows), transforming and scoring them in seconds with downloadable ranked priority sheets.",
        },
      ],
    },
    whatItWontDo: {
      overview:
        "The model and application adhere to strict data privacy and algorithmic transparency boundaries.",
      limits: [
        {
          rule: "No Uncalibrated Raw Logit Outputs",
          reason:
            "Raw boosting margins often distort probabilities toward extremes. SignalScale enforces probability calibration so an 80% score represents an actual 8 out of 10 conversion likelihood.",
        },
        {
          rule: "Zero Persistent Customer PII Storage",
          reason:
            "All batch CSV processing and slider adjustments occur strictly in transient memory. Uploaded customer records are discarded immediately after inference to prevent enterprise data leaks.",
        },
        {
          rule: "Rejects Incomplete Core Signals",
          reason:
            "The preprocessing pipeline rejects records lacking essential behavioral signals rather than silently substituting random averages.",
        },
      ],
    },
    howItWorks: {
      overview:
        "SignalScale structures lead evaluation through an automated preprocessing and scoring pipeline.",
      architecture: [
        {
          component: "Preprocessing Pipeline",
          tech: "Pandas / Scikit-Learn ColumnTransformer",
          role: "Handles median missing value imputation, robust scaling for continuous engagement features, and one-hot encoding.",
        },
        {
          component: "Classifier Model",
          tech: "Scikit-Learn GradientBoostingClassifier",
          role: "Evaluates multi-tree ensemble decision paths to compute conversion propensity.",
        },
        {
          component: "Probability Calibrator",
          tech: "CalibratedClassifierCV (Platt Sigmoid)",
          role: "Maps ensemble outputs into reliable posterior probabilities.",
        },
        {
          component: "Application UI",
          tech: "Streamlit / Python",
          role: "Renders real-time interactive gauges, distribution plots, and batch processing tables.",
        },
      ],
      deepDive: [
        "Feature Engineering: The pipeline derives key behavioral interaction signals including Page-Views-Per-Visit, Form-Completion-Velocity, and Lead-Source-Weights from raw telemetry before feeding vectors into the classifier.",
        "Calibration Verification: A reliability diagram (calibration curve) was computed across 5-fold cross-validation, aligning the Brier score to 0.082 to ensure business users can trust score tiers for financial forecasting.",
      ],
    },
    byTheNumbers: [
      { value: "<15ms", label: "Inference Latency" },
      { value: "3-Tier", label: "Cohort Routing" },
      { value: "0", label: "PII Records Stored" },
      { value: "10K+", label: "Batch CSV Rows/Min" },
    ],
    whatsNext: [
      "SHAP Value Explainability: Adding local SHAP waterfall plots so sales reps can see the top 3 positive and negative factors driving any individual lead's score.",
      "HubSpot & Salesforce Webhook Integration: Directly streaming scores into enterprise CRM pipelines via REST endpoints.",
    ],
    nextProject: {
      id: "digit-recognition",
      title: "Handwritten Digit Recognition",
      subtitle: "Interactive canvas drawing and Convolutional Neural Network inference",
      domain: "Computer Vision • Deep Learning • Canvas DSP",
    },
  },

  "digit-recognition": {
    id: "digit-recognition",
    index: 3,
    total: 4,
    title: "Handwritten Digit Recognition",
    domain: "Computer Vision • Deep Learning • Canvas DSP",
    year: "2026",
    badge: "LIVE WEB APP",
    summary:
      "A real-time deep learning web application combining an HTML5 drawing canvas, center-of-mass centroid normalization, and a PyTorch Convolutional Neural Network achieving 99.2% test accuracy.",
    wontStamp: {
      prefix: "Won’t",
      text: "Never evaluates noisy empty canvases and never relies on blind non-centered image resizing.",
    },
    datasheet: {
      role: "Deep Learning & Frontend Engineer",
      when: "2026 · Production Deployment",
      builtWith: [
        "PyTorch",
        "Python",
        "Flask",
        "HTML5 Canvas API",
        "NumPy",
        "SciPy (ndimage)",
        "Tailwind CSS",
        "Render Cloud",
      ],
      liveUrl: "https://handwritten-digit-recognition-1mv5.onrender.com",
      githubUrl: "https://github.com/shivangguptaaa/handwritten-digit-recognition",
      hostname: "handwritten-digit-recognition-1mv5.onrender.com",
    },
    whyItExists: [
      "While MNIST classification is a foundational machine learning benchmark, deploying an interactive live drawing interface reveals a major disconnect: hand-drawn browser strokes rarely match the tightly centered, normalized bounding boxes of academic datasets.",
      "Naive implementations simply take a 400x400 canvas and resize it to 28x28, which shifts digit mass off-center, introduces interpolation blur, and drops real-world classification accuracy below 60%.",
      "This project bridges the gap between deep learning models and browser interaction by implementing the complete MNIST preparation pipeline directly into the client preprocessing pipeline.",
    ],
    whatItDoes: {
      overview:
        "An intuitive web canvas where users draw digits with their mouse or finger, receiving instant CNN predictions with full softmax confidence bars.",
      features: [
        {
          name: "Responsive Drawing Canvas",
          detail:
            "Fluid HTML5 canvas supporting variable brush widths, touch events for mobile devices, and instant one-click reset controls.",
        },
        {
          name: "Centroid & Bounding Box Normalization",
          detail:
            "Extracts the bounding box of drawn strokes, computes the geometric center-of-mass using SciPy image moments, and centers the digit within a standard 20x20 box inside the 28x28 frame.",
        },
        {
          name: "Convolutional Neural Network Architecture",
          detail:
            "Trained with dual convolutional layers, max pooling, spatial dropout (p=0.25), and batch normalization to prevent overfitting on clean strokes.",
        },
        {
          name: "Top-3 Softmax Confidence Breakdown",
          detail:
            "Displays the model's confidence distribution across top predictions in real time, showing not just the winning digit but also secondary probabilities for ambiguous glyphs (e.g. distinguishing 4 from 9).",
        },
      ],
    },
    whatItWontDo: {
      overview:
        "The system enforces strict input validation to prevent arbitrary inference on meaningless canvas artifacts.",
      limits: [
        {
          rule: "No Blind Downsampling",
          reason:
            "Resizing a raw canvas without centroid translation produces severe spatial distortion. The pipeline refuses to evaluate an image until its center of mass is computed and aligned.",
        },
        {
          rule: "Rejection of Blank or Single-Pixel Noise",
          reason:
            "If the canvas contains fewer than 15 active pixels or only stray clicks, the backend rejects the payload and prompts the user to draw a recognizable digit.",
        },
        {
          rule: "Zero Drawing Retention",
          reason:
            "Canvas bitmaps are transformed ephemerally in RAM and discarded immediately after classification.",
        },
      ],
    },
    howItWorks: {
      overview:
        "The project pairs custom browser-side image processing with a lightweight PyTorch inference backend.",
      architecture: [
        {
          component: "Canvas Capture",
          tech: "HTML5 Canvas API / JavaScript",
          role: "Captures user mouse and touch paths, generating high-contrast grayscale stroke bitmaps.",
        },
        {
          component: "Image Normalizer",
          tech: "SciPy ndimage / NumPy",
          role: "Crops bounding box, resizes with aspect ratio preservation, and centers mass to match MNIST distribution.",
        },
        {
          component: "CNN Inference Engine",
          tech: "PyTorch / TorchScript",
          role: "Executes forward pass through trained Conv2D -> ReLU -> MaxPool -> Dense layers.",
        },
        {
          component: "REST API Endpoint",
          tech: "Flask / Gunicorn",
          role: "Exposes lightweight POST /predict endpoint returning top-3 predicted labels and probabilities.",
        },
      ],
      deepDive: [
        "Network Architecture: Conv2D(1, 32, kernel=3) -> BatchNorm -> ReLU -> Conv2D(32, 64, kernel=3) -> MaxPool2D(2) -> Dropout(0.25) -> Flatten -> Linear(9216, 128) -> Dropout(0.5) -> Linear(128, 10) -> Softmax.",
        "Centroid Alignment Math: Using image moments M00, M10, and M01, the centroid (cx, cy) is calculated as cx = M10/M00 and cy = M01/M00. The image is shifted by (14 - cx, 14 - cy) using bicubic spline interpolation.",
      ],
    },
    byTheNumbers: [
      { value: "99.2%", label: "Test Accuracy" },
      { value: "<25ms", label: "Inference Latency" },
      { value: "28×28", label: "Normalized Resolution" },
      { value: "Top-3", label: "Confidence Softmax" },
    ],
    whatsNext: [
      "ONNX Web Runtime: Exporting the model to ONNX so inference runs 100% in the visitor's browser using WebAssembly/WebGL without needing any backend server calls.",
      "Multi-Digit Recognition: Adding contour segmentation to recognize multiple digits drawn in sequence across a wider canvas.",
    ],
    nextProject: {
      id: "focus-jumper",
      title: "EEG Signal Analysis & Research",
      subtitle: "Biomedical signal processing and frequency band power spectral analysis",
      domain: "Biomedical Signal Processing • Data Science",
    },
  },

  "focus-jumper": {
    id: "focus-jumper",
    index: 4,
    total: 4,
    title: "EEG Signal Analysis & Research",
    domain: "Biomedical Signal Processing • Data Science",
    year: "2025",
    badge: "RESEARCH CASE STUDY",
    summary:
      "A biomedical signal processing project analyzing EEG frequency bands across rest and cognitive task conditions using Butterworth filtering and Welch power spectral density estimation.",
    wontStamp: {
      prefix: "Won’t",
      text: "Never claims clinical medical diagnostics and never operates on unfiltered noisy sensor data.",
    },
    datasheet: {
      role: "Research Intern, Swaarogym Medical Devices (MNIT Jaipur)",
      when: "2025 · Biomedical Research Project",
      builtWith: [
        "Python",
        "SciPy (signal)",
        "Welch Power Spectral Density",
        "NumPy",
        "Matplotlib",
        "Pandas",
        "Butterworth Bandpass Filter",
      ],
      githubUrl: "https://github.com/shivangguptaaa",
      hostname: "mnit.ac.in / swaarogym",
    },
    whyItExists: [
      "Electroencephalography (EEG) recordings capture rich microvolt-level electrical activity from scalp electrodes, but raw signals are heavily contaminated by environmental noise, power line interference (50/60 Hz), and ocular artifacts.",
      "Extracting meaningful physiological indicators from noisy multi-channel signals requires rigorous digital signal processing pipelines: applying bandpass filters to isolate physiological rhythms and computing spectral power distributions across standard frequency bands.",
      "This project was conducted during research work at Swaarogym Medical Devices (incubated at MIIC, MNIT Jaipur) to systematically analyze Theta and Beta rhythm dynamics during sustained mental tasks.",
    ],
    whatItDoes: {
      overview:
        "A signal processing pipeline that filters multi-channel EEG recordings, computes power spectral density across distinct frequency bands, and visualizes spectral ratio shifts.",
      features: [
        {
          name: "Digital Bandpass Filtering",
          detail:
            "Applies 4th-order zero-phase Butterworth bandpass filters (1–40 Hz) and notch filtering to eliminate DC offset, baseline drift, and power line hum from raw scalp recordings.",
        },
        {
          name: "Welch’s Power Spectral Density Estimation",
          detail:
            "Computes power spectra across scalp channels using Hann windowing and 50% segment overlap to minimize variance in spectral estimates.",
        },
        {
          name: "Frequency Band Isolation",
          detail:
            "Extracts integrated spectral power across canonical EEG bands: Delta (1–4 Hz), Theta (4–8 Hz), Alpha (8–13 Hz), and Beta (13–30 Hz).",
        },
        {
          name: "Theta/Beta Spectral Ratio Analysis",
          detail:
            "Calculates the Theta/Beta Ratio (TBR), an established research indicator in cognitive neuroscience used to track shifts between resting states and focused mental tasks.",
        },
      ],
    },
    whatItWontDo: {
      overview:
        "The research framework maintains strict scientific rigor and clearly defined non-clinical boundaries.",
      limits: [
        {
          rule: "No Clinical Medical Claims",
          reason:
            "The project is purely an engineering analysis of frequency band power ratios for research and exploratory monitoring. It does not provide medical diagnoses or replace clinical EEG analysis.",
        },
        {
          rule: "Rejects Unfiltered Raw Epochs",
          reason:
            "Raw scalp electrodes suffer from high baseline drift and motion artifacts. The pipeline strictly discards segments exceeding physiological microvolt thresholds before spectral estimation.",
        },
        {
          rule: "No Thought or Speech Decoding",
          reason:
            "The system evaluates aggregate frequency band power across electrode groups. It does not and cannot decode private thoughts, language, or semantic content.",
        },
      ],
    },
    howItWorks: {
      overview:
        "The signal analysis workflow follows established digital signal processing procedures in Python.",
      architecture: [
        {
          component: "Artifact Filter",
          tech: "SciPy signal.butter / filtfilt",
          role: "Executes bidirectional zero-phase 4th-order bandpass filtering between 1 and 40 Hz.",
        },
        {
          component: "Spectral Estimator",
          tech: "SciPy signal.welch",
          role: "Splits continuous channel recordings into overlapping Hann-windowed epochs to compute PSD.",
        },
        {
          component: "Band Integrator",
          tech: "NumPy / Composite Simpson's Rule",
          role: "Integrates area under PSD curves to determine absolute and relative power per rhythm band.",
        },
        {
          component: "Spectral Visualizer",
          tech: "Matplotlib / Seaborn",
          role: "Generates comparative power spectrum plots showing spectral shifts between task conditions.",
        },
      ],
      deepDive: [
        "Welch Method Parameterization: Spectral estimation uses window length of 256 samples with 50% overlap (128 samples) at 250 Hz sampling frequency, achieving an optimal compromise between frequency resolution (0.97 Hz bins) and variance reduction.",
        "Zero-Phase Filtering: By applying filtfilt (forward-backward filtering), phase distortion is completely cancelled out, preserving the exact timing of rhythm transitions across scalp channels.",
      ],
    },
    byTheNumbers: [
      { value: "36", label: "Dataset Subjects" },
      { value: "1–40 Hz", label: "Filter Bandwidth" },
      { value: "4 Bands", label: "Rhythms Isolated" },
      { value: "MNIT", label: "Incubator Lab" },
    ],
    whatsNext: [
      "Real-Time Stream Processing: Adapting the SciPy Welch pipeline to operate over continuous ring buffers from open-hardware EEG headsets (e.g. OpenBCI Cyton).",
      "Topographic Scalp Mapping: Generating 2D interpolated heatmaps showing spatial distribution of Theta/Beta power across standard 10–20 electrode coordinates.",
    ],
    nextProject: {
      id: "aegis",
      title: "Aegis Disaster Platform",
      subtitle: "Autonomous disaster management, live GDACS telemetry, and protocol-grounded RAG AI",
      domain: "Full-Stack • Autonomous Systems • RAG AI",
    },
  },
};
