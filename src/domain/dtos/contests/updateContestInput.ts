interface IcontestUpdateInput {
    id: string;
    initialDate?:Date;
    finalDate?: Date;
    active?: Boolean
}
export class UpdateContestInput{
    public id: string;
    public initialDate?: Date;
    public finalDate?: Date;
    public active?: Boolean;

    constructor({id, initialDate, finalDate, active}:IcontestUpdateInput){
        this.id = id;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.active = active;
    }
}