import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import { formatTags, parseTags } from "@/domain/tags";
import { useCreateProject } from "@/services/mutations/projects/use-create-project";
import { useUpdateProject } from "@/services/mutations/projects/use-update-project";
import type { ProjectPayload } from "@/services/requests/projects/types";
import { DRAWER_FORM_ID } from "../constants";
import type { ProjectFormProps, ProjectFormValues } from "./types";

export default function ProjectForm({ source, onSaved }: ProjectFormProps) {
  const { t } = useTranslation();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      name: source?.name ?? "",
      description: source?.description ?? "",
      tags: formatTags(source?.tags ?? []),
    },
  });

  const onSubmit = handleSubmit((values) => {
    const payload: ProjectPayload = {
      name: values.name.trim(),
      description: values.description.trim(),
      tags: parseTags(values.tags),
    };
    const options = {
      onSuccess: onSaved,
      onError: () => toast.error(t("drawer.error")),
    };
    if (source) {
      updateProject.mutate({ projectId: source.id, payload }, options);
      return;
    }
    createProject.mutate(payload, options);
  });

  return (
    <form
      id={DRAWER_FORM_ID}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        label={t("drawer.fields.name")}
        placeholder="API Redesign"
        error={errors.name?.message}
        {...register("name", {
          required: t("auth.validation.required"),
          validate: (value) =>
            value.trim().length > 0 || t("auth.validation.required"),
        })}
      />
      <Textarea
        label={t("drawer.fields.description")}
        placeholder={t("drawer.placeholders.projectDescription")}
        {...register("description")}
      />
      <Input
        label={t("drawer.fields.tags")}
        placeholder="backend, go, api"
        {...register("tags")}
      />
    </form>
  );
}
