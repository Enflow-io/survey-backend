import { Answer } from "src/answer/entities/answer.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('survey')
export class Survey extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    name: string


    @Column({ type: "jsonb", nullable: true })
    config: string

    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    finishDate: Date;

    @Column({nullable: true})
    link: string

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(() => Answer, (answer) => answer.survey)
    answers: Answer[]


}
