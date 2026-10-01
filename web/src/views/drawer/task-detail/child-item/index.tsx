import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";
import Badge from "@/components/badge";
import type { ChildItemProps } from "./types";

export default function ChildItem({ kind, item, onOpen }: ChildItemProps) {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={onOpen}
      className="w-full text-left bg-canvas rounded-item px-3.25 py-2.75 mb-1.5 hover:bg-shell transition-colors"
    >
      <div className="text-fine font-medium text-espresso mb-1.5 line-clamp-2">
        {item.description}
      </div>
      <div className="flex items-center justify-between">
        <Badge tone={kind === "bug" ? "bug" : "impro"}>
          {item.function_points}fp
        </Badge>
        <span
          className={cn(
            "text-caption",
            kind === "bug" ? "text-bug" : "text-dust",
          )}
        >
          {formatDate(item.limit_date, i18n.language)}
        </span>
      </div>
    </button>
  );
}
