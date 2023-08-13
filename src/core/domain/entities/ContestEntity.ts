import { Guid } from 'guid-typescript';

export class ContestEntity {
    public id: Guid;
    public initial_date: Date;
    public final_date: Date;
    public active: Boolean;

    constructor(id: Guid, initial_date: Date, final_date: Date, active: Boolean){
        this.id = id;
        this.initial_date = initial_date;
        this.final_date = final_date;
        this.active = active;
    }
}