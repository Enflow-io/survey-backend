import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class SurveyService  extends TypeOrmCrudService<Survey>{

  constructor(@InjectRepository(Survey) repo) {
    super(repo);
  }


  async generatePublicID(surveyId: number){
    let myuuid = uuidv4();
    await Survey.update({
      id: surveyId
    }, {
      link: myuuid
    })

    return myuuid;
  }

}
