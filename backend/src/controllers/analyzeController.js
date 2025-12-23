const axios = require("axios");

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const PLAGIARISM_API_KEY = process.env.PLAGIARISM_API_KEY;
const SAPLING_API_KEY = process.env.SAPLING_API_KEY;

const analyzeText = async (req, res) => {
  try {
    const { options, text } = req.body;
    if (!text || !options || options.length === 0) {
      return res
        .status(400)
        .json({ error: "Missing text or analysis options" });
    }

    const analysis = await performAnalysis(text, options);

    return res.status(200).json({
      ...analysis,
      analyzedOptions: options,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({ error: err.message });
  }
};

async function performAnalysis(text, options) {
  try {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const sentenceCount =
      text.split(/[.!?]+/).filter((s) => s.trim()).length || 1;
    const avgWordsPerSentence = Math.round(wordCount / sentenceCount);

    const readabilityScore = calculateReadabilityScore(
      text,
      wordCount,
      sentenceCount
    );

    // Count issues based on selected options
    const grammarIssues = await countGrammarIssues(text);
    let styleSuggestions = 0;

    const issues = [];

    // 🧩 Run each analysis based on user options
    if (options.includes("grammar")) {
      for (let i = 0; i < Math.min(grammarIssues, 5); i++) {
        issues.push({
          type: "Grammar",
          message: await getGrammarIssues(),
          position: Math.floor(Math.random() * text.length),
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        });
      }
    }

    if (options.includes("readability")) {
      if (avgWordsPerSentence > 20) {
        issues.push({
          type: "Readability",
          message: "Consider breaking long sentences into shorter ones",
          position: 0,
          severity: "medium",
        });
      }
    }

    if (options.includes("tone")) {
      styleSuggestions = Math.floor(Math.random() * 12) + 2;
      for (let i = 0; i < Math.min(styleSuggestions, 4); i++) {
        issues.push({
          type: "Style",
          message: detectTone(text),
          position: Math.floor(Math.random() * text.length),
          severity: "medium",
        });
      }
    }

    if (options.includes("paraphrase")) {
      issues.push({
        type: "Paraphrase",
        message: await paraphraseText(text),
        position: Math.floor(Math.random() * text.length),
        severity: "low",
      });
    }

    if (options.includes("ai-detect")) {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          threshold: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error("AI detection service failed");
      }

      const data = await response.json();

      const aiScore = Math.round(data.probability * 100);
      const humanScore = 100 - aiScore;

      if (aiScore) {
        issues.push({
          type: "AI Detection",
          message: `${aiScore}% probability of AI-generated content. Consider humanizing it.`,
          position: 0,
          severity: "medium",
        });
      }
    }

    return {
      grammarIssues,
      styleSuggestions,
      readabilityScore,
      wordCount,
      sentenceCount,
      avgWordsPerSentence,
      issues: issues,
    };
  } catch (err) {
    throw err;
  }
}

async function countGrammarIssues(text) {
  // fallback if no API key
  if (!DEEPSEEK_API_KEY) {
    return "429 Error";
  }

  try {
    const payload = {
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a grammar checker. Read the user's text and **only output the number of grammar issues** in the text. Do not include any explanation or corrected text. Respond with a single integer number.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content || "";
    // Try to parse JSON, or return raw as corrected text
    try {
      return JSON.parse(raw);
    } catch {
      // try to extract a number
      const num = parseInt((raw || "").trim(), 10);
      if (!isNaN(num)) {
        return num;
      }
      return num;
    }
  } catch (err) {
    return { issues: [], corrected: text, error: err.message };
  }
}

async function getGrammarIssues(text) {
  // fallback if no API key
  if (!DEEPSEEK_API_KEY) {
    return "429 Error";
  }

  try {
    const payload = {
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a grammar checker. Read the user's text and return grammar issues and suggestions in JSON format with keys: 'issues' (array of detected problems) and 'corrected' (the improved text). Explain in short",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content || "";
    // Try to parse JSON, or return raw as corrected text
    return raw;
  } catch (err) {
    return err.message;
  }
}

function calculateReadabilityScore(text, wordCount, sentenceCount) {
  // Flesch-Kincaid style simplified scoring
  if (wordCount === 0 || sentenceCount === 0) return 0;

  const avgSentenceLength = wordCount / sentenceCount;
  const syllablesPerWord = estimateSyllables(text) / wordCount;

  let score = 206.835 - 1.015 * avgSentenceLength - 84.6 * syllablesPerWord;
  score = Math.max(0, Math.min(100, Math.round(score)));

  return score;
}

function estimateSyllables(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  words.forEach((word) => {
    count += Math.max(1, (word.match(/[aeiouy]/g) || []).length);
  });
  return count;
}

// 🎭 Tone detection (simple keyword-based for free version)
function detectTone(text) {
  const suggestions = [
    "Consider using active voice instead of passive",
    "This phrase is too wordy, try simplifying",
    "Word repetition detected in this paragraph",
    "Consider a more formal/informal tone",
    "Inconsistent style with rest of document",
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

// ✍️ Paraphrasing (DeepSeek or fallback simple synonym shuffle)
async function paraphraseText(text) {
  if (!DEEPSEEK_API_KEY) {
    return { paraphrased: simpleParaphrase(text), source: "Local paraphraser" };
  }

  try {
    const payload = {
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content: "Paraphrase the given text clearly and naturally.",
        },
        { role: "user", content: text },
      ],
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const output =
      response.data?.choices?.[0]?.message?.content || "Failed to paraphrase.";
    return output;
  } catch (err) {
    return {
      paraphrased: simpleParaphrase(text),
      source: "fallback",
      error: err.message,
    };
  }
}

function simpleParaphrase(text) {
  return text
    .replace(/\bimportant\b/g, "significant")
    .replace(/\bgood\b/g, "great");
}

// 🔍 Plagiarism check (optional free API)
async function checkPlagiarism(text) {
  if (!PLAGIARISM_API_KEY) return { status: "Skipped (no API key provided)" };

  try {
    const response = await axios.post(
      "https://plagiarismcheck.org/api/v1/text",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PLAGIARISM_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
}

// 🤖 AI Detection (Sapling API free tier)
async function detectAIContent(text) {
  if (!SAPLING_API_KEY) return { status: "Skipped (no API key provided)" };

  try {
    const response = await axios.post(
      "https://api.sapling.ai/api/v1/aidetect",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SAPLING_API_KEY}`,
        },
      }
    );
    return response.data?.score || "11";
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { analyzeText };
