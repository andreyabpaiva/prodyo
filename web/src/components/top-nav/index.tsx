import { useTranslation } from "react-i18next";
import Logo from "@/components/logo";
import LangToggle from "@/components/lang-toggle";
import Avatar from "@/components/avatar";
import { getFirstName, getInitial } from "@/domain/user";
import type { TopNavProps } from "./types";

export default function TopNav({
  center,
  userName,
  onLogoClick,
  onProfile,
  onLogout,
}: TopNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="h-[3.875rem] bg-paper border-b border-shell px-6 sm:px-10 flex items-center gap-4 flex-shrink-0">
      <button onClick={onLogoClick} className="flex-shrink-0">
        <Logo size="md" />
      </button>
      <div className="flex items-center gap-2 flex-1 min-w-0">{center}</div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <LangToggle />
        <button
          onClick={onProfile}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-canvas rounded-full hover:bg-shell transition-colors"
        >
          <Avatar initial={getInitial(userName)} size="sm" />
          <span className="hidden sm:block text-fine font-medium text-espresso">
            {getFirstName(userName)}
          </span>
          <span className="text-micro text-dust">▾</span>
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            className="text-caption text-dust hover:text-brand px-1.5 py-1 transition-colors"
          >
            {t("nav.logout")}
          </button>
        )}
      </div>
    </nav>
  );
}
