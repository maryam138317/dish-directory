'use client';

import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { recipeSchema, RecipeValues } from "@/Schema/add-recipe-schema";
import { useAddRecipe, generateRecipeId, getTags } from "@/services/recipes.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'];

export default function AddForm({ user }: { user: { id: number } }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeValues>({
    resolver: yupResolver(recipeSchema),
    defaultValues: { tags: [], mealType: [], ingredients: [], instructions: [], difficulty: "" },
  });

  const { data: tagOptions, isLoading: tagsLoading } = getTags();
  const { mutate: addRecipe, isPending } = useAddRecipe();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [ingredientDraft, setIngredientDraft] = useState('');
  const [instructionDraft, setInstructionDraft] = useState('');

  const notify = () => {
    console.log('notify() called'); // TEMP: remove once confirmed working
    toast.success("Recipe added! (This won't really persist to a database.)", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const onSubmit = (data: RecipeValues) => {
    console.log('onSubmit fired with', data); // TEMP: remove once confirmed working

    const newRecipe = {
      ...data,
      image: previewUrl ?? '',
      id: generateRecipeId(),
      userId: user.id,
      rating: 0,
    };

    addRecipe(newRecipe, {
      onSuccess: () => notify(),
      onError: (err) => {
        console.error('addRecipe failed:', err); // TEMP: remove once confirmed working
        toast.error('Something went wrong adding the recipe.');
      },
    });
  };

  const onInvalid = (formErrors: typeof errors) => {
    // Fires when validation fails — helps confirm whether the form is even
    // being blocked before onSubmit runs at all.
    console.log('Validation failed:', formErrors); // TEMP: remove once confirmed working
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Add new recipe!</Typography>

      {/* ToastContainer moved outside the <form>, still inside this Box.
          If you already render a ToastContainer in app/layout.tsx, DELETE
          this one — you should only ever have one mounted per app. */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TextField
          label="Food Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <FormControl fullWidth error={!!errors.difficulty}>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="difficulty-label" label="Difficulty">
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            )}
          />
          {errors.difficulty && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {errors.difficulty.message}
            </Typography>
          )}
        </FormControl>

        <TextField
          label="Cuisine"
          {...register('cuisine')}
          error={!!errors.cuisine}
          helperText={errors.cuisine?.message}
          fullWidth
        />

        <FormControl fullWidth error={!!errors.tags}>
          <InputLabel id="tags-label">Tags</InputLabel>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                labelId="tags-label"
                label="Tags"
                value={field.value ?? []}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {tagsLoading && <MenuItem disabled>Loading tags...</MenuItem>}
                {tagOptions?.map((tag) => (
                  <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.tags && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {errors.tags.message}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth error={!!errors.mealType}>
          <InputLabel id="mealtype-label">Meal Type</InputLabel>
          <Controller
            name="mealType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                labelId="mealtype-label"
                label="Meal Type"
                value={field.value ?? []}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {mealTypeOptions.map((meal) => (
                  <MenuItem key={meal} value={meal}>{meal}</MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.mealType && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {errors.mealType.message}
            </Typography>
          )}
        </FormControl>

        {/* Ingredients — a simple add/remove list, backed by a Controller-managed string array */}
        <Controller
          name="ingredients"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Ingredients</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="e.g. 2 cups flour"
                  value={ingredientDraft}
                  onChange={(e) => setIngredientDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (!ingredientDraft.trim()) return;
                      field.onChange([...(field.value ?? []), ingredientDraft.trim()]);
                      setIngredientDraft('');
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (!ingredientDraft.trim()) return;
                    field.onChange([...(field.value ?? []), ingredientDraft.trim()]);
                    setIngredientDraft('');
                  }}
                >
                  Add
                </Button>
              </Box>
              <List dense>
                {(field.value ?? []).map((item: string, index: number) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => field.onChange(field.value.filter((_: string, i: number) => i !== index))}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              {errors.ingredients && (
                <Typography variant="caption" color="error">
                  {errors.ingredients.message as string}
                </Typography>
              )}
            </Box>
          )}
        />

        {/* Instructions — same pattern as ingredients, one step per entry */}
        <Controller
          name="instructions"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Instructions</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="e.g. Preheat oven to 200°C"
                  value={instructionDraft}
                  onChange={(e) => setInstructionDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (!instructionDraft.trim()) return;
                      field.onChange([...(field.value ?? []), instructionDraft.trim()]);
                      setInstructionDraft('');
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (!instructionDraft.trim()) return;
                    field.onChange([...(field.value ?? []), instructionDraft.trim()]);
                    setInstructionDraft('');
                  }}
                >
                  Add
                </Button>
              </Box>
              <List dense>
                {(field.value ?? []).map((step: string, index: number) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => field.onChange(field.value.filter((_: string, i: number) => i !== index))}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${index + 1}. ${step}`} />
                  </ListItem>
                ))}
              </List>
              {errors.instructions && (
                <Typography variant="caption" color="error">
                  {errors.instructions.message as string}
                </Typography>
              )}
            </Box>
          )}
        />

        <Box>
          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              {...(() => {
                const { onChange: rhfOnChange, ...rest } = register('image');
                return {
                  ...rest,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    rhfOnChange(e);
                    const file = e.target.files?.[0];
                    if (file) setPreviewUrl(URL.createObjectURL(file));
                  },
                };
              })()}
            />
          </Button>
          {errors.image && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
              {errors.image.message as string}
            </Typography>
          )}
          {previewUrl && (
            <Box sx={{ position: 'relative', width: 120, height: 120, mt: 2, borderRadius: 2, overflow: 'hidden' }}>
              <Image src={previewUrl} alt="Recipe preview" fill style={{ objectFit: 'cover' }} />
            </Box>
          )}
        </Box>

        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Recipe'}
        </Button>
      </form>
    </Box>
  );
}