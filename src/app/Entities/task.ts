export type PriorityType = "high" | "medium" | "low";

export class Task
{
    constructor(
        public _title: string,
        public _dueDate: Date,
        public _priority: PriorityType,
        public _description?: string,
        public _id: number = Math.random() % 1000,
        public _isCompleted: boolean = false
    )
    {

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

    public get isCompleted()
    {
        return this._isCompleted;
    }

    public set isCompleted(value: boolean)
    {
        this._isCompleted = value;
    }
}
