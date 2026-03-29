/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as z from "zod";
import type {
  AddMemberInput,
  AddPackageInput,
  AddSpaceInput,
  AuthorInput,
  BuilderAccountState,
  DeletePackageInput,
  DeleteSpaceInput,
  RemoveMemberInput,
  ReorderPackagesInput,
  ReorderSpacesInput,
  SetLogoInput,
  SetPackageDriveIdInput,
  SetProfileDescriptionInput,
  SetProfileNameInput,
  SetSlugInput,
  SetSpaceDescriptionInput,
  SetSpaceTitleInput,
  UpdatePackageInput,
  UpdateSocialsInput,
  VetraBuilderPackage,
  VetraBuilderPackageAuthor,
  VetraBuilderPackageKeyword,
  VetraBuilderProfile,
  VetraBuilderSocials,
  VetraBuilderSpace,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
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

export function AddPackageInputSchema(): z.ZodObject<
  Properties<AddPackageInput>
> {
  return z.object({
    author: z.lazy(() => AuthorInputSchema().nullish()),
    category: z.string().nullish(),
    description: z.string().nullish(),
    github: z.url().nullish(),
    keywords: z.array(z.string()).nullish(),
    name: z.string(),
    npm: z.url().nullish(),
    spaceId: z.string(),
    vetraDriveUrl: z.url().nullish(),
  });
}

export function AddSpaceInputSchema(): z.ZodObject<Properties<AddSpaceInput>> {
  return z.object({
    description: z.string().nullish(),
    title: z.string(),
  });
}

export function AuthorInputSchema(): z.ZodObject<Properties<AuthorInput>> {
  return z.object({
    name: z.string(),
    website: z.url().nullish(),
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
    profile: z.lazy(() => VetraBuilderProfileSchema()),
    spaces: z.array(z.lazy(() => VetraBuilderSpaceSchema())),
  });
}

export function DeletePackageInputSchema(): z.ZodObject<
  Properties<DeletePackageInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteSpaceInputSchema(): z.ZodObject<
  Properties<DeleteSpaceInput>
> {
  return z.object({
    id: z.string(),
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

export function ReorderPackagesInputSchema(): z.ZodObject<
  Properties<ReorderPackagesInput>
> {
  return z.object({
    ids: z.array(z.string()),
    insertAfter: z.string().nullish(),
    spaceId: z.string(),
  });
}

export function ReorderSpacesInputSchema(): z.ZodObject<
  Properties<ReorderSpacesInput>
> {
  return z.object({
    ids: z.array(z.string()),
    insertAfter: z.string().nullish(),
  });
}

export function SetLogoInputSchema(): z.ZodObject<Properties<SetLogoInput>> {
  return z.object({
    logoUrl: z.string(),
  });
}

export function SetPackageDriveIdInputSchema(): z.ZodObject<
  Properties<SetPackageDriveIdInput>
> {
  return z.object({
    driveId: z.string().nullish(),
    packageId: z.string(),
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

export function SetSpaceDescriptionInputSchema(): z.ZodObject<
  Properties<SetSpaceDescriptionInput>
> {
  return z.object({
    description: z.string(),
    id: z.string(),
  });
}

export function SetSpaceTitleInputSchema(): z.ZodObject<
  Properties<SetSpaceTitleInput>
> {
  return z.object({
    id: z.string(),
    newTitle: z.string(),
  });
}

export function UpdatePackageInputSchema(): z.ZodObject<
  Properties<UpdatePackageInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
  });
}

export function UpdateSocialsInputSchema(): z.ZodObject<
  Properties<UpdateSocialsInput>
> {
  return z.object({
    github: z.url().nullish(),
    website: z.url().nullish(),
    x: z.url().nullish(),
  });
}

export function VetraBuilderPackageSchema(): z.ZodObject<
  Properties<VetraBuilderPackage>
> {
  return z.object({
    __typename: z.literal("VetraBuilderPackage").optional(),
    author: z.lazy(() => VetraBuilderPackageAuthorSchema()),
    category: z.string().nullish(),
    description: z.string().nullish(),
    github: z.url().nullish(),
    id: z.string(),
    keywords: z.array(z.lazy(() => VetraBuilderPackageKeywordSchema())),
    name: z.string(),
    npm: z.url().nullish(),
    vetraDriveUrl: z.url().nullish(),
  });
}

export function VetraBuilderPackageAuthorSchema(): z.ZodObject<
  Properties<VetraBuilderPackageAuthor>
> {
  return z.object({
    __typename: z.literal("VetraBuilderPackageAuthor").optional(),
    name: z.string(),
    website: z.url().nullish(),
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

export function VetraBuilderProfileSchema(): z.ZodObject<
  Properties<VetraBuilderProfile>
> {
  return z.object({
    __typename: z.literal("VetraBuilderProfile").optional(),
    description: z.string().nullish(),
    logo: z.url().nullish(),
    name: z.string(),
    slug: z.string(),
    socials: z.lazy(() => VetraBuilderSocialsSchema()),
  });
}

export function VetraBuilderSocialsSchema(): z.ZodObject<
  Properties<VetraBuilderSocials>
> {
  return z.object({
    __typename: z.literal("VetraBuilderSocials").optional(),
    github: z.url().nullish(),
    website: z.url().nullish(),
    xProfile: z.url().nullish(),
  });
}

export function VetraBuilderSpaceSchema(): z.ZodObject<
  Properties<VetraBuilderSpace>
> {
  return z.object({
    __typename: z.literal("VetraBuilderSpace").optional(),
    description: z.string().nullish(),
    id: z.string(),
    packages: z.array(z.lazy(() => VetraBuilderPackageSchema())),
    title: z.string(),
  });
}
