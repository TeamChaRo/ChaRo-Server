import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { localMain, themeMain, localStandard, themeStandard } from "../service/mainService";
import { mainDTO } from '../interface/res/mainDTO'

var localInfo: object 
var localTitle: string 
var mainData: mainDTO = {
    banner: {
        bannerImage: "",
        bannerTags: "",
        bannerTitle: ""
    },
    seasonTitle: '',
    season: [{
        title: '',
        tags: [''],
        image: '',
        isFavorite: true
    }],
    localTitle: '',
    local: [{
        title: '',
        tags: [''],
        image: '',
        isFavorite: false
    }],
}

export default async(req: Request, res: Response) => {
    // check error 핸들링(필요한가?)

    // local, theme 테이블에서 기준되는 값 불러오기(안만듬) -> in service 에 정의하시게~
    // ex)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status : 400,
        //message: errors[0].message
      }
    }
    const { id } = req.body;

    localStandard().then ( local => {
        localTitle = local.localTitle
        mainData.localTitle = localTitle
        localMain(id, local.localCity).then(function(res) {
            localInfo = res
            console.log("로그로그",localInfo)
            
            //상위 네개만! -> 좋아요순으로 노출..!?
            for (let key in localInfo) {
                let titleValue:string = localInfo[key]['title'];
                let favoriteValue = localInfo[key]['isFavorite']
                if (favoriteValue == null) {
                    favoriteValue = false
                } 
                else {
                    favoriteValue = true
                }
                mainData.local[key] = {
                    "title": titleValue,
                    "tags": [""],
                    "image": "",
                    "isFavorite": favoriteValue
                }
            }
        });    
    });

    themeStandard().then ( theme => {
        themeMain(id, theme.standardTheme, theme.standardTitle).then( res => {
            responseFunc()
        });
    })
    
    async function responseFunc() {
        await res.status(200).json({
        status: true,
        message: "메인뷰 조회 성공",
        data: mainData
    });
    }
}
