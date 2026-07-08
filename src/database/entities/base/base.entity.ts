import {
  BaseEntity as Base,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 36,
    unique: true,
  })
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
