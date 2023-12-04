import {
  Account,
  AppwriteException,
  Client,
  Databases,
  Storage,
  ID,
  type Models,
  Teams,
  Query,
} from "appwrite";


/** Setup */
export const appwriteClient = new Client()
  .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

export const appwriteDatabases = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);
export const appwriteTeams = new Teams(appwriteClient);

/** Database */
export interface BlogPost extends Models.Document {
  title: string;
  description: string;
  content: string;
  slug: string;
  imageUrl: string;
}
export interface BlogPostList extends Models.DocumentList<BlogPost> {}

export interface BlogComment extends Models.Document {
  postId: string;
  content: string;
}
export interface BlogCommentList extends Models.DocumentList<BlogComment> {}

/** Account */
export const appwriteAccount = new Account(appwriteClient);
