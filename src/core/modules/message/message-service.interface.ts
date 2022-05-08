import {Observable} from 'rxjs';
import {MessageDto} from '@core/modules/message/message.dto';

type TypedMessageMethod = (title: string, description?: string) => void;

export interface IMessageService {
  getMessage: () => Observable<MessageDto>;
  pushMessage: (dto: MessageDto) => void;
  error: TypedMessageMethod;
  success: TypedMessageMethod;
  info: TypedMessageMethod;
  warn: TypedMessageMethod;
}
