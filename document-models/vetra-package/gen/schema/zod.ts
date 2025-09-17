import { z } from "zod";
import type {
  AddKeywordsInput,
  RemoveKeywordsInput,
  SetAuthorInput,
  SetPackageCategoryInput,
  SetPackageDescriptionInput,
  SetPackageGithubInput,
  SetPackageNameInput,
  SetPackageNpmInput,
  VetraBuilderPackageAuthor,
  VetraBuilderPackageKeyword,
  VetraPackageState,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddKeywordsInputSchema(): z.ZodObject<
  Properties<AddKeywordsInput>
> {
  return z.object({
    id: z.string().nullish(),
    label: z.string(),
  });
}

export function RemoveKeywordsInputSchema(): z.ZodObject<
  Properties<RemoveKeywordsInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SetAuthorInputSchema(): z.ZodObject<
  Properties<SetAuthorInput>
> {
  return z.object({
    name: z.string(),
    website: z.string().url().nullish(),
  });
}

export function SetPackageCategoryInputSchema(): z.ZodObject<
  Properties<SetPackageCategoryInput>
> {
  return z.object({
    category: z.string(),
  });
}

export function SetPackageDescriptionInputSchema(): z.ZodObject<
  Properties<SetPackageDescriptionInput>
> {
  return z.object({
    description: z.string(),
  });
}

export function SetPackageGithubInputSchema(): z.ZodObject<
  Properties<SetPackageGithubInput>
> {
  return z.object({
    github: z.string().url(),
  });
}

export function SetPackageNameInputSchema(): z.ZodObject<
  Properties<SetPackageNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function SetPackageNpmInputSchema(): z.ZodObject<
  Properties<SetPackageNpmInput>
> {
  return z.object({
    npm: z.string().url(),
  });
}

export function VetraBuilderPackageAuthorSchema(): z.ZodObject<
  Properties<VetraBuilderPackageAuthor>
> {
  return z.object({
    __typename: z.literal("VetraBuilderPackageAuthor").optional(),
    name: z.string(),
    website: z.string().url().nullable(),
  });
}

export function VetraBuilderPackageKeywordSchema(): z.ZodObject<
  Properties<VetraBuilderPackageKeyword>
> {
  return z.object({
    __typename: z.literal("VetraBuilderPackageKeyword").optional(),
    id: z.string(),
    label: z.string(),
  });
}

export function VetraPackageStateSchema(): z.ZodObject<
  Properties<VetraPackageState>
> {
  return z.object({
    __typename: z.literal("VetraPackageState").optional(),
    author: VetraBuilderPackageAuthorSchema(),
    category: z.string().nullable(),
    description: z.string().nullable(),
    github: z.string().url().nullable(),
    keywords: z.array(VetraBuilderPackageKeywordSchema()),
    name: z.string(),
    npm: z.string().url().nullable(),
  });
}
