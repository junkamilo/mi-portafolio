"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SKILL_CATEGORIES, type SkillItem } from "@/src/config/skills-data";
import { TiltCard } from "@/src/components/motion/TiltCard";
import { RevealGroup, RevealItem, RevealTitle } from "@/src/components/motion/Reveal";
import { SectionTransition } from "@/src/components/motion/SectionTransition";
import { useFinePointer } from "@/src/hooks/use-media-query";
import { cn } from "@/lib/utils";

function SkillChip({
  skill,
  open,
  onToggle,
}: {
  skill: SkillItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.92 }}
        aria-expanded={open}
        className={cn(
          "rounded-md px-2.5 py-1 text-xs uppercase tracking-wide transition-colors",
          open
            ? "bg-brand-500 text-white"
            : "bg-white/5 text-white/75 hover:bg-white/10 focus-visible:bg-white/10",
        )}
      >
        {skill.name}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute left-0 top-full z-30 mt-2 w-56 rounded-xl glass bg-ink-900/95 p-3 text-xs shadow-xl"
          >
            <p className="mb-1.5 font-semibold text-brand-300">Dónde lo usé</p>
            <ul className="space-y-1 text-white/70">
              {skill.usedIn.map((u, i) => (
                <motion.li
                  key={u}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  • {u}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const fine = useFinePointer();
  const [active, setActive] = useState(SKILL_CATEGORIES[0].id);
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSkill(null);
    const onClick = () => setOpenSkill(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const activeCategory =
    SKILL_CATEGORIES.find((c) => c.id === active) ?? SKILL_CATEGORIES[0];

  return (
    <SectionTransition id="skills" className="py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <RevealTitle
            text="Habilidades técnicas"
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl"
          />
          <p className="max-w-2xl text-lg text-white/60">
            Las herramientas con las que trabajo a diario, en proyectos reales y en
            producción. Haz clic en un chip para ver dónde lo usé.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Categorías de habilidades"
          className="mb-10 flex snap-x gap-1 overflow-x-auto rounded-full glass p-1 md:mx-auto md:w-fit md:flex-wrap md:justify-center"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => {
                setActive(cat.id);
                setOpenSkill(null);
              }}
              className="relative snap-start whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors aria-selected:text-white"
            >
              {active === cat.id && (
                <motion.span
                  layoutId="skills-tab"
                  className="absolute inset-0 rounded-full bg-brand-500 shadow-[0_0_24px_-4px_rgb(139_92_246/0.9)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {fine ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category) => {
              const isActive = category.id === active;
              return (
                <TiltCard
                  key={category.id}
                  className={cn(
                    "h-full transition-opacity duration-300",
                    isActive ? "border-glow opacity-100" : "opacity-40",
                  )}
                >
                  <CategoryBody
                    category={category}
                    openSkill={openSkill}
                    setOpenSkill={setOpenSkill}
                  />
                </TiltCard>
              );
            })}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard className="border-glow">
                <CategoryBody
                  category={activeCategory}
                  openSkill={openSkill}
                  setOpenSkill={setOpenSkill}
                />
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </SectionTransition>
  );
}

function CategoryBody({
  category,
  openSkill,
  setOpenSkill,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  openSkill: string | null;
  setOpenSkill: (v: string | null) => void;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col space-y-6 p-8">
      <div className="flex size-12 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-300">
        <category.icon size={24} />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">{category.label}</h3>
        <p className="text-sm leading-relaxed text-white/60">{category.description}</p>
      </div>
      <RevealGroup className="mt-auto flex flex-wrap gap-2 pt-4" stagger={0.04}>
        {category.skills.map((skill) => (
          <RevealItem key={skill.name}>
            <div
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <SkillChip
                skill={skill}
                open={openSkill === `${category.id}-${skill.name}`}
                onToggle={() =>
                  setOpenSkill(
                    openSkill === `${category.id}-${skill.name}`
                      ? null
                      : `${category.id}-${skill.name}`,
                  )
                }
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
