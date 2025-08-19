import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../commons/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false })
  password: string;
}
