import RecipeDetailClient from "@/components/recipes/recipe-detail-client";
import { notFound } from "next/navigation";

interface RecipeDetailProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetail({ params }: RecipeDetailProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!id || Number.isNaN(numericId)) {
    notFound();
  }

  return <RecipeDetailClient id={numericId} />;
}