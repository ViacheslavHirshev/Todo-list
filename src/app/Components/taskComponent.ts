import { IRenderable } from "../interfaces/iRenderable";
import { Task } from "../Entities/task";
import { ProjectState } from "../projectState";
import { TaskEditForm } from "../Forms/taskEditForm";

export class TaskComponent implements IRenderable
{
    private _sourceElement: HTMLTemplateElement;
    private _currentElement: HTMLDivElement;
    private _targetElement: HTMLElement;

    private _task: Task;
    private _status: HTMLInputElement;

    private _detailsIcon: HTMLImageElement;
    private _editIcon: HTMLImageElement;
    private _deleteIcon: HTMLImageElement;

    private _projectState = ProjectState.getInstance();

    constructor(sourceElement: HTMLTemplateElement, targetElement: HTMLElement, task: Task)
    {
        this._sourceElement = sourceElement;
        this._targetElement = targetElement;
        this._currentElement = this._sourceElement?.content.firstElementChild?.cloneNode(true) as HTMLDivElement;
        this._task = task;

        this._status = this._currentElement?.querySelector(".task-status") as HTMLInputElement;
        this._detailsIcon = this._currentElement?.querySelector(".task-details") as HTMLImageElement;
        this._editIcon = this._currentElement?.querySelector(".task-edit") as HTMLImageElement;
        this._deleteIcon = this._currentElement?.querySelector(".task-delete") as HTMLImageElement;

        this.configure();
    }

    public renderContent(): void
    {
        const taskTitle = this._currentElement.querySelector(".task-title") as HTMLSpanElement;
        taskTitle.innerText = this._task.title;

        const taskDueDate = this._currentElement.querySelector(".task-due-date") as HTMLSpanElement;
        taskDueDate.innerText = this._task.dueDate.toDateString();

        const taskPriority = this._currentElement.querySelector(".task-priority") as HTMLSpanElement;
        taskPriority.innerText = this._task.priority;

        const taskStatusLabel = this._currentElement.querySelector(".task-status-label") as HTMLLabelElement;

        if (this._task._isCompleted)
        {
            this._status.checked = true;
            taskStatusLabel.innerText = "Completed";
        }
        else
        {
            this._status.checked = false;
            taskStatusLabel.innerText = "Not completed";
        }

        this._targetElement.append(this._currentElement);
    }

    private configure(): void
    {
        this._status.addEventListener("click", this.updateStatus.bind(this));
        this._detailsIcon.addEventListener("click", this.showTaskDetails.bind(this));
        this._editIcon.addEventListener("click", this.editTask.bind(this));
        this._deleteIcon.addEventListener("click", this.deleteTask.bind(this));
    }

    private updateStatus(): void
    {
        const taskStatusLabel = this._currentElement.querySelector(".task-status-label") as HTMLLabelElement;

        if (this._status.checked)
        {
            this._task._isCompleted = true;
            taskStatusLabel.innerText = "Completed";
        }
        else
        {
            this._task._isCompleted = false;
            taskStatusLabel.innerText = "Not completed";
        }

        ProjectState.getInstance().saveToLocalStorage();
    }

    private showTaskDetails(): void
    {
        const detailsModalDialog = document.querySelector(".task-detals-dialog") as HTMLDialogElement;

        const detailsTitle = this._task.title;
        const detailsDueDate = this._task.dueDate.toDateString();
        const detailsDescription = this._task.description;
        const detailsPriority = this._task.priority;

        (detailsModalDialog.querySelector(".task-details-title") as HTMLHeadingElement).innerText = detailsTitle;
        (detailsModalDialog.querySelector(".task-details-due-date") as HTMLParagraphElement).innerHTML = "<b>Task due date:</b> " + detailsDueDate;

        if (detailsDescription)
        {
            (detailsModalDialog.querySelector(".task-details-description") as HTMLTextAreaElement).value = detailsDescription;
        }
        else
        {
            (detailsModalDialog.querySelector(".task-details-description") as HTMLTextAreaElement).value = "No description provided";
        }

        (detailsModalDialog.querySelector(".task-details-priority") as HTMLParagraphElement).innerHTML = "<b>Task priority:</b> " + detailsPriority;

        detailsModalDialog.showModal();
    }

    private editTask(): void
    {
        const currentTask = this._projectState.findTaskByName(this._task.title);

        if (currentTask)
        {
            const editForm = new TaskEditForm(currentTask.id);
            editForm.setFormFieldsFromTask(currentTask);
            editForm.showForm();
        }
        else
        {
            return;
        }

        ProjectState.getInstance().saveToLocalStorage();
    }

    private deleteTask(): void
    {
        this._projectState.removeTask(this._task.title);
    }
}
