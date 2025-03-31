import { ProjectState } from "../projectState";
import { Task } from "../Entities/task";

export class TaskInputForm
{
    private static _inputForm: TaskInputForm;
    private _dialogElement: HTMLDialogElement;
    private _formElement: HTMLFormElement;
    private _openFormBtn: HTMLButtonElement;
    private _closeFormBtn: HTMLButtonElement;
    //private _submitFormBtn: HTMLButtonElement;

    private projectState = ProjectState.getInstance();

    private constructor()
    {
        this._dialogElement = document.querySelector("#task-dialog") as HTMLDialogElement;
        this._formElement = this._dialogElement.querySelector("#task-input-form") as HTMLFormElement;
        this._openFormBtn = document.querySelector("#new-task-btn") as HTMLButtonElement;
        this._closeFormBtn = this._dialogElement.querySelector(".cancel-btn") as HTMLButtonElement;
        //this._submitFormBtn = this._dialogElement.querySelector(".submit-btn") as HTMLButtonElement;
        this.configure();
    }

    public static getInstance(): TaskInputForm
    {
        if (TaskInputForm._inputForm)
        {
            return TaskInputForm._inputForm;
        }

        TaskInputForm._inputForm = new TaskInputForm()
        return TaskInputForm._inputForm;
    }

    private showForm(): void
    {
        if (TaskInputForm._inputForm)
        {
            this._dialogElement.showModal();
        }
        else
        {
            console.error("Task form hasn't been created");
        }
    }

    private closeForm(): void
    {
        this._dialogElement?.close();
    }

    private configure()
    {
        this._openFormBtn.addEventListener("click", this.showForm.bind(this));
        this._closeFormBtn.addEventListener("click", this.closeForm.bind(this));
        this._formElement.addEventListener("submit", this.submitFormHandler.bind(this));
    }

    private submitFormHandler(event: SubmitEvent)
    {
        event.preventDefault();

        const title = (this._formElement.querySelector("#input-title") as HTMLInputElement).value;
        const dueDate = (this._formElement.querySelector("#input-due-date") as HTMLInputElement).value;
        const priority = (this._formElement.querySelector("#input-priority") as HTMLInputElement).value;

        if (priority === "high" || priority === "medium" || priority === "low")
        {
            this.projectState.addTask(new Task(title, new Date(dueDate), priority));

            this.clearForm();
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