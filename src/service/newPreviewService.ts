import { db } from "../models";
import { QueryTypes } from 'sequelize';
import briefInformationDTO from "../interface/res/briefInformationDTO";
import previewDTO from "../interface/res/previewDTO";

import { makeThemeBriefCollection, makeLocalBriefCollection, makeTrendBriefCollection } from "./briefCollectionService";

/* 
 */

export async function todayService(userId: string){

}

export async function themeService(theme: string, userId: string){

}

export async function localService(local: string, userId: string){

}