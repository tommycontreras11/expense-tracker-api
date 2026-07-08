import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity.js";
import { ExpenseEntity } from "./expense.entity.js";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses: ExpenseEntity[];
}
