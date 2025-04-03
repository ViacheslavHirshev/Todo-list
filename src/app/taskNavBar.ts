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
        this._projectState.renderTasksByType(0);
    }

    private displayTodayTasks()
    {
        this._projectState.renderTasksByType(1);
    }

    private displayCompletedTasks()
    {
        this._projectState.renderTasksByType(2);
    }

    private displayMissedTasks()
    {
        this._projectState.renderTasksByType(3);
    }
}
