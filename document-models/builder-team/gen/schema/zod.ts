import { z } from "zod";
import type {
  AddMemberInput,
  AddPackageInput,
  AddSpaceInput,
  BuilderTeamState,
  RemoveMemberInput,
  RemovePackageInput,
  RemoveSpaceInput,
  RenownProfileInfo,
  SetDescriptionInput,
  SetLogoInput,
  SetSlugInput,
  SetSocialsInput,
  SetTeamNameInput,
  UpdateMemberInfoInput,
  UpdatePackageInfoInput,
  UpdateSpaceInfoInput,
  VetraBuilderProfile,
  VetraBuilderSocials,
  VetraBuilderSpace,
  VetraPackageInfo,
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
    id: z.string(),
  });
}

export function AddPackageInputSchema(): z.ZodObject<
  Properties<AddPackageInput>
> {
  return z.object({
    id: z.string(),
    spaceId: z.string(),
  });
}

export function AddSpaceInputSchema(): z.ZodObject<Properties<AddSpaceInput>> {
  return z.object({
    id: z.string(),
  });
}

export function BuilderTeamStateSchema(): z.ZodObject<
  Properties<BuilderTeamState>
> {
  return z.object({
    __typename: z.literal("BuilderTeamState").optional(),
    members: z.array(RenownProfileInfoSchema()),
    profile: VetraBuilderProfileSchema(),
    spaces: z.array(VetraBuilderSpaceSchema()),
  });
}

export function RemoveMemberInputSchema(): z.ZodObject<
  Properties<RemoveMemberInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemovePackageInputSchema(): z.ZodObject<
  Properties<RemovePackageInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveSpaceInputSchema(): z.ZodObject<
  Properties<RemoveSpaceInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RenownProfileInfoSchema(): z.ZodObject<
  Properties<RenownProfileInfo>
> {
  return z.object({
    __typename: z.literal("RenownProfileInfo").optional(),
    ethAddress: z.string().nullable(),
    id: z.string(),
    name: z.string().nullable(),
    phid: z.string().nullable(),
    profileImage: z.string().nullable(),
  });
}

export function SetDescriptionInputSchema(): z.ZodObject<
  Properties<SetDescriptionInput>
> {
  return z.object({
    description: z.string().nullish(),
  });
}

export function SetLogoInputSchema(): z.ZodObject<Properties<SetLogoInput>> {
  return z.object({
    logo: z.string().nullish(),
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
    github: z.string().nullish(),
    website: z.string().nullish(),
    xProfile: z.string().nullish(),
  });
}

export function SetTeamNameInputSchema(): z.ZodObject<
  Properties<SetTeamNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function UpdateMemberInfoInputSchema(): z.ZodObject<
  Properties<UpdateMemberInfoInput>
> {
  return z.object({
    ethAddress: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    phid: z.string().nullish(),
    profileImage: z.string().nullish(),
  });
}

export function UpdatePackageInfoInputSchema(): z.ZodObject<
  Properties<UpdatePackageInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    phid: z.string().nullish(),
    spaceId: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateSpaceInfoInputSchema(): z.ZodObject<
  Properties<UpdateSpaceInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
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
    id: z.string(),
    packages: z.array(VetraPackageInfoSchema()),
    title: z.string(),
  });
}

export function VetraPackageInfoSchema(): z.ZodObject<
  Properties<VetraPackageInfo>
> {
  return z.object({
    __typename: z.literal("VetraPackageInfo").optional(),
    description: z.string().nullable(),
    id: z.string(),
    phid: z.string().nullable(),
    title: z.string().nullable(),
  });
}
