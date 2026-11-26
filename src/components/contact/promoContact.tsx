"use client";
import { useState } from "react";
import style from "@/styles/headermobile/headermobile.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/common/fx/fx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 500;

type Status = "idle" | "sending" | "sent";

export default function PromoContact() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ message: false, email: false });
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(0);

  const emailOk = EMAIL_RE.test(email.trim());
  const messageOk = message.trim().length >= 3;
  const emailErr = touched.email && !emailOk;
  const messageErr = touched.message && !messageOk;

  // Отправки на сервер нет — только локальная анимация успешной отправки.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!emailOk || !messageOk) {
      setTouched({ message: true, email: true });
      setShake((s) => s + 1);
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1400);
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
      setEmail("");
      setTouched({ message: false, email: false });
    }, 4200);
  };

  const field = (err: boolean, ok: boolean) =>
    `${style.input} contact-field ${err ? "is-error" : ""} ${ok ? "is-ok" : ""}`;

  return (
    <main className="mx-auto">
      <motion.form
        noValidate
        onSubmit={onSubmit}
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, type: "spring" }}
        className="w-full h-[100vh] flex flex-col gap-[20px] justify-center items-center relative"
      >
        <motion.div
          key={`m${shake}`}
          animate={shake > 0 && messageErr ? { x: [0, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-[80%] md:w-[600px]"
        >
          <textarea
            rows={6}
            cols={40}
            placeholder="Message..."
            aria-label="Сообщение"
            aria-invalid={messageErr}
            maxLength={MAX}
            value={message}
            disabled={status !== "idle"}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            className={`${field(messageErr, touched.message && messageOk)} w-full bg-[var(--second-color)] border-[2px] border-[var(--text-color)] h-[400px] md:h-[250px] resize-none text-[var(--on-second)] px-[10px] py-[8px] outline-none rounded-[8px] `}
          />
          <span className="absolute right-[12px] bottom-[10px] text-[12px] text-[var(--on-second)] opacity-60 pointer-events-none">
            {message.length}/{MAX}
          </span>
        </motion.div>
        <motion.div
          key={`e${shake}`}
          animate={shake > 0 && emailErr ? { x: [0, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-[80%] md:w-[600px]"
        >
          <input
            type="email"
            placeholder="Gmail..."
            aria-label="Email"
            aria-invalid={emailErr}
            value={email}
            disabled={status !== "idle"}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`${field(emailErr, emailOk)} w-full py-[8px] pl-[10px] pr-[40px] outline-none text-[var(--on-second)] rounded-[8px] bg-[var(--second-color)] border-[2px] border-[var(--text-color)]`}
          />
          <AnimatePresence>
            {emailOk && (
              <motion.i
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="fi fi-rr-check absolute right-[12px] top-1/2 -translate-y-1/2 h-[18px] text-[16px] text-[var(--on-second)]"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(emailErr || messageErr) && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-[4px] top-[calc(100%+6px)] text-[13px] tracking-[1px] text-[var(--text-color)]"
              >
                {emailErr ? "Введите корректный email" : "Напишите хотя бы пару слов"}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <Magnetic strength={0.3} className="mt-[14px]">
          <button
            type="submit"
            disabled={status !== "idle"}
            aria-live="polite"
            className={`send-btn group w-[200px] h-[60px] justify-center cursor-pointer flex  items-center relative overflow-hidden bg-transparent border-[2px] border-[var(--text-color)] ${
              status !== "idle" ? "is-busy" : ""
            }`}
          >
            <div
              className={`left-[2px] top-[2px] bottom-[2px] absolute duration-500 bg-[var(--second-color)] ${
                status !== "idle" ? "w-[calc(100%-4px)]" : "w-[5px] group-hover:w-[calc(100%-4px)]"
              }`}
            ></div>
            <AnimatePresence mode="wait" initial={false}>
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="relative flex flex-row justify-center items-center z-[5]"
                >
                  <p className="text-[16px] tracking-[2px] text-[var(--second-color)] group-hover:text-[var(--on-second)] duration-300">
                    ОТПРАВИТЬ
                  </p>
                  <i className="fi fi-rs-caret-right text-[20px] h-[23px] text-[var(--second-color)] group-hover:text-[var(--on-second)] group-hover:translate-x-[4px] duration-300"></i>
                </motion.div>
              )}
              {status === "sending" && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="relative z-[5] flex gap-[6px]"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block w-[8px] h-[8px] rounded-full bg-[var(--on-second)]"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </motion.div>
              )}
              {status === "sent" && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative z-[5] flex items-center gap-[8px] text-[var(--on-second)]"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <motion.path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.1 }}
                    />
                  </svg>
                  <span className="text-[16px] tracking-[2px]">ОТПРАВЛЕНО</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </Magnetic>

        {/* Самолётик улетает после «отправки» */}
        <AnimatePresence>
          {status === "sent" && (
            <motion.i
              key="plane"
              aria-hidden
              className="fi fi-rr-paper-plane pointer-events-none absolute left-1/2 top-[68%] text-[34px] h-[36px] text-[var(--text-color)]"
              initial={{ x: -20, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
              animate={{ x: 420, y: -380, opacity: 0, rotate: 20, scale: 1.4 }}
              transition={{ duration: 1.4, ease: [0.5, 0, 0.75, 0] }}
            />
          )}
        </AnimatePresence>
      </motion.form>
    </main>
  );
}
