'use client';

import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@/components/common/formParts';

import Loader from '@/components/common/loader';
import { useState } from 'react';
import { sendContact } from '../../app/data';
import { NextPromiseCacheError } from 'next-promise-cache';
import styles from './contact.module.scss';

export interface FormValues {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ServerFormSubmitError<T extends string = string> {
  message: string;
  extensions: {
    code: string;
    field: T;
    type: string;
  };
}

const mapServerErrors = (errors: ServerFormSubmitError<keyof FormValues>[]) => {
  const obj: Record<string, boolean> = {};
  return errors.reduce<Record<string, any>[]>((a, b) => {
    if (!(b.extensions.field in obj)) {
      obj[b.extensions.field] = true;
      a.push({
        key: b.extensions.field,
        val: `${b.extensions.field} is invalid`,
      });
    }
    return a;
  }, []);
};

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ mode: 'onBlur' });
  const [fetchError, setFetchError] = useState<null | Error>(null);

  const onSubmit = handleSubmit(async (data) => {
    await sendContact(data).catch(async (err: NextPromiseCacheError) => {
      if (err.status === 400) {
        const resp = await err.response.json();
        const serverErrors = mapServerErrors(resp.errors);

        serverErrors.forEach((e) => {
          setError(e.key, {
            type: 'server',
            message: e.val,
          });
        });
      } else {
        console.error(err.status);
        setFetchError(err);
      }
    });
  });

  if (isSubmitSuccessful && !fetchError) {
    setTimeout(() => {
      reset();
    }, 5000);

    return <p className={styles.thanks}>Thanks for your email!</p>;
  }

  if (fetchError) {
    return (
      <div className={styles.contactForm}>
        <p>Error: Unable to send message:</p>
        <pre style={{ color: '#86af6e' }}>{fetchError.message}</pre>
        <button
          className="button button-xs"
          onClick={() => {
            reset();
            setFetchError(null);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.contactForm}>
      {isSubmitting && (
        <Loader
          style={{
            height: 'auto',
            width: 'auto',
          }}
        />
      )}
      {!isSubmitting && <h4 className="send-message">SEND A MESSAGE</h4>}
      <form
        onSubmit={onSubmit}
        style={{ display: isSubmitting ? 'none' : 'block' }}
      >
        <Input
          register={register('name', {
            required: 'Please enter your name',
            maxLength: { value: 50, message: 'Name is too long' },
          })}
          type="text"
          placeholder="Name"
          className="form-control"
          errors={errors.name}
        />
        <Input
          register={register('email', {
            required: 'Please enter your email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,24}$/i,
              message: 'Please enter a valid email',
            },
          })}
          type="text"
          placeholder="Email"
          className="form-control"
          errors={errors.email}
        />
        <Input
          register={register('phone', {
            maxLength: { value: 20, message: 'Phone is too long' },
          })}
          type="text"
          placeholder="Phone"
          className="form-control"
        />
        <Textarea
          register={register('message', {
            required: 'Please enter a message',
            validate: (value) =>
              value.trim().split(' ').length > 5 || 'Message is too short',
            maxLength: { value: 3000, message: 'Message is too long' },
          })}
          placeholder="Message"
          className={`form-control ${styles.message}`}
          errors={errors.message}
        />
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button button-green button-smaller"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
