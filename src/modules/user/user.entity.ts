import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Specified key was tool long max key length is 767
  // @Column('varchar', { length: 191, unique: true })
  @Column('varchar', { unique: true })
  name: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @ManyToMany(type => Post, post => post.liked)
  @JoinTable()
  voted: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
