type MessageStatus = 'success' | 'error' | 'info' | 'warning';

export interface MessageDto {
  status: MessageStatus;
  title: string;
  description?: string;

  /** @default 2000ms*/
  duration?: number;
}
