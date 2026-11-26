"use client";

import { useState } from "react";
import { Nunito_Sans } from "next/font/google";
import { motion } from "framer-motion";
const nuni = Nunito_Sans({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export default function Contact() {
  const [Contact, setCoontact] = useState([
    {
      id: 1,
      icon: <i className="fi fi-brands-telegram"></i>,
      assets: `https://t.me/OffRealm`,
      text: "Telegram",
    },
    {
      id: 2,
      icon: <i className="fi fi-brands-whatsapp"></i>,
      assets: `https://api.whatsapp.com/send?phone=996500254220`,
      text: "Whatsapp",
    },
    {
      id: 3,
      icon: <i className="fi fi-brands-instagram"></i>,
      assets: `https://www.instagram.com/ku._.ch/`,
      text: "Instagram",
    },
    {
      id: 4,
      icon: <i className="fi fi-brands-github"></i>,
      assets: `https://github.com/Diligen1`,
      text: "Github",
    },
    {
      id: 5,
      icon: <i className="fi fi-brands-gitlab"></i>,
      assets: `https://gitlab.com/kuba.2000.0505.kg`,
      text: "Gitlab",
    },
  ]);
  return (
    <main className="mx-auto">
      <div className="w-[100%] px-[20px] md:w-[80%] h-[55vh] flex flex-wrap justify-center items-center gap-[20px] md:text-left text-center">
        {Contact.map((block, index) => (
          <motion.a
            href={block.assets}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`contact-link w-full h-[60px] bg-[var(--text-color)] rounded-[8px] gap-[10px] flex flex-row justify-center items-center`}
          >
            <div className="contact-icon text-[22px] h-[26px] text-[var(--background-color)]">
              {block.icon}
            </div>
            <p
              className={`${nuni.className} text-[16px] text-[var(--background-color)]`}
            >
              {block.text}
            </p>
            <i className="contact-arrow fi fi-rr-arrow-small-right text-[18px] h-[20px] text-[var(--background-color)]"></i>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
