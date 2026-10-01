import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import Select from "@/components/select";
import { fromDateInputValue, toDateInputValue } from "@/lib/date";
import {
  ITERATION_STATUSES,
  ITERATION_STATUS_LABEL_KEY,
} from "@/domain/status";
import { useCreateIteration } from "@/services/mutations/iterations/use-create-iteration";
import { useUpdateIteration } from "@/services/mutations/iterations/use-update-iteration";
import type { CreateIterationPayload } from "@/services/requests/iterations/types";
import StatusOptions from "../status-options";
import { DRAWER_FORM_ID } from "../constants";
import type { IterationFormProps, IterationFormValues } from "./types";

export default function IterationForm({
  projectId,
  source,
  nextIncrement,
  onSaved,
}: IterationFormProps) {
  const { t } = useTranslation();
  const createIteration = useCreateIteration();
  const updateIteration = useUpdateIteration();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IterationFormValues>({
    defaultValues: {
      goal: source?.goal ?? "",
      startDate: toDateInputValue(source?.start_at),
      endDate: toDateInputValue(source?.end_at),
      status: source?.status ?? "Planned",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const payload: CreateIterationPayload = {
      goal: values.goal.trim(),
      start_at: fromDateInputValue(values.startDate),
      end_at: fromDateInputValue(values.endDate),
      increment: source?.increment ?? nextIncrement,
    };
    const options = {
      onSuccess: onSaved,
      onError: () => toast.error(t("drawer.error")),
    };
    if (source) {
      updateIteration.mutate(
        {
          projectId,
          iterationId: source.id,
          payload: { ...payload, status: values.status },
        },
        options,
      );
      return;
    }
    createIteration.mutate({ projectId, payload }, options);
  });

  return (
    <form
      id={DRAWER_FORM_ID}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        label={t("drawer.fields.goal")}
        placeholder="Core endpoints"
        {...register("goal")}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t("drawer.fields.startDate")}
          type="date"
          error={errors.startDate?.message}
          {...register("startDate", {
            required: t("auth.validation.required"),
          })}
        />
        <Input
          label={t("drawer.fields.endDate")}
          type="date"
          error={errors.endDate?.message}
          {...register("endDate", {
            required: t("auth.validation.required"),
            validate: (value) =>
              value > getValues("startDate") ||
              t("drawer.validation.endAfterStart"),
          })}
        />
      </div>
      {source && (
        <Select label={t("drawer.fields.status")} {...register("status")}>
          <StatusOptions
            values={ITERATION_STATUSES}
            labelKeys={ITERATION_STATUS_LABEL_KEY}
          />
        </Select>
      )}
    </form>
  );
}
