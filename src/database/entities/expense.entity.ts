import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ExpenseCategoryEnum } from "../../enums/expense-category.enum.js";
import { BaseEntity } from "./base/base.entity.js";
import { UserEntity } from "./user.entity.js";

@Entity({ name: "expenses" })
export class ExpenseEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;
  // MySQL returns DECIMAL values as strings.
  // Convert them to numbers when reading from the database.
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  amount: number;

  @Column({ type: "enum", enum: ExpenseCategoryEnum })
  category: ExpenseCategoryEnum;

  @Column({ type: "date" })
  expense_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.expenses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}
