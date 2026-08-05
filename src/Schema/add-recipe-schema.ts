import * as Yup from 'yup';

export const recipeSchema = Yup.object({
  name: Yup.string().required('Food Name is required!'),
  difficulty: Yup.string().required('Difficulty is required!'),
  cuisine: Yup.string().required('Cuisine is required!'),
  tags: Yup.array(Yup.string().required()).min(1, 'Select at least one tag').required(),
  mealType: Yup.array(Yup.string().required()).min(1, 'Select at least one meal type').required(),
  ingredients: Yup.array(Yup.string().required()).min(1, 'Add at least one ingredient').required(),
  instructions: Yup.array(Yup.string().required()).min(1, 'Add at least one step').required(),
  image: Yup.mixed<FileList>().required('Image is required!'),
});

export type RecipeValues = Yup.InferType<typeof recipeSchema>;