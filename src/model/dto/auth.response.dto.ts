import {ApiProperty} from "@nestjs/swagger";

export class AuthResponseDto {
    @ApiProperty()
    code: string;
    @ApiProperty()
    id_token: string;
}
