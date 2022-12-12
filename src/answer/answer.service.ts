import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Survey } from 'src/survey/entities/survey.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  async create(createAnswerDto: CreateAnswerDto) {

    const survey = await Survey.findOneBy({
      link: createAnswerDto.surveyLink
    })

    console.log(createAnswerDto)
    console.log(survey);
    if (!survey) {
      throw new HttpException("no survey", HttpStatus.BAD_REQUEST)
    }

    const answer = new Answer();
    answer.surveyId = survey.id
    answer.data = createAnswerDto.data;
    await answer.save();
    return answer;
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
