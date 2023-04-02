import type { UseFormRegisterReturn } from 'react-hook-form';

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
          className="form-control"
          {...props.register}
        />
        {props.errors && <span className="error">{props.errors.message}</span>}
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
          className="form-control"
          {...props.register}
        />
        {props.errors && <span className="error">{props.errors.message}</span>}
      </div>
    </div>
  );
};
