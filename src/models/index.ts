import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./Theme";
import Warning from "./Warning";
import User from "./User";

import Post from "./Post";
import Course from "./Course";
import PostHasImage from "./PostHasImage";
/* User - Post */
User.hasMany(Post, {
  foreignKey: "userId",
  sourceKey: "id",
  //onDelete: 'CASCADE',
  //onUpdate: 'CASCADE',
});
Post.belongsTo(User, { foreignKey:"userId", targetKey:"id"});

/* Post - Course */
Post.hasOne(Course, {
  foreignKey: "id",
  sourceKey: "id",
})
Course.belongsTo(Post, {
  foreignKey: "id",
  targetKey: "id",
})

/* Post - image */
Post.hasOne(PostHasImage,{
  foreignKey: "id",
  sourceKey: "id",
})
PostHasImage.belongsTo(Post,{
  foreignKey: "id",
  targetKey: "id",
})

/* warning & theme - Post */
Post.belongsToMany(Warning, { timestamps:false, through: "post_has_warning" });
Post.belongsToMany(Theme, { timestamps:false, through: "post_has_theme" })

/* liked & saved Post */
Post.belongsToMany(User, { timestamps:false, through: "liked_post" });
Post.belongsToMany(User, { timestamps:false, through: "saved_post" });

export const db = { 
  Sequelize,
  sequelize, 

  // Tables
  Theme, 
  Warning,
  User,
  Post,
  Course
};
