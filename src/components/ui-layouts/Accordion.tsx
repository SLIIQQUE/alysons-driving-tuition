"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ question, answer, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div className="border-b border-[#333] last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#7c3aed] font-heading font-bold text-lg">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading font-semibold text-lg text-white group-hover:text-[#a78bfa] transition-colors">
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4 text-[#7c3aed]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pb-6 pl-12">
              <p className="text-[#a3a3a3] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function ModernAccordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("divide-y divide-[#333]", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}

interface IconAccordionProps {
  items: { question: string; answer: string; icon?: React.ReactNode }[];
  className?: string;
}

export function IconAccordion({ items, className }: IconAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden transition-all",
            openIndex === index ? "border-[#7c3aed]" : ""
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {item.icon && (
                <div className="w-10 h-10 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
              )}
              <span className="font-heading font-semibold text-white">{item.question}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-5 h-5 text-[#7c3aed]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-[#a3a3a3] pl-14">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
