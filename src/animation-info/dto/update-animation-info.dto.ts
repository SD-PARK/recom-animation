import { PartialType } from "@nestjs/mapped-types";
import { CreateAnimationInfoDto } from "./create-animation-info.dto";

export class UpdateAniamtionInfoDto extends PartialType(CreateAnimationInfoDto) {}