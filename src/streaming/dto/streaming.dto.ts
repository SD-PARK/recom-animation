import { IsString, MaxLength } from 'class-validator';

export class StreamingDto {
    @IsString({ message: '문자열이어야 합니다.' })
    @MaxLength(45, { message: '문자열은 최대 45글자까지만 허용됩니다.' })
    streaming: string;
}