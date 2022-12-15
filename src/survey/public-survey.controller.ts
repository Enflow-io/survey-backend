import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { Crud, CrudController } from "@nestjsx/crud";
import { In } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';


@Crud({
  model: {
    type: Survey,
  },
  query: {
    sort: [
      {
        field: "id",
        order: "DESC",
      },
    ]
  }
})
@Controller('public-survey')
export class PublicSurveyController implements CrudController<Survey>{
  constructor(public readonly service: SurveyService) { }


 

  @Get("/link/:link")
  async getPublicLink(@Param('link') link) {
    return await Survey.findOne({
      where: {
        link
      }
    })
  }



}


