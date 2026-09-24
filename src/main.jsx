import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Globe2, Sparkles, ChevronRight, RotateCcw } from "lucide-react";
import "./styles.css";

const comfortMessages = [
  "أنا جنبك ❤️",
  "هتبقي كويس ينور عيني",
  "انا مقدرش اشوفك كده ومستحملش عليك اي حاجه",
  "هنعدّي اليوم ده سوا يبطتييي🫂",
  "بحبك، حتى في الأيام التقيلة.",
  "وأيوه... لسه مستنية منك اشوف ضحكتك اللي مجننانييي 😌❤️",
];

function FloatingHearts() {
  return (
    <div className="floating-layer" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="float-item"
          initial={{ y: "110vh", x: `${(i * 37) % 100}vw`, opacity: 0 }}
          animate={{
            y: "-15vh",
            opacity: [0, 0.65, 0],
            x: `${((i * 53) % 100) + (i % 2 ? 2 : -2)}vw`,
          }}
          transition={{
            duration: 10 + (i % 5),
            repeat: Infinity,
            delay: i * 0.55,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? "✦" : i % 3 === 1 ? "♡" : "·"}
        </motion.span>
      ))}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [openLetter, setOpenLetter] = useState(false);

  const nextMessage = () => {
    setMessageIndex((current) => (current + 1) % comfortMessages.length);
  };

  const reset = () => {
    setScreen(0);
    setMessageIndex(0);
    setOpenLetter(false);
  };

  const goNext = () => setScreen((current) => Math.min(current + 1, 5));

  return (
    <main className="app">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {screen === 0 && (
          <motion.section
            key="intro"
            className="screen intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="planet"
              animate={{ rotate: 360, y: [0, -8, 0] }}
              transition={{
                rotate: { duration: 16, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              🌍
            </motion.div>

            <motion.div
              className="name-wrap"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.9, type: "spring" }}
            >
              <span className="tiny-line">something made just for</span>
              <h1>Nouryyy <span>❤️</span></h1>
              <p>🌍 my favorite person</p>
            </motion.div>

            <motion.p
              className="intro-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
            >
              A little corner of the internet, just for you...
            </motion.p>

            <motion.button
              className="ghost-button"
              onClick={() => setScreen(1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Open it <Heart size={17} fill="currentColor" />
            </motion.button>

            <motion.div
              className="scroll-hint"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.section>
        )}

        {screen === 1 && (
          <motion.section
            key="sit"
            className="screen message-screen"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
          >
            <div className="mini-icon">🌙</div>
            <p className="eyebrow">hey, Nouryyy...</p>
            <h2>
              عارفة إنك مش أحسن حاجة دلوقتي...
              <br />
              <span>فمش جاية أقولك متزعلش.</span>
            </h2>
            <p className="soft-text">أنا بس جاية أقعد جنبك شوية يعيوني❤️</p>
            <button className="primary-button" onClick={goNext}>
              اقعد معايا 🫂 <ChevronRight size={18} />
            </button>
          </motion.section>
        )}

        {screen === 2 && (
          <motion.section
            key="comfort"
            className="screen message-screen"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
          >
            <motion.div
              className="hug"
              animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🫂
            </motion.div>
            <h2>
              مش لازم تتكلم.
              <br />
              ومش لازم تبقى كويس دلوقتي.
            </h2>
            <p className="soft-text">
              خد نفس بس...
              <br />
              وأنا هنا ❤️
            </p>
            <button className="text-button" onClick={goNext}>
              طيب كمّلي...
            </button>
          </motion.section>
        )}

        {screen === 3 && (
          <motion.section
            key="smile"
            className="screen message-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
          >
            {!openLetter ? (
              <>
                <motion.div
                  className="sparkle-icon"
                  animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <h2>عايز تبتسم؟ 👀</h2>
                <p className="soft-text">عندي حاجة صغيرة كده ليك...</p>
                <button className="primary-button" onClick={() => setOpenLetter(true)}>
                  افتحها ❤️
                </button>
              </>
            ) : (
              <motion.div
                className="letter-card"
                initial={{ opacity: 0, y: 18, rotateX: 0 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
              >
                <div className="letter-top">💌 a tiny reminder</div>
                <p>
                       انا بحبك اووييي ينوري حب مش طبيعي وملوش حدود والله مقدرش اعيش ولا اكمل حياتي من غيرك انا راسمه حياتي دي كلها عليك ومعاك وبيك انا عمري ما تخيلت اني احب حد كده ولا اني اعشق حد كده ولا اني اتاثر باقل حاجه تحصل لحد كده انا بمووت والله لما بيبقي فيك حاجه والدنيا بتقفل وتضلم فوشي انا اسعد لحظات حياتي لما الاقيك فرحان او اسمع صوت ضحكتك انا مش عايزاك تبقي زعلان يروحي والله هتبقي كويس وانا جمبك ومعاك وسندك وضهرك لحد ما نعدي ده كله سوا ينور عيني ونور حياتي كلهاا انا بمووت فييك والله يبطتيي ونونتييي ودادي الصغنونن وجوزي حبيبي روح قلبيي وحته منييي❤️❤️❤️❤️❤️❤️
            
                  <br />
                </p>
                <span>— from the person who loves you</span>
                <button className="text-button" onClick={goNext}>
                  لسه في حاجة أخيرة ✨
                </button>
              </motion.div>
            )}
          </motion.section>
        )}

        {screen === 4 && (
          <motion.section
            key="messages"
            className="screen message-screen"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
          >
            <div className="mini-icon"><Heart size={26} fill="currentColor" /></div>
            <p className="eyebrow">for the heavy moments</p>
            <h2>
              ومهما كان اليوم تقيل وانت مخنوق..
              <br />
              <span>إنت مش لوحدك ينونتييي</span>
            </h2>

            <motion.div
              key={messageIndex}
              className="message-bubble"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {comfortMessages[messageIndex]}
            </motion.div>

            <button className="primary-button" onClick={nextMessage}>
              دوس هنا لو لسه مخنوق 🫂
            </button>

            <p className="counter">{messageIndex + 1} / {comfortMessages.length}</p>

            <button className="text-button" onClick={goNext}>
              آخر حاجة... 🌙
            </button>
          </motion.section>
        )}

        {screen === 5 && (
          <motion.section
            key="final"
            className="screen final-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="final-heart"
              animate={{ scale: [1, 1.13, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              ❤️
            </motion.div>

            <p className="eyebrow">Nouryyy 🌍</p>
            <h2>
              تعالى هنا بقى...
              <br />
              <span>لحد ما أشوفك وأديك الحضن بجد 🫂</span>
            </h2>

            <div className="final-note">
              <Sparkles size={17} />
              <span>هنعدّي اليوم ده سوا.</span>
              <Sparkles size={17} />
            </div>

            <p className="love-signature">I love you. Always. ❤️</p>

            <button className="restart" onClick={reset}>
              <RotateCcw size={15} /> من الأول
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
