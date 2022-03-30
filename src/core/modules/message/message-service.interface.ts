import {Observable} from 'rxjs';
import {MessageDto} from '@core/modules/message/message.dto';

export interface IMessageService {
  getMessage: () => Observable<MessageDto>;
  pushMessage: (dto: MessageDto) => void;
}
