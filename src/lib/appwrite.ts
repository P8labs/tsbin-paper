import { Client, Account, TablesDB, Functions } from "appwrite";
import { browser } from "$app/environment";

import {
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT_ID,
  PUBLIC_APPWRITE_DATABASE_ID,
  PUBLIC_APPWRITE_COLLECTION_ID,
} from "$env/static/public";

const client = new Client();

if (browser) {
  client
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID);
}

export const account = new Account(client);
export const databases = new TablesDB(client);
export const functions = new Functions(client);

export const DATABASE_ID = PUBLIC_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = PUBLIC_APPWRITE_COLLECTION_ID;
