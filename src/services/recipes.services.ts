import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Recipe } from "@/type-configuration/data";

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

/* ===========================
   GET RECIPES
=========================== */

export const getLimitedRecipe = () => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", "limited"],
    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=0&select=id,name,difficulty,cuisine,tags,userId,image,rating,mealType"
      );

      if (!res.ok) {
        throw new Error("Error getting recipes");
      }

      return res.json();
    },
  });
};

export const getAllRecipe = (enabled = true) => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", "all"],
    enabled,
    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/recipes?select=id,name,difficulty,cuisine,tags,userId,image,rating,mealType"
      );

      if (!res.ok) {
        throw new Error("Error getting recipes");
      }

      return res.json();
    },
  });
};

export const getRecipeById = (id: number) => {
  return useQuery<Recipe>({
    queryKey: ["recipe", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/recipes/${id}?select=id,name,difficulty,cuisine,tags,userId,image,rating,mealType,ingredients,instructions`
      );

      if (!res.ok) {
        throw new Error("Error getting recipe");
      }

      return res.json();
    },
  });
};

/* ===========================
   SEARCH
=========================== */

export const searchRecipes = (query: string) => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", "search", query],
    enabled: query.trim().length > 0,

    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${encodeURIComponent(
          query
        )}&select=id,name,difficulty,cuisine,tags,userId,image,rating,mealType,ingredients,instructions`
      );

      if (!res.ok) {
        throw new Error("Error searching recipes");
      }

      return res.json();
    },
  });
};

/* ===========================
   TAGS
=========================== */

export const getTags = () => {
  return useQuery<string[]>({
    queryKey: ["tags"],

    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/recipes/tags");

      if (!res.ok) {
        throw new Error("Error getting tags");
      }

      return res.json();
    },
  });
};

export const getRecipesByTag = (tag: string) => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", "tag", tag],

    enabled: tag.trim().length > 0,

    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/recipes/tag/${encodeURIComponent(
          tag
        )}?select=id,name,difficulty,cuisine,tags,userId,image,rating,mealType,ingredients,instructions`
      );

      if (!res.ok) {
        throw new Error("Error filtering recipes");
      }

      return res.json();
    },
  });
};

export const generateRecipeId = () => Date.now().toString();

export const useAddRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipe: any) => {
      const res = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) throw new Error("Failed to add recipe");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};