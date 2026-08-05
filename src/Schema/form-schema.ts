// @/formSchema/schema.ts
import * as Yup from 'yup';

export const FormSchema = Yup.object({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

export type LoginFormValues = Yup.InferType<typeof FormSchema>;