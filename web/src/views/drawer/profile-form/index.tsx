import { useTranslation } from "react-i18next";
import Input from "@/components/input";
import Avatar from "@/components/avatar";
import { useSession } from "@/contexts/session";
import { getInitial } from "@/domain/user";

export default function ProfileForm() {
  const { t } = useTranslation();
  const { user } = useSession();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3.5 p-4 bg-canvas rounded-[14px]">
        <Avatar initial={getInitial(user.name)} size="xl" />
        <div>
          <div className="text-cta font-semibold text-espresso mb-0.5">
            {user.name}
          </div>
          <div className="text-fine text-dust">{user.email}</div>
        </div>
      </div>
      <Input label={t("drawer.fields.fullName")} value={user.name} readOnly disabled />
      <Input
        label={t("auth.fields.email")}
        type="email"
        value={user.email}
        readOnly
        disabled
      />
    </div>
  );
}
