import { Task } from "../Entities/task";
import { ProjectState } from "../projectState";

export class TaskEditForm
{
    private _dialogElement: HTMLDialogElement;
    private _formElement: HTMLFormElement;
    private _closeFormBtn: HTMLButtonElement;

    private _editedTaskId: number;

    public constructor(taskId: number)
    {
        this._editedTaskId = taskId;

        this._dialogElement = document.querySelector("#task-edit-dialog") as HTMLDialogElement;
        this._formElement = this._dialogElement.querySelector("#task-edit-form") as HTMLFormElement;
        this._closeFormBtn = this._dialogElement.querySelector(".cancel-btn") as HTMLButtonElement;
        this.configure();
    }

    public showForm(): void
    {
        this._dialogElement.showModal();
    }

    private closeForm(): void
    {
        this.clearForm();
        this._dialogElement?.close();
    }

    private configure()
    {
        this._closeFormBtn.addEventListener("click", this.closeForm.bind(this));
        this._formElement.addEventListener("submit", this.submitFormHandler.bind(this));
    }

    private submitFormHandler(event: SubmitEvent): void
    {
        event.preventDefault();

        const title = (this._formElement.querySelector("#edit-title") as HTMLInputElement).value;
        const dueDate = (this._formElement.querySelector("#edit-due-date") as HTMLInputElement).value;
        const priority = (this._formElement.querySelector("#edit-priority") as HTMLSelectElement).value;
        const description = (this._formElement.querySelector("#edit-description") as HTMLTextAreaElement).value;

        const editedTask = ProjectState.getInstance().findTaskById(this._editedTaskId);

        if (priority === "high" || priority === "medium" || priority === "low")
        {
            if (editedTask)
            {
                editedTask.title = title;
                editedTask.dueDate = new Date(dueDate);
                editedTask.priority = priority;
                editedTask.description = description;
            }

            this.closeForm();
            ProjectState.getInstance().renderTasksByType();
        }
    }

    private clearForm()
    {
        (this._formElement.querySelector("#edit-title") as HTMLInputElement).value = "";
        (this._formElement.querySelector("#edit-due-date") as HTMLInputElement).value = "";
        (this._formElement.querySelector("#edit-priority") as HTMLSelectElement).value = "";
        (this._formElement.querySelector("#edit-description") as HTMLTextAreaElement).value = "";
    }

    public setFormFieldsFromTask(task: Task): void
    {
        (this._formElement.querySelector("#edit-title") as HTMLInputElement).value = task.title;
        (this._formElement.querySelector("#edit-due-date") as HTMLInputElement).value = task.dueDate.toISOString().split("T")[0];
        (this._formElement.querySelector("#edit-priority") as HTMLSelectElement).value = task.priority;

        if (task.description)
            (this._formElement.querySelector("#edit-description") as HTMLTextAreaElement).value = task.description;
    }
}