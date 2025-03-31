class TaskNavBarComponent
{
    private static _taskNavBar: TaskNavBarComponent;

    private _allTasks: HTMLLIElement;
    private _todayTasks: HTMLLIElement;
    private _completedTasks: HTMLLIElement;
    private _missedTasks: HTMLLIElement;

    private constructor()
    {
        this._allTasks = document.querySelector("#all-tasks") as HTMLLIElement;
        this._todayTasks = document.querySelector("#today-tasks") as HTMLLIElement;
        this._completedTasks = document.querySelector("#completed-tasks") as HTMLLIElement;
        this._missedTasks = document.querySelector("#missed-tasks") as HTMLLIElement;
    }

    public getInstance()
    {
        if (TaskNavBarComponent._taskNavBar)
        {
            return TaskNavBarComponent._taskNavBar;
        }

        TaskNavBarComponent._taskNavBar = new TaskNavBarComponent();
        return TaskNavBarComponent._taskNavBar;
    }


}