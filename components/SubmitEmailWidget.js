import { useState } from 'react';;
import { gql, useMutation } from '@apollo/client';

import Text from '@/components/Text';
import Button from '@/components/Button';

import seStyles from '@/styles/SubmitEmail.module.css';

const AddEmailToAirtable = gql`
  mutation AddEmailToAirtable($email: String!) {
    addEmailToAirtable(email: $email)
  }
`;

export default function SubmitEmailWidget({ selectedBorough, numberOfSpacesHidden, setEmailSubmitted }) {
  const [buttonContent, setButtonContent] = useState('Give me access');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [addEmailToAirtable] = useMutation(AddEmailToAirtable);

  const addEmailSubmittedToLocalStorage = () => {
    localStorage.setItem('emailSubmitted', true);
    setEmailSubmitted(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setButtonDisabled(true);
    setButtonContent('Submitting...');

    try {
      await addEmailToAirtable({ variables: { email } });
      addEmailSubmittedToLocalStorage();
    } catch (error) {
      console.error(error);
    }

    setButtonDisabled(false);
    setButtonContent('Give me access');
  };

  const singularOrPlural = (word) => {
    switch (word) {
      case 'space':
        return numberOfSpacesHidden === 1 ? 'space' : 'spaces';
      case 'is':
        return numberOfSpacesHidden === 1 ? 'is' : 'are';
    }
  };

  return (
    <div className={seStyles.container}>
      <div className={seStyles.messageContainer}>
        <Text.P>
          {`There ${singularOrPlural('is')} `} <span className={seStyles.numberOfSpacesHidden}>{numberOfSpacesHidden}</span> {` more ${singularOrPlural('space')} in ${selectedBorough} that you can’t see, and we’re adding more every day!`}
        </Text.P>

        <Text.P>
          {`If you’d like immediate access view to all of the spaces on Futon, submit your name and email address.`}
        </Text.P>
      </div>

      <div className={seStyles.formContainer}>
        <form onSubmit={handleOnSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email address"
            disabled={buttonDisabled}
            noValidate
          />

          <Button type="submit" secondary disabled={buttonDisabled}>{buttonContent}</Button>
        </form>
      </div>
    </div>
  );
};