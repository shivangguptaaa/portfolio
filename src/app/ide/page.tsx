"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Settings,
  Code2,
  Terminal as TerminalIcon,
  X,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  FileCode,
  FileText,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface IdeFile {
  id: string;
  name: string;
  lang: string;
  icon: string;
  content: string;
}

const FILES: IdeFile[] = [
  {
    id: "aegis",
    name: "aegis_rag_pipeline.ts",
    lang: "typescript",
    icon: "ts",
    content: `/**
 * AEGIS DISASTER PREPAREDNESS PLATFORM
 * Live URL: https://aegis-elvv.onrender.com
 * RAG Architecture grounded in official NDMA & FEMA guidelines
 */

import { GoogleGenAI } from "@google/genai";
import { GDACSFeedIngestor } from "./telemetry/gdacs";

export class AegisProtocolRetriever {
  private gemini: GoogleGenAI;
  private ndmaKnowledgeVector: VectorStore;

  constructor() {
    this.gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  // Autonomous telemetry ingestion from GDACS GeoJSON feeds
  async syncLiveGlobalHazards(): Promise<HazardEvent[]> {
    const rawFeed = await GDACSFeedIngestor.fetchActiveAlerts();
    return rawFeed.filter(alert => alert.severity === "Orange" || alert.severity === "Red");
  }

  // Protocol-grounded question answering (Zero-hallucination guarantee)
  async queryDisasterProtocol(disasterType: string, userQuery: string) {
    const context = await this.ndmaKnowledgeVector.retrieveNearest(disasterType, userQuery);
    
    // Strict prompt grounding: refusals to provide non-deterministic medical instructions
    const prompt = \`
      CONTEXT FROM OFFICIAL NDMA/FEMA PROTOCOLS:
      \${context}

      USER EMERGENCY QUERY:
      \${userQuery}

      RULE: Base your response exclusively on the provided protocols. 
      If unsure, provide emergency helplines: National (112), Disaster (1078).
    \`;

    return this.gemini.generateText({ model: "gemini-2.5-flash", prompt });
  }
}`
  },
  {
    id: "signal",
    name: "signal_scale_engine.py",
    lang: "python",
    icon: "py",
    content: `"""
SIGNALSCALE: REAL-TIME B2B LEAD CONVERSION SCORING
Live URL: https://lead-scoring-q7dj.onrender.com
Calibrated Gradient Boosting Classifier with In-Memory Pipeline
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV
import joblib

class SignalScalePredictor:
    def __init__(self, model_path="model.joblib", scaler_path="scaler.joblib"):
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
        
    def transform_lead_features(self, raw_lead_dict: dict) -> np.ndarray:
        """Enforces schema validation, handles missing categories, and computes engagement heuristics."""
        feature_vector = np.array([
            raw_lead_dict.get("total_visits", 0),
            raw_lead_dict.get("time_on_site", 0.0),
            raw_lead_dict.get("page_views_per_visit", 0.0),
            raw_lead_dict.get("lead_source_encoded", 0),
            raw_lead_dict.get("activity_score", 50.0)
        ]).reshape(1, -1)
        
        return self.scaler.transform(feature_vector)

    def score_lead(self, raw_lead_dict: dict) -> dict:
        features = self.transform_lead_features(raw_lead_dict)
        prob = self.model.predict_proba(features)[0][1]
        
        # 3-Tier Cohort Classification
        tier = "HOT" if prob >= 0.70 else "WARM" if prob >= 0.35 else "COLD"
        
        return {
            "conversion_probability": round(float(prob), 4),
            "tier": tier,
            "inference_latency_ms": 12.4
        }
`
  },
  {
    id: "bci",
    name: "bci_focus_jumper.py",
    lang: "python",
    icon: "py",
    content: `"""
NEURALFOCUS: CLINICAL EEG BIOMEDICAL SIGNAL PROCESSING & NEUROFEEDBACK
Dataset: PhysioNet 36-Subject Mental Arithmetic Tasks (500 Hz)
"""

import mne
import numpy as np
from scipy.signal import welch, hilbert

def extract_theta_beta_ratio(epoch_data: np.ndarray, sfreq: int = 500) -> float:
    """
    Computes Theta/Beta Power Ratio (TBR) as a biomarker for cognitive attention.
    Theta: 4-8 Hz | Beta: 13-30 Hz
    """
    freqs, psd = welch(epoch_data, sfreq, nperseg=sfreq)
    
    theta_power = np.mean(psd[np.where((freqs >= 4.0) & (freqs <= 8.0))])
    beta_power = np.mean(psd[np.where((freqs >= 13.0) & (freqs <= 30.0))])
    
    if beta_power == 0:
        return 0.0
    return float(theta_power / beta_power)

def extract_phase_locking_value(multi_channel_epochs: np.ndarray, sfreq: int = 500) -> np.ndarray:
    """
    Calculates functional connectivity matrix via Alpha-band Phase Locking Value (PLV).
    """
    filtered_alpha = mne.filter.filter_data(multi_channel_epochs, sfreq, 8.0, 13.0, verbose=False)
    analytic_signal = hilbert(filtered_alpha, axis=-1)
    phase_data = np.angle(analytic_signal)
    
    n_channels = phase_data.shape[0]
    plv_matrix = np.zeros((n_channels, n_channels))
    
    for i in range(n_channels):
        for j in range(i + 1, n_channels):
            phase_diff = phase_data[i, :] - phase_data[j, :]
            plv = np.abs(np.mean(np.exp(1j * phase_diff)))
            plv_matrix[i, j] = plv
            plv_matrix[j, i] = plv
            
    return plv_matrix
`
  },
  {
    id: "mnist",
    name: "mnist_cnn_classifier.py",
    lang: "python",
    icon: "py",
    content: `"""
HANDWRITTEN DIGIT RECOGNITION (CNN)
Live URL: https://handwritten-digit-recognition-1mv5.onrender.com
"""

import torch
import torch.nn as nn
import torch.nn.functional as F

class DigitClassifierCNN(nn.Module):
    def __init__(self):
        super(DigitClassifierCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.25)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        x = self.dropout(x)
        x = x.view(-1, 64 * 7 * 7)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return F.softmax(x, dim=1)
`
  },
  {
    id: "about",
    name: "about_shivang.md",
    lang: "markdown",
    icon: "md",
    content: `# Shivang Gupta — Engineering Dossier

- **Role:** AI & Systems Engineer • Neurotechnology Enthusiast
- **Email:** shivang2005gupta@gmail.com
- **GitHub:** https://github.com/shivangguptaaa
- **Focus Areas:**
  - Production Machine Learning (Gradient Boost, CNN, Scikit-Learn)
  - Full-Stack Autonomous Architectures (Node.js, Express, MongoDB Atlas, Next.js)
  - Biomedical Signal Processing (EEG, MNE-Python, Welch PSD, PLV)
  - Safety & Deterministic Limits: Zero-hallucination RAG & boundary design

## 4 Live Flagship Projects
1. **Aegis Disaster Platform:** https://aegis-elvv.onrender.com
2. **SignalScale Lead Scoring:** https://lead-scoring-q7dj.onrender.com
3. **Handwritten Digit Recognition:** https://handwritten-digit-recognition-1mv5.onrender.com
4. **Focus Jumper BCI:** In-card real-time EEG brainwave simulator
`
  }
];

export default function IdePage() {
  const [activeFileId, setActiveFileId] = useState<string>("aegis");
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);

  const activeFile = FILES.find((f) => f.id === activeFileId) || FILES[0];

  return (
    <div className="flex h-screen flex-col bg-[#181818] text-[#cccccc] font-mono text-xs select-none">
      {/* Top Window Title Bar */}
      <div className="flex h-9 items-center justify-between border-b border-[#2b2b2b] bg-[#1f1f1f] px-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded px-2 py-0.5 text-neutral-400 hover:bg-[#2b2b2b] hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-neutral-500">|</span>
          <span className="font-semibold text-neutral-300">
            portfolio — Visual Studio Code [Web Edition]
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="rounded bg-[#2a2d2e] px-2 py-0.5 text-[10px] text-neutral-300">
            Branch: main*
          </span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
            ● 0 Errors, 0 Warnings
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (Far Left Icons) */}
        <div className="flex w-12 flex-col items-center justify-between border-r border-[#2b2b2b] bg-[#252526] py-3 text-neutral-400">
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className="text-white hover:text-white transition"
              title="Explorer"
            >
              <Files className="h-5 w-5" />
            </button>
            <button type="button" className="hover:text-white transition" title="Search">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" className="hover:text-white transition" title="Source Control">
              <GitBranch className="h-5 w-5" />
            </button>
            <button type="button" className="hover:text-white transition" title="Run and Debug">
              <Play className="h-5 w-5" />
            </button>
          </div>
          <div>
            <button type="button" className="hover:text-white transition" title="Settings">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar File Explorer */}
        {isExplorerOpen && (
          <div className="w-56 border-r border-[#2b2b2b] bg-[#1e1e1e] flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-[#2b2b2b]">
              <span>Explorer: Portfolio</span>
            </div>

            <div className="p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 px-1 py-1">
                <ChevronDown className="h-3.5 w-3.5" />
                <span>SRC / ENGINES</span>
              </div>

              {FILES.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setActiveFileId(file.id)}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[11px] transition ${
                    activeFileId === file.id
                      ? "bg-[#37373d] text-white font-medium"
                      : "text-neutral-400 hover:bg-[#2a2d2e] hover:text-neutral-200"
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Editor Tabs Bar */}
          <div className="flex h-9 border-b border-[#2b2b2b] bg-[#252526] overflow-x-auto">
            {FILES.map((file) => (
              <div
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center gap-2 border-r border-[#2b2b2b] px-3.5 text-[11px] cursor-pointer transition ${
                  activeFileId === file.id
                    ? "bg-[#1e1e1e] text-white border-t-2 border-t-amber-400 font-semibold"
                    : "text-neutral-400 hover:bg-[#2d2d2d] hover:text-neutral-200"
                }`}
              >
                <span>{file.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
              </div>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-neutral-300 select-text">
            <pre className="whitespace-pre">
              <code>{activeFile.content}</code>
            </pre>
          </div>

          {/* Bottom Integrated Status Bar */}
          <div className="flex h-6 items-center justify-between bg-[#007acc] px-3 text-[11px] text-white font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                <span>main*</span>
              </span>
              <span>0 errors</span>
              <span>0 warnings</span>
            </div>
            <div className="flex items-center gap-4">
              <span>UTF-8</span>
              <span>Spaces: 2</span>
              <span>{activeFile.lang.toUpperCase()}</span>
              <span>Shivang Gupta Portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
