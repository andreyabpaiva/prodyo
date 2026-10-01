import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import { fromDateInputValue, toDateInputValue } from "@/lib/date";
import { toNumber } from "@/lib/number";
import { useCreateBug } from "@/services/mutations/bugs/use-create-bug";
import { useUpdateBug } from "@/services/mutations/bugs/use-update-bug";
import { useCreateImprovement } from "@/services/mutations/improvements/use-create-improvement";
import { useUpdateImprovement } from "@/services/mutations/improvements/use-update-improvement";
import type { BugPayload } from "@/services/requests/bugs/types";
import { DRAWER_FORM_ID } from "../constants";
import { TASK_CHILD_PLACEHOLDER_KEY } from "./constants";
import type { TaskChildFormProps, TaskChildFormValues } from "./types";

export default function TaskChildForm({
  kind,
  taskRef,
  source,
  parentTitle,
  onSaved,
}: TaskChildFormProps) {
  const { t } = useTranslation();
  const createBug = useCreateBug();
  const updateBug = useUpdateBug();
  const createImprovement = useCreateImprovement();
  const updateImprovement = useUpdateImprovement();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskChildFormValues>({
    defaultValues: {
      description: source?.description ?? "",
      limitDate: toDateInputValue(source?.limit_date),
      functionPoints: source?.function_points ?? 0,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const payload: BugPayload = {
      description: values.description.trim(),
      function_points: values.functionPoints,
      limit_date: fromDateInputValue(values.limitDate),
    };
    const options = {
      onSuccess: onSaved,
      onError: () => toast.error(t("drawer.error")),
    };
    if (kind === "bug") {
      if (source) {
        updateBug.mutate({ ...taskRef, bugId: source.id, payload }, options);
        return;
      }
      createBug.mutate({ ...taskRef, payload }, options);
      return;
    }
    if (source) {
      updateImprovement.mutate(
        { ...taskRef, improvementId: source.id, payload },
        options,
      );
      return;
    }
    createImprovement.mutate({ ...taskRef, payload }, options);
  });

  return (
    <form
      id={DRAWER_FORM_ID}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <Textarea
        label={t("drawer.fields.description")}
        placeholder={t(TASK_CHILD_PLACEHOLDER_KEY[kind])}
        error={errors.description?.message}
        {...register("description", {
          required: t("auth.validation.required"),
          validate: (value) =>
            value.trim().length > 0 || t("auth.validation.required"),
        })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t("drawer.fields.dueDate")}
          type="date"
          error={errors.limitDate?.message}
          {...register("limitDate", {
            required: t("auth.validation.required"),
          })}
        />
        <Input
          label={t("metrics.fp")}
          type="number"
          min={0}
          step={0.5}
          error={errors.functionPoints?.message}
          {...register("functionPoints", {
            setValueAs: toNumber,
            validate: (value) =>
              (!Number.isNaN(value) && value >= 0) ||
              t("drawer.validation.nonNegative"),
          })}
        />
      </div>
      {parentTitle && (
        <div className="bg-canvas rounded-input px-3.5 py-3 text-fine text-dust leading-relaxed">
          {t("drawer.parentLine", { title: parentTitle })}
        </div>
      )}
    </form>
  );
}
