export type PriorityType = "high" | "medium" | "low";

export class Task
{
    private _id: number;

    private _title: string;
    private _description?: string;
    private _dueDate: Date;
    private _priority: PriorityType;
    public _isCompleted: boolean;

    constructor(title: string, dueDate: Date, priority: PriorityType, description?: string)
    {
        this._id = Math.random() % 1000;
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._isCompleted = false;
    }

    public get id()
    {
        return this._id;
    }

    public get title()
    {
        return this._title;
    }

    public set title(value: string)
    {
        this._title = value;
    }

    public get description()
    {
        return this._description;
    }

    public set description(value: string | undefined)
    {
        if (value)
            this._description = value;
        else
            return;
    }

    public get dueDate()
    {
        return this._dueDate;
    }

    public set dueDate(value: Date)
    {
        this._dueDate = value;
    }

    public get priority()
    {
        return this._priority;
    }

    public set priority(value: PriorityType)
    {
        this._priority = value;
    }
}
