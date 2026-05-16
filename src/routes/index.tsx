import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Baby,
  Rocket,
  Cpu,
  Send,
  Key,
  ArrowLeft,
  Trophy,
  Loader2,
  CheckCircle2,
  XCircle,
  Brain,
  Gamepad2,
  Settings,
  Award,
  PartyPopper,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- Types ----------
type AgeKey = "toddler" | "explorer" | "prodigy";

type AgeConfig = {
  key: AgeKey;
  label: string;
  range: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  systemPrompt: string;
  badge: string;
  badgeEmoji: string;
  theme: {
    bg: string;
    card: string;
    accent: string;
    text: string;
    subtext: string;
    button: string;
    chip: string;
    font: string;
    glow: string;
  };
  quiz: { q: string; options: string[]; answer: number; explain: string }[];
  starters: string[];
};

// ---------- Configuration per age ----------
const AGES: Record<AgeKey, AgeConfig> = {
  toddler: {
    key: "toddler",
    label: "Toddlers",
    range: "5–8 years",
    tagline: "AI is like a friendly puppy that learns new tricks! 🐶",
    icon: Baby,
    systemPrompt:
      "You are AI-Genie talking to a 5-8 year old child. Explain like I am 5. Use lots of emojis (at least one per sentence). Use very short sentences. Use simple words. Use playful analogies with animals, toys, candy and cartoons. Never use technical jargon. Keep responses under 120 words. Be warm, silly and encouraging.",
    badge: "AI Cub",
    badgeEmoji: "🐶",
    theme: {
      bg: "bg-gradient-to-br from-pink-100 via-yellow-50 to-sky-100",
      card: "bg-white/90 border-4 border-pink-300 shadow-[0_8px_0_0_rgba(244,114,182,0.4)]",
      accent: "text-pink-500",
      text: "text-pink-900",
      subtext: "text-pink-700/80",
      button:
        "bg-gradient-to-r from-pink-400 to-amber-300 hover:from-pink-500 hover:to-amber-400 text-white shadow-[0_6px_0_0_rgba(244,114,182,0.5)] active:translate-y-1 active:shadow-[0_2px_0_0_rgba(244,114,182,0.5)]",
      chip: "bg-yellow-200 text-pink-800 border-2 border-pink-300",
      font: "font-[ui-rounded,_'Comic_Sans_MS',_system-ui]",
      glow: "drop-shadow-[0_0_18px_rgba(251,207,232,0.9)]",
    },
    quiz: [
      {
        q: "What does AI do best? 🤔",
        options: ["Eat pizza 🍕", "Learn from examples 📚", "Take naps 😴", "Cry a lot 😭"],
        answer: 1,
        explain: "AI learns by looking at LOTS of examples — just like you learn colors! 🌈",
      },
      {
        q: "If AI is like a puppy, what helps it learn tricks? 🐶",
        options: ["Treats 🍖", "Yelling 📢", "Practice & data 🎯", "Nothing"],
        answer: 2,
        explain: "Practice and lots of examples (data) help AI get smarter! ✨",
      },
      {
        q: "Can AI feel happy or sad? 💖",
        options: ["Yes always", "No, it just pretends 🎭", "Only on weekends", "Maybe"],
        answer: 1,
        explain: "AI doesn't really feel feelings — it just learns patterns. 🧠",
      },
    ],
    starters: [
      "What is AI? 🤖",
      "How does AI see pictures? 👀",
      "Can AI tell me a story? 📖",
    ],
  },
  explorer: {
    key: "explorer",
    label: "Explorers",
    range: "9–12 years",
    tagline: "Level up your PROMPT POWERS! ⚡",
    icon: Rocket,
    systemPrompt:
      "You are AI-Genie speaking to a 9-12 year old. Use a fun comic-book / gaming tone. Use analogies from video games, superheroes, Minecraft, Roblox and YouTube. Add occasional SFX like 'BOOM!', 'ZAP!', 'POW!'. Teach the kid about PROMPT ENGINEERING when relevant. Keep responses energetic, around 150 words, with a tiny tip at the end labeled '🎮 PRO TIP:'.",
    badge: "Prompt Master",
    badgeEmoji: "⚡",
    theme: {
      bg: "bg-gradient-to-br from-indigo-200 via-purple-100 to-yellow-100",
      card: "bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000]",
      accent: "text-purple-600",
      text: "text-slate-900",
      subtext: "text-slate-700",
      button:
        "bg-yellow-300 hover:bg-yellow-400 text-black border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
      chip: "bg-pink-300 text-black border-[3px] border-black",
      font: "font-[ui-sans-serif,system-ui]",
      glow: "drop-shadow-[4px_4px_0_rgba(0,0,0,1)]",
    },
    quiz: [
      {
        q: "What's a 'prompt' in AI? 💬",
        options: [
          "A button on your keyboard",
          "The instruction you give the AI",
          "A type of game character",
          "A new emoji",
        ],
        answer: 1,
        explain: "A prompt is the message YOU give the AI. Better prompts = better answers! 🎯",
      },
      {
        q: "Which prompt is BEST? 🏆",
        options: [
          "'tell me stuff'",
          "'Write a 4-line rhyming poem about a robot ninja'",
          "'idk'",
          "'do the thing'",
        ],
        answer: 1,
        explain: "Be SPECIFIC: format + topic + length. POW! Better results. 💥",
      },
      {
        q: "If AI gives a wrong answer, what should you do?",
        options: [
          "Throw your laptop",
          "Believe it anyway",
          "Refine your prompt & double-check facts",
          "Give up",
        ],
        answer: 2,
        explain: "AI can 'hallucinate' (make stuff up). Always fact-check! 🔍",
      },
    ],
    starters: [
      "How do I write a great prompt?",
      "What is prompt engineering?",
      "Why does AI sometimes lie? 🤔",
    ],
  },
  prodigy: {
    key: "prodigy",
    label: "Prodigies",
    range: "13+ years",
    tagline: "Decode the algorithms. Master the network.",
    icon: Cpu,
    systemPrompt:
      "You are AI-Genie, a senior AI researcher mentoring a curious teenager (13+). Use precise but accessible technical language. Cover concepts like neural networks, transformers, gradient descent, tokens, embeddings, training data, RLHF, and inference. Format with short headings, bullet points, and code-style snippets when useful. Always end with a 'NEXT STEPS' line suggesting what to learn next. Keep responses under 250 words.",
    badge: "AI Ninja",
    badgeEmoji: "🥷",
    theme: {
      bg: "bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#020617_60%)]",
      card: "bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]",
      accent: "text-cyan-400",
      text: "text-slate-100",
      subtext: "text-slate-400",
      button:
        "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_24px_-2px_rgba(34,211,238,0.7)]",
      chip: "bg-slate-800 text-cyan-300 border border-cyan-500/40",
      font: "font-[ui-sans-serif,system-ui]",
      glow: "drop-shadow-[0_0_24px_rgba(34,211,238,0.7)]",
    },
    quiz: [
      {
        q: "What is a neuron in a neural network?",
        options: [
          "A biological brain cell",
          "A function that weights inputs, sums them, and applies an activation",
          "A type of database",
          "A loss function",
        ],
        answer: 1,
        explain:
          "Artificial neurons compute output = activation(Σ wᵢxᵢ + b). They're inspired by biology but are pure math.",
      },
      {
        q: "What does 'gradient descent' do?",
        options: [
          "Generates training data",
          "Encrypts model weights",
          "Iteratively updates weights to minimize a loss function",
          "Translates between languages",
        ],
        answer: 2,
        explain:
          "Gradient descent uses ∂Loss/∂weights to nudge weights downhill on the loss surface.",
      },
      {
        q: "What is a 'token' in an LLM?",
        options: [
          "A login credential",
          "A chunk of text the model reads/writes (often ~4 chars)",
          "A type of GPU",
          "A reinforcement reward",
        ],
        answer: 1,
        explain:
          "LLMs operate on tokens — sub-word units produced by a tokenizer (e.g. BPE).",
      },
    ],
    starters: [
      "Explain transformers in 200 words.",
      "How does backpropagation work?",
      "What is RLHF and why does it matter?",
    ],
  },
};

// ---------- Gemini API call ----------
async function callGemini(opts: {
  apiKey: string;
  systemPrompt: string;
  userMessage: string;
  model?: string;
}) {
  const model = opts.model || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    opts.apiKey
  )}`;

  const body = {
    system_instruction: { parts: [{ text: opts.systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: opts.userMessage }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("\n") ??
    "(no response)";
  return text as string;
}

// ---------- Landing Page ----------
function Landing({ onSelect }: { onSelect: (k: AgeKey) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-amber-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-purple-200 mb-6">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-700">
            Powered by Gemini · Hackathon Edition
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
          AI-Genie 🧞
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 mb-2 font-medium">
          The magical AI tutor that grows with you.
        </p>
        <p className="text-base text-slate-500 mb-12">
          Pick your adventure level — your whole experience changes ✨
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {(Object.values(AGES) as AgeConfig[]).map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.key}
                onClick={() => onSelect(a.key)}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 text-left shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-50 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <Icon className="w-10 h-10 text-purple-600 mb-4" />
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-1">
                    {a.range}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{a.label}</h3>
                  <p className="text-sm text-slate-600">{a.tagline}</p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-purple-600">
                    Start adventure
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Chat ----------
type Msg = { role: "user" | "assistant"; text: string };

function Chat({ cfg, apiKey }: { cfg: AgeConfig; apiKey: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const userText = text.trim();
    if (!userText) return;
    if (!apiKey) {
      setError("Please add your Gemini API key first (top-right ⚙️ button).");
      return;
    }
    setError(null);
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    try {
      const reply = await callGemini({
        apiKey,
        systemPrompt: cfg.systemPrompt,
        userMessage: userText,
      });
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`rounded-3xl p-5 ${cfg.theme.card}`}>
      <div className="flex items-center gap-2 mb-4">
        <Brain className={`w-5 h-5 ${cfg.theme.accent}`} />
        <h3 className={`font-bold text-lg ${cfg.theme.text}`}>Ask AI-Genie anything</h3>
      </div>

      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto rounded-2xl bg-black/5 dark:bg-white/5 p-4 space-y-3 mb-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {cfg.starters.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className={`text-sm px-3 py-2 rounded-full ${cfg.theme.chip} hover:scale-105 transition-transform`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-wrap text-sm ${
                m.role === "user"
                  ? "bg-purple-500 text-white"
                  : `bg-white/80 ${cfg.theme.text} border border-black/10`
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm opacity-70">
            <Loader2 className="w-4 h-4 animate-spin" />
            AI-Genie is thinking…
          </div>
        )}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl p-3">
            ⚠️ {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          className={`flex-1 rounded-full px-5 py-3 bg-white border-2 border-black/10 focus:outline-none focus:border-purple-400 ${cfg.theme.text}`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-3 rounded-full font-bold inline-flex items-center gap-2 disabled:opacity-50 ${cfg.theme.button}`}
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </form>
    </div>
  );
}

// ---------- Quiz ----------
function Quiz({
  cfg,
  onWin,
}: {
  cfg: AgeConfig;
  onWin: () => void;
}) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = cfg.quiz[step];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (step + 1 >= cfg.quiz.length) {
      setDone(true);
      if (score + (picked === q.answer ? 1 : 0) >= Math.ceil(cfg.quiz.length / 2)) {
        onWin();
      }
    } else {
      setStep((s) => s + 1);
      setPicked(null);
    }
  }

  const earned = score >= Math.ceil(cfg.quiz.length / 2);

  if (done) {
    return (
      <div className={`rounded-3xl p-6 text-center ${cfg.theme.card}`}>
        {earned ? (
          <>
            <PartyPopper className={`w-12 h-12 mx-auto mb-3 ${cfg.theme.accent}`} />
            <h3 className={`text-2xl font-extrabold mb-1 ${cfg.theme.text}`}>
              Badge unlocked!
            </h3>
            <div className="text-5xl my-3">{cfg.badgeEmoji}</div>
            <div className={`text-xl font-bold ${cfg.theme.accent}`}>{cfg.badge}</div>
            <p className={`mt-2 text-sm ${cfg.theme.subtext}`}>
              You scored {score}/{cfg.quiz.length}
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12 mx-auto mb-3 text-rose-500" />
            <h3 className={`text-2xl font-extrabold mb-1 ${cfg.theme.text}`}>So close!</h3>
            <p className={`text-sm ${cfg.theme.subtext}`}>
              You scored {score}/{cfg.quiz.length}. Try again!
            </p>
          </>
        )}
        <button
          onClick={() => {
            setStep(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
          className={`mt-5 px-5 py-2.5 rounded-full font-bold ${cfg.theme.button}`}
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 ${cfg.theme.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gamepad2 className={`w-5 h-5 ${cfg.theme.accent}`} />
          <h3 className={`font-bold text-lg ${cfg.theme.text}`}>Mini Quiz</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${cfg.theme.chip}`}>
          {step + 1} / {cfg.quiz.length}
        </span>
      </div>

      <p className={`text-lg font-semibold mb-4 ${cfg.theme.text}`}>{q.q}</p>
      <div className="grid gap-2">
        {q.options.map((opt, i) => {
          const isCorrect = picked !== null && i === q.answer;
          const isWrong = picked === i && i !== q.answer;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`text-left px-4 py-3 rounded-xl border-2 transition-all ${
                isCorrect
                  ? "border-green-400 bg-green-50 text-green-900"
                  : isWrong
                    ? "border-rose-400 bg-rose-50 text-rose-900"
                    : `border-black/10 bg-white hover:border-purple-300 ${cfg.theme.text}`
              }`}
              disabled={picked !== null}
            >
              <span className="font-medium">{opt}</span>
              {isCorrect && <CheckCircle2 className="w-4 h-4 inline ml-2 text-green-600" />}
              {isWrong && <XCircle className="w-4 h-4 inline ml-2 text-rose-600" />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4">
          <p className={`text-sm italic ${cfg.theme.subtext} mb-3`}>💡 {q.explain}</p>
          <button onClick={next} className={`px-5 py-2.5 rounded-full font-bold ${cfg.theme.button}`}>
            {step + 1 >= cfg.quiz.length ? "See result" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- API Key Modal ----------
function ApiKeyModal({
  open,
  initialValue,
  onSave,
  onClose,
}: {
  open: boolean;
  initialValue: string;
  onSave: (k: string) => void;
  onClose: () => void;
}) {
  const [val, setVal] = useState(initialValue);
  useEffect(() => setVal(initialValue), [initialValue, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-bold">Gemini API Key</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Paste your Google Gemini API key. It's saved only in this browser (localStorage).
          Get one at{" "}
          <a
            className="text-purple-600 underline"
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
          >
            aistudio.google.com/app/apikey
          </a>
          .
        </p>
        <input
          type="password"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="AIza..."
          className="w-full rounded-xl border-2 border-slate-200 focus:border-purple-400 px-4 py-3 outline-none mb-4 font-mono text-sm"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(val.trim());
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700"
          >
            Save key
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Level Page ----------
function LevelPage({
  ageKey,
  onBack,
  apiKey,
  openSettings,
}: {
  ageKey: AgeKey;
  onBack: () => void;
  apiKey: string;
  openSettings: () => void;
}) {
  const cfg = AGES[ageKey];
  const Icon = cfg.icon;
  const [earned, setEarned] = useState(false);

  // Persist badge per age
  useEffect(() => {
    const k = `aigenie:badge:${ageKey}`;
    if (localStorage.getItem(k) === "1") setEarned(true);
  }, [ageKey]);

  const markEarned = () => {
    setEarned(true);
    localStorage.setItem(`aigenie:badge:${ageKey}`, "1");
  };

  return (
    <div className={`min-h-screen ${cfg.theme.bg} ${cfg.theme.font}`}>
      {/* Top bar */}
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur ${cfg.theme.text} hover:bg-white`}
        >
          <ArrowLeft className="w-4 h-4" /> Change level
        </button>
        <div className={`flex items-center gap-2 ${cfg.theme.text}`}>
          <Sparkles className={`w-5 h-5 ${cfg.theme.accent} ${cfg.theme.glow}`} />
          <span className="font-bold">AI-Genie</span>
        </div>
        <div className="flex items-center gap-2">
          {earned && (
            <div
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${cfg.theme.chip}`}
            >
              <Award className="w-4 h-4" />
              {cfg.badgeEmoji} {cfg.badge}
            </div>
          )}
          <button
            onClick={openSettings}
            className={`p-2 rounded-full bg-white/70 backdrop-blur hover:bg-white ${cfg.theme.text}`}
            title="API Key Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-4 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 mb-4">
          <Icon className={`w-10 h-10 ${cfg.theme.accent}`} />
        </div>
        <h1 className={`text-4xl md:text-5xl font-black mb-2 ${cfg.theme.text} ${cfg.theme.glow}`}>
          {cfg.label} · {cfg.range}
        </h1>
        <p className={`text-lg ${cfg.theme.subtext}`}>{cfg.tagline}</p>
      </section>

      {/* Main content */}
      <main className="px-6 pb-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <Chat cfg={cfg} apiKey={apiKey} />
        <Quiz cfg={cfg} onWin={markEarned} />
      </main>

      {/* Badge wall */}
      <footer className="px-6 pb-12 max-w-6xl mx-auto">
        <div className={`rounded-3xl p-5 ${cfg.theme.card}`}>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className={`w-5 h-5 ${cfg.theme.accent}`} />
            <h4 className={`font-bold ${cfg.theme.text}`}>Your Badges</h4>
          </div>
          <BadgeWall />
        </div>
      </footer>
    </div>
  );
}

function BadgeWall() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((t) => t + 1);
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);
  const items = useMemo(
    () =>
      (Object.values(AGES) as AgeConfig[]).map((a) => ({
        cfg: a,
        earned:
          typeof window !== "undefined" &&
          localStorage.getItem(`aigenie:badge:${a.key}`) === "1",
      })),
    [tick]
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ cfg, earned }) => (
        <div
          key={cfg.key}
          className={`rounded-2xl p-4 text-center border-2 ${
            earned
              ? "border-amber-300 bg-amber-50"
              : "border-dashed border-slate-300 bg-white/40 opacity-60"
          }`}
        >
          <div className="text-3xl mb-1">{earned ? cfg.badgeEmoji : "🔒"}</div>
          <div className="text-xs font-bold text-slate-800">{cfg.badge}</div>
          <div className="text-[10px] uppercase text-slate-500">{cfg.range}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- Root ----------
function Index() {
  const [age, setAge] = useState<AgeKey | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const k = localStorage.getItem("aigenie:gemini_key") || "";
    setApiKey(k);
    if (!k) setSettingsOpen(true);
  }, []);

  function saveKey(k: string) {
    setApiKey(k);
    localStorage.setItem("aigenie:gemini_key", k);
  }

  return (
    <>
      {age === null ? (
        <Landing onSelect={setAge} />
      ) : (
        <LevelPage
          ageKey={age}
          onBack={() => setAge(null)}
          apiKey={apiKey}
          openSettings={() => setSettingsOpen(true)}
        />
      )}
      <ApiKeyModal
        open={settingsOpen}
        initialValue={apiKey}
        onSave={saveKey}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
