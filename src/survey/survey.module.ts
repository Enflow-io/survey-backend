import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './entities/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicSurveyController } from './public-survey.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveyController, PublicSurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule { }
