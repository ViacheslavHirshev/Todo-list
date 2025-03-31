import { Task } from "../Entities/task";
import { ProjectState } from "../projectState";

export class TaskInputForm
{
    private _dialogElement: HTMLDialogElement;
    private _formElement: HTMLFormElement;
    private _openFormBtn: HTMLButtonElement;
    private _closeFormBtn: HTMLButtonElement;

    public constructor()
    {
        this._dialogElement = document.querySelector("#task-dialog") as HTMLDialogElement;
        this._formElement = this._dialogElement.querySelector("#task-input-form") as HTMLFormElement;
        this._openFormBtn = document.querySelector("#new-task-btn") as HTMLButtonElement;
        this._closeFormBtn = this._dialogElement.querySelector(".cancel-btn") as HTMLButtonElement;
        this.configure();
    }

    private showForm(): void
    {
        this.clearForm();
        this._dialogElement.showModal();
    }

    private closeForm(): void
    {
        this.clearForm();
        this._dialogElement?.close();
    }

    private configure()
    {
        this._openFormBtn.addEventListener("click", this.showForm.bind(this));
        this._closeFormBtn.addEventListener("click", this.closeForm.bind(this));
        this._formElement.addEventListener("submit", this.submitFormHandler.bind(this));
    }

    private submitFormHandler(event: SubmitEvent): void
    {
        event.preventDefault();

        const title = (this._formElement.querySelector("#input-title") as HTMLInputElement).value;
        const dueDate = (this._formElement.querySelector("#input-due-date") as HTMLInputElement).value;
        const priority = (this._formElement.querySelector("#input-priority") as HTMLInputElement).value;

        if (priority === "high" || priority === "medium" || priority === "low")
        {
            const newTask = new Task(title, new Date(dueDate), priority);
            ProjectState.getInstance().addTask(newTask);
            this.closeForm();
        }
    }

    private clearForm()
    {
        (this._formElement.querySelector("#input-title") as HTMLInputElement).value = "";
        (this._formElement.querySelector("#input-due-date") as HTMLInputElement).value = "";
        (this._formElement.querySelector("#input-priority") as HTMLInputElement).value = "";
    }
}