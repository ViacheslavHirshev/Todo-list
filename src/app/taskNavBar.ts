import { ProjectState } from "./projectState";

export class TaskNavBar
{
    private _allTasks: HTMLLIElement;
    private _todayTasks: HTMLLIElement;
    private _completedTasks: HTMLLIElement;
    private _missedTasks: HTMLLIElement;

    private _projectState = ProjectState.getInstance();

    public constructor()
    {
        this._allTasks = document.querySelector("#all-tasks") as HTMLLIElement;
        this._todayTasks = document.querySelector("#today-tasks") as HTMLLIElement;
        this._completedTasks = document.querySelector("#completed-tasks") as HTMLLIElement;
        this._missedTasks = document.querySelector("#missed-tasks") as HTMLLIElement;

        this.configure();
    }

    private configure()
    {
        this._allTasks.addEventListener("click", this.displayAllTasks.bind(this));
        this._todayTasks.addEventListener("click", this.displayTodayTasks.bind(this));
        this._completedTasks.addEventListener("click", this.displayCompletedTasks.bind(this));
        this._missedTasks.addEventListener("click", this.displayMissedTasks.bind(this));
    }

    private displayAllTasks()
    {
        this._projectState.renderTasks();
    }

    private displayTodayTasks()
    {
        const now = new Date();
        const today = this._projectState.tasks.filter(task =>
        {
            return (task.dueDate.getFullYear() === now.getFullYear() &&
                task.dueDate.getMonth() === now.getMonth() &&
                task.dueDate.getDay() === now.getDay());
        });

        this._projectState.renderTasks(today);
    }

    private displayCompletedTasks()
    {
        const completed = this._projectState.tasks.filter(task => task._isCompleted);
        this._projectState.renderTasks(completed);
    }

    private displayMissedTasks()
    {
        const today = new Date();
        const missed = this._projectState.tasks.filter(task =>
        {
            return (task.dueDate.getFullYear() < today.getFullYear() ||
                task.dueDate.getMonth() < today.getMonth() ||
                task.dueDate.getDay() < today.getDay());
        });

        this._projectState.renderTasks(missed);
    }
}
