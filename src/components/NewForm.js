import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';

const NewForm = () => {
    return (
        <div>
              <Form error>
                <Form.Input label='Email' placeholder='joe@schmoe.com' />
                <Message success header='Form Completed' content="You're all signed up for the newsletter" />
                <Button variant="outlined" color="primary">Submit</Button>
            </Form>
        </div>
    );
};

export default NewForm;