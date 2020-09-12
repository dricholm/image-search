import { HttpModule, Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
  imports: [HttpModule],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
