import { IsString } from 'class-validator';

export class StreamingDto {
    @IsString()
    streaming: string;
}