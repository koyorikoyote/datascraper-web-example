import type { FormEvent } from 'react';
import { FormModal } from '@/components/global/FormModal';
import { ContactFormFields } from './ContactFormFields';

/**
 * Props for the contact-creation modal.
 */
interface CreateContactModalProps {
  /** Handler invoked when the user submits the form */
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** i18n translator */
  t: (key: string) => string;
}

const CreateContactModal: React.FC<CreateContactModalProps> = ({ onSubmit, t }) => {
  return (
    <FormModal title={t('contact.contactCreate')} onSubmit={onSubmit}>
        <ContactFormFields t={t} />  
    </FormModal>
  );
};

export default CreateContactModal;
