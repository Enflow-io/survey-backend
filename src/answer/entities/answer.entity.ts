import { Survey } from "src/survey/entities/survey.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('answer')
export class Answer extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "jsonb", nullable: true })
    data: string

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => Survey, (survey) => survey.answers)
    survey: Survey

    @Column()
    surveyId: number

}
