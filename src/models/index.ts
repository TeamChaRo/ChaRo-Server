import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./Theme";
import Warning from "./Warning";
import User from "./User";
import Post from "./Post";
import Course from "./Course";
import PostHasImage from "./PostHasImage";
import PostHasTheme from "./PostHasTheme";
import SearchHistory from "./SearchHistory";
import Banner from "./Banner";
import Custom from "./Custom";
import Local from "./Local";

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

/* warning - Post */
Post.belongsToMany(Warning, { timestamps:false, through: "post_has_warning" });
Warning.belongsToMany(Post, { timestamps:false, through: "post_has_warning" });

/* Theme - post */
Post.hasOne(PostHasTheme,{
  foreignKey: "postId",
  sourceKey: "id",
})
PostHasTheme.belongsTo(Post,{
  foreignKey: "postId",
  targetKey: "id",
})

PostHasTheme.belongsTo(Theme,{
  as: "first",
  foreignKey: "theme1"
})
PostHasTheme.belongsTo(Theme,{
  as: "second",
  foreignKey: "theme2"
})
PostHasTheme.belongsTo(Theme,{
  as: "third",
  foreignKey: "theme3"
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
  Theme, 
  Warning,
  User,
  SearchHistory,
  Post,
  Course,
  Banner,
  Custom,
  Local,
  PostHasTheme
};
