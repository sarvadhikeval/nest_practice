import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
  constructor(private schema: Joi.ObjectSchema) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const errors = await validate(plainToClass(metadata.metatype, value));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        error.details.map((detail) => detail.message),
      );
    }
    return value;
  }
}
