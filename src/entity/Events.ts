import {Entity, Column} from "typeorm";
import {Base} from "./Base";
import {IsObject} from "class-validator";

@Entity()
export class Events extends Base {
    @Column({type: 'simple-json'})
    event: any;

}
