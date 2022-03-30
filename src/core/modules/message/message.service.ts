import {Observable, Subject} from 'rxjs';
import {MessageDto} from '@core/modules/message/message.dto';
import {IMessageService} from '@core/modules/message/message-service.interface';

export class MessageService implements IMessageService {
  private static MessageSubject = new Subject<MessageDto>();

  public getMessage = (): Observable<MessageDto> => {
    return MessageService.MessageSubject.asObservable();
  };

  pushMessage(dto: MessageDto): void {
    MessageService.MessageSubject.next(dto);
  }
}
