import { IsNotEmpty } from 'class-validator';

export class CreateMemoDTO {
  @IsNotEmpty({ message: '음악을 선택해주세요' })
  musicId: string;

  @IsNotEmpty({ message: '메모를 해야하는데 메모를 안하시면 어떡해요ㅠ' })
  memo: string;
}
