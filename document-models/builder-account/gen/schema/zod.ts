import { z } from "zod";
import type {
  AddMemberInput,
  AddPackageToSpaceInput,
  AddSpaceInput,
  BuilderAccountState,
  RemoveMemberInput,
  RemovePackageFromSpaceInput,
  RemoveSpaceInput,
  SetLogoInput,
  SetProfileDescriptionInput,
  SetProfileNameInput,
  SetSlugInput,
  SetSocialsInput,
  VetraBuilderProfile,
  VetraBuilderSocials,
  VetraBuilderSpace,
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

export function AddMemberInputSchema(): z.ZodObject<
  Properties<AddMemberInput>
> {
  return z.object({
    ethAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
  });
}

export function AddPackageToSpaceInputSchema(): z.ZodObject<
  Properties<AddPackageToSpaceInput>
> {
  return z.object({
    package: z.string(),
    spaceSlug: z.string(),
  });
}

export function AddSpaceInputSchema(): z.ZodObject<Properties<AddSpaceInput>> {
  return z.object({
    description: z.string().nullish(),
    title: z.string(),
  });
}

export function BuilderAccountStateSchema(): z.ZodObject<
  Properties<BuilderAccountState>
> {
  return z.object({
    __typename: z.literal("BuilderAccountState").optional(),
    members: z.array(
      z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, {
          message: "Invalid Ethereum address format",
        }),
    ),
    profile: VetraBuilderProfileSchema(),
    spaces: z.array(VetraBuilderSpaceSchema()),
  });
}

export function RemoveMemberInputSchema(): z.ZodObject<
  Properties<RemoveMemberInput>
> {
  return z.object({
    ethAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
  });
}

export function RemovePackageFromSpaceInputSchema(): z.ZodObject<
  Properties<RemovePackageFromSpaceInput>
> {
  return z.object({
    package: z.string(),
    spaceSlug: z.string(),
  });
}

export function RemoveSpaceInputSchema(): z.ZodObject<
  Properties<RemoveSpaceInput>
> {
  return z.object({
    slug: z.string().nullish(),
  });
}

export function SetLogoInputSchema(): z.ZodObject<Properties<SetLogoInput>> {
  return z.object({
    logoUrl: z.string(),
  });
}

export function SetProfileDescriptionInputSchema(): z.ZodObject<
  Properties<SetProfileDescriptionInput>
> {
  return z.object({
    description: z.string().nullish(),
  });
}

export function SetProfileNameInputSchema(): z.ZodObject<
  Properties<SetProfileNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function SetSlugInputSchema(): z.ZodObject<Properties<SetSlugInput>> {
  return z.object({
    slug: z.string(),
  });
}

export function SetSocialsInputSchema(): z.ZodObject<
  Properties<SetSocialsInput>
> {
  return z.object({
    github: z.string().url().nullish(),
    website: z.string().url().nullish(),
    x: z.string().url().nullish(),
  });
}

export function VetraBuilderProfileSchema(): z.ZodObject<
  Properties<VetraBuilderProfile>
> {
  return z.object({
    __typename: z.literal("VetraBuilderProfile").optional(),
    description: z.string().nullable(),
    logo: z.string().url().nullable(),
    name: z.string(),
    slug: z.string(),
    socials: VetraBuilderSocialsSchema(),
  });
}

export function VetraBuilderSocialsSchema(): z.ZodObject<
  Properties<VetraBuilderSocials>
> {
  return z.object({
    __typename: z.literal("VetraBuilderSocials").optional(),
    github: z.string().url().nullable(),
    website: z.string().url().nullable(),
    xProfile: z.string().url().nullable(),
  });
}

export function VetraBuilderSpaceSchema(): z.ZodObject<
  Properties<VetraBuilderSpace>
> {
  return z.object({
    __typename: z.literal("VetraBuilderSpace").optional(),
    description: z.string().nullable(),
    packages: z.array(z.string()),
    title: z.string(),
  });
}
