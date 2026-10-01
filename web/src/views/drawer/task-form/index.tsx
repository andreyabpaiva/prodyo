import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import Select from "@/components/select";
import { hoursToSeconds, secondsToHours } from "@/lib/duration";
import { toNumber } from "@/lib/number";
import { formatTags, parseTags } from "@/domain/tags";
import { TASK_STATUSES, TASK_STATUS_LABEL_KEY } from "@/domain/status";
import { useCreateTask } from "@/services/mutations/tasks/use-create-task";
import { useUpdateTask } from "@/services/mutations/tasks/use-update-task";
import type { CreateTaskPayload } from "@/services/requests/tasks/types";
import StatusOptions from "../status-options";
import { DRAWER_FORM_ID } from "../constants";
import type { TaskFormProps, TaskFormValues } from "./types";

export default function TaskForm({
  iterationRef,
  source,
  members,
  defaultStatus,
  contextLine,
  onSaved,
}: TaskFormProps) {
  const { t } = useTranslation();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: source?.title ?? "",
      description: source?.description ?? "",
      tags: formatTags(source?.tags ?? []),
      functionPoints: source?.function_points ?? 0,
      expectedHours: secondsToHours(source?.expected_time ?? 0),
      spentHours: secondsToHours(source?.time_spent ?? 0),
      status: source?.status ?? defaultStatus,
      assigneeId: source?.assignee_id ?? "",
    },
  });

  const nonNegative = (value: number) =>
    (!Number.isNaN(value) && value >= 0) || t("drawer.validation.nonNegative");

  const onSubmit = handleSubmit((values) => {
    const payload: CreateTaskPayload = {
      title: values.title.trim(),
      description: values.description.trim(),
      tags: parseTags(values.tags),
      function_points: values.functionPoints,
      expected_time: hoursToSeconds(values.expectedHours),
      assignee_id: values.assigneeId || null,
    };
    const options = {
      onSuccess: onSaved,
      onError: () => toast.error(t("drawer.error")),
    };
    if (source) {
      updateTask.mutate(
        {
          ...iterationRef,
          taskId: source.id,
          payload: {
            ...payload,
            status: values.status,
            time_spent: hoursToSeconds(values.spentHours),
          },
        },
        options,
      );
      return;
    }
    createTask.mutate(
      { ...iterationRef, payload, status: values.status },
      options,
    );
  });

  return (
    <form
      id={DRAWER_FORM_ID}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        label={t("drawer.fields.title")}
        placeholder="Implement JWT auth"
        error={errors.title?.message}
        {...register("title", {
          required: t("auth.validation.required"),
          validate: (value) =>
            value.trim().length > 0 || t("auth.validation.required"),
        })}
      />
      <Textarea
        label={t("drawer.fields.description")}
        placeholder={t("drawer.placeholders.taskDescription")}
        {...register("description")}
      />
      <Input
        label={t("drawer.fields.tags")}
        placeholder="auth, security, backend"
        {...register("tags")}
      />
      <div className="grid grid-cols-3 gap-3">
        <Input
          label={t("metrics.fp")}
          type="number"
          min={0}
          step={0.5}
          error={errors.functionPoints?.message}
          {...register("functionPoints", {
            setValueAs: toNumber,
            validate: nonNegative,
          })}
        />
        <Input
          label={t("drawer.fields.expectedHours")}
          type="number"
          min={0}
          step={0.5}
          error={errors.expectedHours?.message}
          {...register("expectedHours", {
            setValueAs: toNumber,
            validate: nonNegative,
          })}
        />
        <Input
          label={t("drawer.fields.spentHours")}
          type="number"
          min={0}
          step={0.5}
          disabled={!source}
          error={errors.spentHours?.message}
          {...register("spentHours", {
            setValueAs: toNumber,
            validate: nonNegative,
          })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Select label={t("drawer.fields.status")} {...register("status")}>
          <StatusOptions
            values={TASK_STATUSES}
            labelKeys={TASK_STATUS_LABEL_KEY}
          />
        </Select>
        <Select label={t("drawer.fields.assignee")} {...register("assigneeId")}>
          <option value="">{t("drawer.unassigned")}</option>
          {members.map((member) => (
            <option key={member.id} value={member.user_id}>
              {member.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="bg-canvas rounded-input px-3.5 py-3 text-fine text-dust leading-relaxed">
        {contextLine}
      </div>
    </form>
  );
}
