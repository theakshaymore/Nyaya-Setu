import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HeroMockup() {
  return (
    <div className="panel relative hidden h-full min-h-[520px] overflow-hidden lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(150,178,144,0.22),_transparent_42%)]" />
      <div className="absolute left-8 right-8 top-8">
        <div className="panel px-5 py-4">
          <p className="eyebrow">What NyayaSetu helps you do</p>
          <div className="mt-4 grid gap-3">
            {[
              "Ask grounded Indian law questions",
              "Draft FIR complaints from incident facts",
              "Check bail position and documents",
              "Simplify dense legal clauses",
              "Understand rights in common situations",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[12px] border border-border-subtle px-4 py-3 surface-soft"
              >
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-surface-raised" />
                <p className="text-sm text-text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 right-10">
        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[180px_1fr]">
            <div className="border-r border-border-subtle px-4 py-5 surface-soft">
              <p className="text-lg font-semibold text-text-primary">
                NyayaSetu
              </p>
              <div className="mt-5 space-y-2">
                {[
                  "Legal Chat",
                  "FIR Draft",
                  "Bail Checker",
                  "Doc Simplifier",
                  "Know Your Rights",
                ].map((label, index) => (
                  <div
                    key={label}
                    className={`rounded-[10px] px-3 py-2 text-sm ${
                      index === 1
                        ? "border border-surface-raised surface-strong text-text-primary"
                        : "border border-transparent text-text-secondary"
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 p-4 md:grid-cols-2">
              <div className="panel px-4 py-4">
                <p className="eyebrow">Incident details</p>
                <div className="mt-4 space-y-2">
                  <div className="h-10 rounded-[10px] surface-soft" />
                  <div className="h-10 rounded-[10px] surface-soft" />
                  <div className="h-24 rounded-[10px] surface-soft" />
                </div>
              </div>
              <div className="panel px-4 py-4">
                <p className="eyebrow">Generated output</p>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-1/2 rounded-full bg-surface-raised/40" />
                  <div className="h-3 rounded-full surface-soft" />
                  <div className="h-3 rounded-full surface-soft" />
                  <div className="h-3 w-4/5 rounded-full surface-soft" />
                  <div className="mt-4 h-20 rounded-[10px] surface-soft" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ theme, onToggleTheme }) {
  const navigate = useNavigate();

  function handleKnowMore() {
    document.getElementById("about-project")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[26px] font-semibold text-text-primary">
              NyayaSetu
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Indian legal guidance workspace
            </p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span>
          </button>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <p className="eyebrow">Indian legal workflow assistant</p>
            <h1 className="max-w-2xl text-[42px] font-semibold leading-[0.98] text-text-primary md:text-[56px]">
              Ask, draft, assess, and act with more legal clarity
            </h1>
            <p className="max-w-xl text-base leading-7 text-text-secondary">
              NyayaSetu brings legal chat, FIR drafting, bail analysis, document
              simplification, and rights guidance into one practical workspace.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={handleKnowMore}
              >
                Know more
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Chat", "Understand relevant Indian law faster"],
                ["Draft", "Create structured FIR complaints"],
                ["Rights", "Get scenario-based next steps"],
              ].map(([title, copy], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * (index + 1) }}
                  className="panel px-4 py-4"
                >
                  <p className="eyebrow">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {copy}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
          >
            <HeroMockup />
          </motion.div>
        </section>

        <section id="about-project" className="mt-20 space-y-6">
          <div className="max-w-3xl">
            <p className="eyebrow">What the product does</p>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.02] text-text-primary">
              A legal assistance dashboard built around real user tasks
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              NyayaSetu is not just a chatbot. It is a multi-tool legal
              assistant for Indian law workflows, designed to help users move
              from questions to structured outputs and next actions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Legal Chat",
                "Ask questions about IPC, CrPC, constitutional rights, and legal procedure in plain language.",
              ],
              [
                "FIR Draft",
                "Turn incident details into a formal FIR draft with suggested sections and copy-ready output.",
              ],
              [
                "Bail Checker",
                "Check whether an offence is bailable, what court usually handles it, and what documents are needed.",
              ],
              [
                "Doc Simplifier",
                "Paste agreements, notices, or contracts and get summaries, clause breakdowns, and risk flags.",
              ],
              [
                "Know Your Rights",
                "Choose common scenarios like police encounter, landlord dispute, salary issue, or consumer complaint.",
              ],
              [
                "Admin LLM Control",
                "Switch between cloud inference and a local Ollama model through the hidden admin control panel.",
              ],
            ].map(([title, copy]) => (
              <div key={title} className="panel px-5 py-5">
                <p className="text-lg font-semibold text-text-primary">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-border-subtle py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-text-primary">
                NyayaSetu
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Built for Indian legal workflows. Not a substitute for qualified
                legal advice.
              </p>
            </div>
            <div className="text-sm text-text-secondary">
              <span
                onClick={() =>
                  window.open("https://github.com/theakshaymore", "_blank")
                }
                className="cursor-pointer hover:underline"
              >
                Akshay More 🧑‍💻
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
