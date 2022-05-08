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

  error(title: string, description: string | undefined): void {
    MessageService.MessageSubject.next({
      title,
      description,
      status: 'error',
    });
  }

  success(title: string, description: string | undefined): void {
    MessageService.MessageSubject.next({
      title,
      description,
      status: 'success',
    });
  }

  info(title: string, description: string | undefined): void {
    MessageService.MessageSubject.next({
      title,
      description,
      status: 'info',
    });
  }

  warn(title: string, description: string | undefined): void {
    MessageService.MessageSubject.next({
      title,
      description,
      status: 'info',
    });
  }
}
