import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  testJob() {
    console.info('Job running at ', new Date());
  }
}
