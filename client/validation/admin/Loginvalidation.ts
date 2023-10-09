
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';

interface MyFormData {
   
    email: string;
    password: string;
}

const validationSchema: ObjectSchema<MyFormData> = Yup.object().shape({
   
    email: Yup.string()
        .trim()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .trim()
        .min(4, 'Password must be at least 6 characters')
        .required('Password is required'),
    

});
export default validationSchema;