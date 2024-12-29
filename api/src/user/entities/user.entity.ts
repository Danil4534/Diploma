import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:UUID;
    @Column()
    fistName: string;
    
    @Column()
    lastName: string;

    @Column()
    email: string

}
