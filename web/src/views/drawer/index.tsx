import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Drawer from "@/components/drawer";
import Badge from "@/components/badge";
import Button from "@/components/button";
import { useDrawer } from "@/contexts/drawer";
import type { DrawerRequest } from "@/contexts/drawer/types";
import { useProject } from "@/services/queries/projects/use-project";
import { useIterations } from "@/services/queries/iterations/use-iterations";
import { useMembers } from "@/services/queries/members/use-members";
import { useTasks } from "@/services/queries/tasks/use-tasks";
import { useBugs } from "@/services/queries/bugs/use-bugs";
import { useImprovements } from "@/services/queries/improvements/use-improvements";
import { useLogout } from "@/services/mutations/auth/use-logout";
import { useDeleteProject } from "@/services/mutations/projects/use-delete-project";
import { useDeleteIteration } from "@/services/mutations/iterations/use-delete-iteration";
import { useDeleteTask } from "@/services/mutations/tasks/use-delete-task";
import { useDeleteBug } from "@/services/mutations/bugs/use-delete-bug";
import { useDeleteImprovement } from "@/services/mutations/improvements/use-delete-improvement";
import TaskDetail from "./task-detail";
import TaskForm from "./task-form";
import TaskChildForm from "./task-child-form";
import ProjectForm from "./project-form";
import IterationForm from "./iteration-form";
import ProfileForm from "./profile-form";
import {
  DRAWER_BADGE,
  DRAWER_FORM_ID,
  DRAWER_PRIMARY_CREATE,
  DRAWER_SAVED,
} from "./constants";

export default function AppDrawer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { request, open, close } = useDrawer();
  const { projectId = "", iterationId = "" } = useParams();
  const [active, setActive] = useState<DrawerRequest | null>(null);
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    if (!request) return;
    setActive(request);
    setOpenCount((count) => count + 1);
  }, [request]);

  const taskRef = { projectId, iterationId, taskId: active?.taskId ?? "" };
  const project = useProject({ projectId });
  const iterations = useIterations({ projectId });
  const members = useMembers({ projectId });
  const tasks = useTasks({ projectId, iterationId });
  const bugs = useBugs(taskRef);
  const improvements = useImprovements(taskRef);
  const isMutating = useIsMutating() > 0;

  const logout = useLogout();
  const deleteProject = useDeleteProject();
  const deleteIteration = useDeleteIteration();
  const deleteTask = useDeleteTask();
  const deleteBug = useDeleteBug();
  const deleteImprovement = useDeleteImprovement();

  if (!active) return null;

  const { kind, mode, taskId, itemId, from } = active;
  const isEdit = mode === "edit";

  const iterationList = iterations.data ?? [];
  const memberList = members.data ?? [];
  const iteration = iterationList.find((item) => item.id === iterationId);
  const detailTask = tasks.data?.find((task) => task.id === taskId);
  const bugSource = bugs.data?.find((bug) => bug.id === itemId);
  const improvementSource = improvements.data?.find(
    (improvement) => improvement.id === itemId,
  );
  const nextIncrement =
    iterationList.reduce((max, item) => Math.max(max, item.increment), 0) + 1;

  const title =
    kind === "taskDetail"
      ? (detailTask?.title ?? "")
      : kind === "profile"
        ? t("drawer.title.profile")
        : t(`drawer.title.${isEdit ? "edit" : "new"}.${kind}`);

  const subtitle =
    kind === "taskDetail"
      ? iteration && project.data
        ? `#${iteration.increment} · ${iteration.goal} — ${project.data.name}`
        : ""
      : t(`drawer.sub.${kind}`);

  const primaryLabel =
    isEdit && kind !== "taskDetail" && kind !== "profile"
      ? t("drawer.primary.save")
      : t(DRAWER_PRIMARY_CREATE[kind]);

  const primaryTone: "brand" | "bug" | "impro" =
    kind === "bug" ? "bug" : kind === "improvement" ? "impro" : "brand";

  const contextLine = t("drawer.contextLine", {
    project: project.data?.name ?? "",
    num: iteration?.increment ?? 0,
    goal: iteration?.goal ?? "",
  });

  const backToDetail = () => open("taskDetail", { taskId });

  const onSaved = () => {
    toast.success(t(DRAWER_SAVED[kind]));
    if (from) {
      backToDetail();
      return;
    }
    close();
  };

  const deleteOptions = (next: () => void) => ({
    onSuccess: () => {
      toast.success(t("drawer.deleted"));
      next();
    },
    onError: () => toast.error(t("drawer.error")),
  });

  const onDelete = () => {
    switch (kind) {
      case "project":
        deleteProject.mutate(
          { projectId },
          deleteOptions(() => {
            close();
            navigate("/projects", { replace: true });
          }),
        );
        return;
      case "iteration":
        deleteIteration.mutate(
          { projectId, iterationId },
          deleteOptions(() => {
            close();
            navigate(`/projects/${projectId}`, { replace: true });
          }),
        );
        return;
      case "task":
        deleteTask.mutate(taskRef, deleteOptions(close));
        return;
      case "bug":
        deleteBug.mutate(
          { ...taskRef, bugId: itemId ?? "" },
          deleteOptions(backToDetail),
        );
        return;
      case "improvement":
        deleteImprovement.mutate(
          { ...taskRef, improvementId: itemId ?? "" },
          deleteOptions(backToDetail),
        );
        return;
      default:
        return;
    }
  };

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        close();
        navigate("/", { replace: true });
      },
    });
  };

  const badge = (
    <Badge tone={DRAWER_BADGE[kind].tone} className="uppercase tracking-wide">
      {t(DRAWER_BADGE[kind].labelKey)}
    </Badge>
  );

  const primaryButton =
    kind === "taskDetail" ? (
      <Button
        className="flex-1"
        onClick={() =>
          open("task", { mode: "edit", taskId, from: "taskDetail" })
        }
      >
        {primaryLabel}
      </Button>
    ) : kind === "profile" ? (
      <Button className="flex-1" disabled={isMutating} onClick={onLogout}>
        {primaryLabel}
      </Button>
    ) : (
      <Button
        className="flex-1"
        tone={primaryTone}
        type="submit"
        form={DRAWER_FORM_ID}
        disabled={isMutating}
      >
        {isMutating ? t("common.loading") : primaryLabel}
      </Button>
    );

  const footer = (
    <>
      {primaryButton}
      {isEdit && kind !== "taskDetail" && (
        <Button
          tone="bug"
          variant="soft"
          disabled={isMutating}
          onClick={onDelete}
        >
          {t("drawer.delete")}
        </Button>
      )}
      <Button variant="soft" tone="neutral" onClick={close}>
        {t("drawer.cancel")}
      </Button>
    </>
  );

  const loading = (
    <div className="text-fine text-dust py-2">{t("common.loading")}</div>
  );

  const renderContent = () => {
    switch (kind) {
      case "taskDetail":
        return detailTask ? (
          <TaskDetail
            task={detailTask}
            assignee={memberList.find(
              (member) => member.user_id === detailTask.assignee_id,
            )}
            bugs={bugs.data ?? []}
            improvements={improvements.data ?? []}
            childrenLoading={bugs.isPending || improvements.isPending}
          />
        ) : (
          loading
        );
      case "task":
        if (isEdit && !detailTask) return loading;
        return (
          <TaskForm
            iterationRef={{ projectId, iterationId }}
            source={isEdit ? detailTask : undefined}
            members={memberList}
            defaultStatus={active.status ?? "Todo"}
            contextLine={contextLine}
            onSaved={onSaved}
          />
        );
      case "bug":
        if (isEdit && !bugSource) return loading;
        return (
          <TaskChildForm
            kind="bug"
            taskRef={taskRef}
            source={isEdit ? bugSource : undefined}
            parentTitle={detailTask?.title}
            onSaved={onSaved}
          />
        );
      case "improvement":
        if (isEdit && !improvementSource) return loading;
        return (
          <TaskChildForm
            kind="improvement"
            taskRef={taskRef}
            source={isEdit ? improvementSource : undefined}
            parentTitle={detailTask?.title}
            onSaved={onSaved}
          />
        );
      case "project":
        if (isEdit && !project.data) return loading;
        return (
          <ProjectForm
            source={isEdit ? project.data : undefined}
            onSaved={onSaved}
          />
        );
      case "iteration":
        if (isEdit && !iteration) return loading;
        return (
          <IterationForm
            projectId={projectId}
            source={isEdit ? iteration : undefined}
            nextIncrement={nextIncrement}
            onSaved={onSaved}
          />
        );
      case "profile":
        return <ProfileForm />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      open={!!request}
      onClose={close}
      title={title}
      subtitle={subtitle}
      badge={badge}
      footer={footer}
      onBack={from ? backToDetail : undefined}
    >
      <div key={openCount}>{renderContent()}</div>
    </Drawer>
  );
}
