'use client';

import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@/components/common/formParts';
import { sendContact } from './data';
import Loader from '@/components/common/loader';
import { useState } from 'react';

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({ mode: 'onBlur' });
  const [error, setError] = useState<null | Error>(null);

  if (isSubmitSuccessful && !error) {
    setTimeout(() => {
      reset();
    }, 5000);

    return (
      <div className="col-lg-8">
        <p className="thanks">Thanks for your email!</p>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const sent = await sendContact(data).catch((e) => {
      console.error(e);
      setError(e);
    });
    console.log(sent);
  });

  // const onSubmit = handleSubmit((data) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log(data);
  //       resolve("");
  //     }, 2000);
  //   });
  // });

  if (error) {
    return (
      <>
        <p>Error: Unable to send message:</p>
        <pre style={{ color: '#86af6e' }}>{error.message}</pre>
        <button
          className="button button-xs"
          onClick={() => {
            reset();
            setError(null);
          }}
        >
          Try again
        </button>
      </>
    );
  }

  return (
    <>
      <Loader
        style={{
          display: isSubmitting ? 'flex' : 'none',
          height: 'auto',
          width: 'auto',
        }}
      />
      <h4
        style={{ display: isSubmitting ? 'none' : 'block' }}
        className="send-message"
      >
        SEND A MESSAGE
      </h4>
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
          errors={errors.email}
        />
        <Input
          register={register('phone', {
            maxLength: { value: 20, message: 'Phone is too long' },
          })}
          type="text"
          placeholder="Phone"
        />
        <Textarea
          register={register('message', {
            required: 'Please enter a message',
            validate: (value) =>
              value.trim().split(' ').length > 5 || 'Message is too short',
            maxLength: { value: 3000, message: 'Message is too long' },
          })}
          placeholder="Message"
          className="form-control message"
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
    </>
  );
}

export default ContactForm;
