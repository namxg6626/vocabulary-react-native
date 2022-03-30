type MessageStatus = 'success' | 'error' | 'info' | 'warning';

export class MessageDto {
  constructor(
    public status: MessageStatus,
    public title: string,
    public description?: string,
  ) {}
}
