import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import User from "./User";
import Post from "./Post";
import Course from "./Course";
import PostHasImage from "./PostHasImage";
import PostHasTheme from "./PostHasTheme";
import SearchHistory from "./SearchHistory";
import Banner from "./Banner";
import CustomTheme from "./CustomTheme";
import Local from "./Local";

import PostHasTags from "./PostHasTags";
import PostHasWarning from "./PostHasWarning";
/* User - Post */
User.hasMany(Post, {
  foreignKey: "userId",
  sourceKey: "id",
});
Post.belongsTo(User, { foreignKey:"userId", targetKey:"id"});

/* User - SearchHistory */
User.hasMany(SearchHistory, {
  foreignKey: "userId",
  sourceKey: "id",
});
SearchHistory.belongsTo(User, { foreignKey:"userId", targetKey:"id"});

/* Post - Course */
Post.hasOne(Course, {
  foreignKey: "postId",
  sourceKey: "id",
})
Course.belongsTo(Post, {
  foreignKey: "postId",
  targetKey: "id",
})

/* Post - image */
Post.hasOne(PostHasImage,{
  foreignKey: "postId",
  sourceKey: "id",
})
PostHasImage.belongsTo(Post,{
  foreignKey: "postId",
  targetKey: "id",
})

/* Theme - post */
Post.hasOne(PostHasTheme,{
  foreignKey: "postId",
  sourceKey: "id",
})
PostHasTheme.belongsTo(Post,{
  foreignKey: "postId",
  targetKey: "id",
})

/* warning - post */
Post.hasOne(PostHasWarning,{
  foreignKey: "postId",
  sourceKey: "id",
})
PostHasWarning.belongsTo(Post,{
  foreignKey: "postId",
  targetKey: "id",
})

/* tags - post */
Post.hasOne(PostHasTags,{
  foreignKey: "postId",
  sourceKey: "id",
})
PostHasTags.belongsTo(Post,{
  foreignKey: "postId",
  targetKey: "id",
})

/* liked & saved Post */
Post.belongsToMany(User, { timestamps:false, through: "liked_post" });
Post.belongsToMany(User, { timestamps:false, through: "saved_post" });

/* follow - User */
User.belongsToMany(User, { as: 'following', timestamps:false, through: "follow", foreignKey: 'follwing' });
User.belongsToMany(User, { as: 'follower', timestamps:false, through: "follow", foreignKey: 'follower' });


export const db = { 
  Sequelize,
  sequelize, 
  
  // Tables
  User,
  SearchHistory,
  Post,
  Course,
  Banner,
  CustomTheme,
  Local,
  PostHasTheme,
  PostHasWarning,
  PostHasImage,
  PostHasTags,
};
