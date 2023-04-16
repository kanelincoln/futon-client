import { gql, useMutation } from '@apollo/client';

import Text from '@/components/Text';
import Button from '@/components/Button';

import seStyles from '@/styles/SubmitEmail.module.css';

const AddEmailToAirtable = gql`
  mutation AddEmailToAirtable($email: String!) {
    addEmailToAirtable(email: $email)
  }
`;

export default function SubmitEmailWidget({ numberOfSpacesHidden }) {
  const [addEmailToAirtable] = useMutation(AddEmailToAirtable);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);

    try {
      await addEmailToAirtable({ variables: { email } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={seStyles.container}>
      <div className={seStyles.messageContainer}>
        <Text.P>
          {`There are ${numberOfSpacesHidden} more spaces in Westminster that you can’t see, and we’re adding more every day!`}
        </Text.P>

        <Text.P>
          {`If you’d like immediate access to of the spaces on Futon, submit your name and email address.`}
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
          />

          <Button type="submit" secondary>Give me access</Button>
        </form>
      </div>
    </div>
  );
};