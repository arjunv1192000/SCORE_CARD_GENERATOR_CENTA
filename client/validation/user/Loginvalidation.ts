
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';

interface MyFormData {
    name:string;
    email: string;
    
}

const validationSchema: ObjectSchema<MyFormData> = Yup.object().shape({
    name: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers')
        .min(5, 'Full name must be at least 5 characters')
        .required('Full name is required'),
    email: Yup.string()
        .trim()
        .email('Invalid email')
        .required('Email is required'),
   
    

});
export default validationSchema;