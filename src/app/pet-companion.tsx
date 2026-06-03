"use client";

import React, { useEffect, useState, useRef } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";

export default function PetCompanion() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<any>(null);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  
  const bubbleTimeout = useRef<NodeJS.Timeout | null>(null);
  const progressiveTimeout = useRef<NodeJS.Timeout | null>(null);
  const currentStage = useRef(0);
  const isPriorityBubbleActive = useRef(false);

  // Re-ordered pool: Your favorite vibe message is now locked at index 0 (Stage 0 -> 4 seconds)
  const idleTimelinePhrases = [
    "I'm just vibing down here, don't mind me. 🎧",               // Stage 0: 4 seconds (First message!)
    "Still here, bro? 👀",                                      // Stage 1: +6 seconds
    "Yo, you space out? haha",                                  // Stage 2: +8 seconds
    "Take your time reading, no rush. ☕",                       // Stage 3: +10 seconds
    "Still kicking? Just checking in! 🙌",                      // Stage 4: +12 seconds
    "This section looks clean, bro. 🔥",                         // Stage 5: +12 seconds
    "Let me know when you're ready to scroll! 🐕",               // Stage 6: +12 seconds
    "Pretty chill layout, not gonna lie. 🎨",                   // Stage 7: +12 seconds
    "You building a backend or writing an essay? joke lol 💻",   // Stage 8: +12 seconds
    "Alright, you definitely walked away to grab a snack. 🍕"     // Stage 9: +12 seconds
  ];

  useEffect(() => {
    audioRef.current = new Audio("/audio/bg-lofi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;

    resetProgressiveIdle();

    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (progressiveTimeout.current) clearTimeout(progressiveTimeout.current);
      if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
    };
  }, []);

  const resetProgressiveIdle = () => {
    if (progressiveTimeout.current) clearTimeout(progressiveTimeout.current);
    currentStage.current = 0; 

    queueNextStage(4000); // 4-second initial wait trigger
  };

  const queueNextStage = (delayMs: number) => {
    if (progressiveTimeout.current) clearTimeout(progressiveTimeout.current);

    progressiveTimeout.current = setTimeout(() => {
      if (!isPriorityBubbleActive.current) {
        const stageIdx = currentStage.current;
        const phrase = idleTimelinePhrases[Math.min(stageIdx, idleTimelinePhrases.length - 1)];
        
        setBubbleText(phrase);
        setShowBubble(true);

        if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
        bubbleTimeout.current = setTimeout(() => {
          setShowBubble(false);
        }, 2500);
      }

      currentStage.current += 1;
      const nextStage = currentStage.current;

      // Your requested interval timing pipeline
      let nextDelay = 12000; 
      if (nextStage === 1) nextDelay = 6000;       // 6 seconds
      else if (nextStage === 2) nextDelay = 8000;  // 8 seconds
      else if (nextStage === 3) nextDelay = 10000; // 10 seconds

      queueNextStage(nextDelay);
    }, delayMs);
  };

  useEffect(() => {
    const handleGlobalTyping = (e: KeyboardEvent) => {
      if (e.key.length > 1) return; 
      resetProgressiveIdle(); 
      
      const coolPhrases = [
        "Damn, you type fast, bro! 🔥",
        "Writing some clean code right there... 👀",
        "Keep cooking! 🍳",
        "Let's go! Code mode activated. ⚡"
      ];
      
      if (Math.random() < 0.15) {
        triggerPriorityBubble(coolPhrases[Math.floor(Math.random() * coolPhrases.length)]);
      }
    };

    const handleTabFocus = () => {
      resetProgressiveIdle();
      const returnPhrases = [
        "Welcome back, bro! Missed you. 🙌",
        "Yo! Where did you wander off to?",
        "Ah, you're back! Let's keep exploring. 🚀",
        "Back to the grind! Let's get it. 💪"
      ];
      triggerPriorityBubble(returnPhrases[Math.floor(Math.random() * returnPhrases.length)]);
    };

    window.addEventListener("keydown", handleGlobalTyping);
    window.addEventListener("focus", handleTabFocus);

    return () => {
      window.removeEventListener("keydown", handleGlobalTyping);
      window.removeEventListener("focus", handleTabFocus);
    };
  }, []);

  useEffect(() => {
    const handleScrollVelocity = () => {
      resetProgressiveIdle(); 
      
      const currentScrollY = window.scrollY;
      const currentTimestamp = performance.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = currentTimestamp - lastTimestamp.current;

      if (deltaTime > 60) {
        const velocity = deltaY / deltaTime;

        if (velocity > 4.5) {
          triggerPriorityBubble("Whoa, slow down, bro! You're flying! 🏎️");
          if (playerRef.current) playerRef.current.setSpeed(2.0);
        }

        lastScrollY.current = currentScrollY;
        lastTimestamp.current = currentTimestamp;
      }
    };

    window.addEventListener("scroll", handleScrollVelocity, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollVelocity);
  }, []);

  const triggerPriorityBubble = (text: string) => {
    isPriorityBubbleActive.current = true;
    if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
    
    setBubbleText(text);
    setShowBubble(true);

    bubbleTimeout.current = setTimeout(() => {
      setShowBubble(false);
      isPriorityBubbleActive.current = false;
      if (playerRef.current) playerRef.current.setSpeed(1.0);
    }, 2800);
  };

  const handleLofiToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetProgressiveIdle();

    if (!audioRef.current) return;

    if (isLofiPlaying) {
      audioRef.current.pause();
      setIsLofiPlaying(false);
      triggerPriorityBubble("Music paused... standing by. ⏸️");
    } else {
      audioRef.current.play()
        .then(() => {
          setIsLofiPlaying(true);
          triggerPriorityBubble("Vibe mode: ON! Enjoy the lofi. 🎵");
        })
        .catch(() => {
          triggerPriorityBubble("Click the page once first to unlock audio! 🎧");
        });
    }
  };

  return (
    <div className="fixed bottom-16 right-12 z-50 flex flex-col items-end space-y-3 select-none">
      
      <div 
        className={`transition-all duration-300 transform font-sans text-xs px-4 py-2.5 rounded-xl border bg-zinc-950/95 border-zinc-800 text-zinc-100 font-medium shadow-2xl flex items-center gap-2 max-w-[280px] text-center pointer-events-none tracking-wide
          ${showBubble ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
      >
        <span className="leading-normal">{bubbleText}</span>
      </div>

      <div className="flex items-center gap-3">
        
        <button
          onClick={handleLofiToggle}
          className={`p-2.5 rounded-full bg-zinc-950/90 border shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto
            ${isLofiPlaying ? "text-emerald-400 border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-zinc-500 border-zinc-800 hover:text-zinc-300"}`}
        >
          {isLofiPlaying ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400/80">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <div 
          onClick={handleLofiToggle}
          onMouseEnter={() => !showBubble && (setBubbleText("Want to experience lofi music? 🎧"), setShowBubble(true))}
          onMouseLeave={() => bubbleText.includes("lofi music") && setShowBubble(false)}
          className="w-36 h-36 cursor-pointer transition-transform duration-200 origin-bottom hover:scale-105 active:scale-95 pointer-events-auto filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
        >
          <DotLottiePlayer
            lottieRef={playerRef}
            src="/animations/happy_dog.lottie"
            autoplay
            loop
          />
        </div>

      </div>
    </div>
  );
}