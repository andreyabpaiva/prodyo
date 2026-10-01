import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DRAWER_DEFAULT_WIDTH, DRAWER_DURATION, DRAWER_EASE } from "./constants";
import type { DrawerProps } from "./types";

export default function Drawer({
  open,
  onClose,
  title,
  subtitle,
  badge,
  width = DRAWER_DEFAULT_WIDTH,
  onBack,
  footer,
  children,
}: DrawerProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={onClose}
            className="fixed inset-0 bg-espresso/25 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DRAWER_DURATION }}
          />
          <motion.aside
            key="panel"
            className="fixed top-0 right-0 h-full max-w-full bg-paper shadow-drawer z-50 flex flex-col"
            style={{ width }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DRAWER_DURATION, ease: DRAWER_EASE }}
          >
            <header className="px-5.5 py-4 border-b border-shell flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                {onBack && (
                  <button
                    onClick={onBack}
                    aria-label={t("common.back")}
                    className="text-base text-dust hover:text-espresso"
                  >
                    ←
                  </button>
                )}
                {badge}
              </div>
              <button
                onClick={onClose}
                aria-label={t("common.close")}
                className="text-2xl leading-none text-dust hover:text-espresso px-2"
              >
                ×
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 pt-5.5 pb-7">
              <h3 className="font-lora text-logo font-semibold text-espresso leading-snug mb-1.5">
                {title}
              </h3>
              {subtitle && (
                <p className="text-fine text-dust leading-relaxed mb-5.5">
                  {subtitle}
                </p>
              )}
              {children}
            </div>
            {footer && (
              <div className="flex-shrink-0 px-6 py-4 border-t border-shell flex gap-2.5 bg-paper">
                {footer}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
