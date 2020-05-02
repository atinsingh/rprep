import { HttpException } from '@nestjs/common';

export class BadDataException extends HttpException{

  constructor(errcode: number, msg: string | object, status: number) {
    super({errcode, msg}, status);
  }
}