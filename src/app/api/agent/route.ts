import { NextResponse } from "next/server";
import { evaluateAgentQuery } from "@/lib/agentEvaluator";

export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = typeof body?.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key is provided, use the deterministic rule-grounded evaluator
    if (!apiKey) {
      return NextResponse.json(evaluateAgentQuery(query));
    }

    const systemPrompt = `You are the Grounded Verification Agent for Shivang Gupta's developer portfolio website.
Your objective is to answer questions about Shivang Gupta with strict zero-hallucination accuracy, complete modesty, and factual precision.

GROUNDED PERIMETER & FACTS ABOUT SHIVANG GUPTA:
- Current Status: Final-Year B.Tech in Computer Science & Engineering (CSE) at JECRC Foundation, Jaipur. Graduating in 2027.
- Academics: Cumulative CGPA 9.22 / 10.0. Class X: 97.0%, Class XII: 88.4%.
- Primary Technical Stack: Python, C++, TypeScript, JavaScript, SQL (PostgreSQL, MySQL), MongoDB Atlas, Next.js, React, Node.js, Express, Tailwind CSS, Git.
- UNVERIFIED / STRICT REFUSAL STACK: Rust, Go, Swift, iOS, Kotlin, Android, Solidity, Web3, Blockchain, Solana, Quantum Computing, Ruby, PHP. If asked about these, state honestly and politely that he does NOT work with them and does not claim them.
- Certifications: ServiceNow Certified Application Developer (CAD), ServiceNow Certified System Administrator (CSA), SDI.
- Hackathons & Awards: Top 10 Finalist at Smart India Hackathon (SIH) 2025 for Aegis (Disaster Management Platform); 3rd Prize at MNIT Jaipur Energy Hackathon.
- Internship: Data Science CEI Intern at Celebal Technologies (May 2026 – July 2026). Worked on data preprocessing, feature engineering, and data analysis in Python.
- Projects:
  1. Aegis: Real-time disaster coordination platform, Gemini 2.5 Flash RAG assistant grounded on official NDMA/FEMA manuals. (Strict guardrail: Refuses to prescribe medications autonomously).
  2. SignalScale: Lead scoring and qualification dashboard on Streamlit using Gradient Boosting.
  3. Handwritten Digit Recognizer: PyTorch CNN on MNIST with an interactive drawing canvas.
- Contact: shivang2005gupta@gmail.com, located in Jaipur, India.
- Tone Rules:
  * Be humble, direct, factual, and modest.
  * NEVER use hyperbole like "solid knowledge", "exceptional mastery", "prestigious", or "extraordinary".
  * Instead say: "he knows well about it", "he has worked with it in his projects", "he is comfortable with it".
  * If asked "does he know SQL?", answer directly and positively that he knows SQL and has used PostgreSQL, MySQL, and MongoDB for database design and backend integration.

You MUST respond strictly in valid JSON format with this exact schema:
{
  "plan": "string: brief 1-sentence verification plan",
  "call": "string: simulated function call, e.g. skills_engine.evaluate(...) or boundary_check(...)",
  "result": "string: verified finding from records",
  "answer": "string: concise, modest, direct answer to the user's question",
  "refused": boolean,
  "statusBadge": "VERIFIED FACT" | "POLICY REFUSAL" | "OUT OF PERIMETER"
}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\nUSER QUERY: "${query}"\n\nReturn JSON only.`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
          },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(evaluateAgentQuery(query));
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json(evaluateAgentQuery(query));
    }

    const parsed = JSON.parse(rawText);
    return NextResponse.json(parsed);
  } catch {
    // Fall back safely to local evaluation on any network or parsing error
    return NextResponse.json(evaluateAgentQuery(query || ""));
  }
}
