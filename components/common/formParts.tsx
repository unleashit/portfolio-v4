import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/components/contactForm/contact.module.scss';

type FieldProps = Partial<HTMLFormElement> & {
  register: UseFormRegisterReturn;
};

export const Input = (props: FieldProps) => {
  return (
    <div className="mb-3">
      <div>
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={props.className}
          {...props.register}
        />
        {props.errors && (
          <span className={`${styles.error}`}>{props.errors.message}</span>
        )}
      </div>
    </div>
  );
};
export const Textarea = (props: FieldProps) => {
  return (
    <div className="mb-3">
      <div>
        <textarea
          placeholder={props.placeholder}
          className={props.className}
          {...props.register}
        />
        {props.errors && (
          <span className={`${styles.error}`}>{props.errors.message}</span>
        )}
      </div>
    </div>
  );
};
