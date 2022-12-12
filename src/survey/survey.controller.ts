import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { Crud, CrudController } from "@nestjsx/crud";
import { In } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';


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
@Controller('survey')
export class SurveyController implements CrudController<Survey>{
  constructor(public readonly service: SurveyService) { }

  @Delete("delete")
  async bulkDelete(@Body() deleteDto: { ids: number[] }) {
    await Answer.delete({
      surveyId: In(deleteDto.ids)
    })
    await Survey.delete({
      id: In(deleteDto.ids)
    })
  }

  @Get("/:id/public-id")
  async getPublicId(@Param('id') id) {
    return await this.service.generatePublicID(id);
  }

  @Get("/link/:link")
  async getPublicLink(@Param('link') link) {
    return await Survey.findOne({
      where: {
        link
      }
    })
  }

  @Get("/analytics")
  async getAnalytics() {
    const surveyQnt = await Survey.count();
    const answerQnt = await Answer.count();
    const lastAnswers = await Answer.find({
      order: {
        createdDate: "DESC"
      },
      take: 20,
      relations: ['survey']
    })
    return {
      surveyQnt,
      answerQnt,
      lastAnswers

    }
  }



}


