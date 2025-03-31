
class TaskNavBarComponent
{
    private _allTasks: HTMLLIElement;
    private _todayTasks: HTMLLIElement;
    private _completedTasks: HTMLLIElement;
    private _missedTasks: HTMLLIElement;

    public constructor()
    {
        this._allTasks = document.querySelector("#all-tasks") as HTMLLIElement;
        this._todayTasks = document.querySelector("#today-tasks") as HTMLLIElement;
        this._completedTasks = document.querySelector("#completed-tasks") as HTMLLIElement;
        this._missedTasks = document.querySelector("#missed-tasks") as HTMLLIElement;
    }

    private configure()
    {
        this._allTasks.addEventListener("onclick", this.displayAllTasks.bind(this));
    }

    private displayAllTasks()
    {

    }

    private displayTodayTasks()
    {

    }

    private displayCompletedTasks()
    {

    }

    private displayMissedTasks()
    {

    }
}