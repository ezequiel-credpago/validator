import {IsDate, IsOptional, validateOrReject} from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";

export abstract class Base {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional()
    @IsDate()
    @CreateDateColumn()
    created_at: Date;

    @IsOptional()
    @IsDate()
    @UpdateDateColumn()
    updated_at: Date;

    @IsOptional()
    @IsDate()
    @DeleteDateColumn()
    deleted_at: Date;

    @VersionColumn()
    version: number;

    @BeforeInsert()
    async beforeInsert() {
        await validateOrReject(this, {validationError: {target: false}});
    }
    @BeforeUpdate()
    async beforeUpdate() {
        const obj = Object.entries(this).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
        await validateOrReject(obj, {validationError: {target: false}, skipMissingProperties: true});
    }
}