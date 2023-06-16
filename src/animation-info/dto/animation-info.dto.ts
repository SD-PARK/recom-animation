import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class AniamtionInfoDto {
    // 작품명
    @IsString()
    @MaxLength(90)
    title: string;

    // 포스터 이미지
    @IsString()
    @MaxLength(90)
    image: string;

    // 방영년도
    @IsNumber()
    @Min(1900)
    @Max(2040)
    aired: number;

    // 스튜디오
    @IsString()
    @MaxLength(20)
    studio: string;

    // 설명
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    summary: string;

    // 심의 등급
    @IsNumber()
    @Max(19)
    rated: number;

    // 카테고리
    @IsOptional()
    @IsString({ each: true })
    categories: string[];

    // 태그
    @IsOptional()
    @IsString({ each: true })
    tags: string[];

    // 스트리밍 사이트
    @IsOptional()
    @IsString({ each: true })
    streamings: string[];
}