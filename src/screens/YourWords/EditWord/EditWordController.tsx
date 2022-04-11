import {
  WordDetailController,
  WordDetailControllerProps,
} from '@screens/WordDetail/WordDetailController';
import {WordDetailForm} from '@screens/WordDetail/WordDetailScreen';

export type EditWordControllerProps = WordDetailControllerProps;

export class EditWordController extends WordDetailController {
  constructor(props: EditWordControllerProps) {
    super(props);
  }

  handleSubmit = async (formValue: WordDetailForm) => {
    this.messageService.pushMessage({
      title: 'Test',
      status: 'error',
    });
    return true;
  };
}
