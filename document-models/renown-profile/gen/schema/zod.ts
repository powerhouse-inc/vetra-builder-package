import { z } from "zod";
import type {
  AddAuthorizationInput,
  RenownAuthorization,
  RenownProfileState,
  RevokeAuthorizationInput,
  SetEthAddressInput,
  SetUserImageInput,
  SetUsernameInput,
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

export function AddAuthorizationInputSchema(): z.ZodObject<
  Properties<AddAuthorizationInput>
> {
  return z.object({
    audience: z.string().nullish(),
    expiry: z.number().nullish(),
    id: z.string(),
    issuer: z.string(),
    subject: z.string(),
  });
}

export function RenownAuthorizationSchema(): z.ZodObject<
  Properties<RenownAuthorization>
> {
  return z.object({
    __typename: z.literal("RenownAuthorization").optional(),
    audience: z.string().nullable(),
    expiry: z.number().nullable(),
    id: z.string(),
    issuer: z.string(),
    subject: z.string(),
  });
}

export function RenownProfileStateSchema(): z.ZodObject<
  Properties<RenownProfileState>
> {
  return z.object({
    __typename: z.literal("RenownProfileState").optional(),
    authorizations: z.array(RenownAuthorizationSchema()),
    ethAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullable(),
    userImage: z.string().nullable(),
    username: z.string().nullable(),
  });
}

export function RevokeAuthorizationInputSchema(): z.ZodObject<
  Properties<RevokeAuthorizationInput>
> {
  return z.object({
    authorizationId: z.string(),
  });
}

export function SetEthAddressInputSchema(): z.ZodObject<
  Properties<SetEthAddressInput>
> {
  return z.object({
    ethAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      }),
  });
}

export function SetUserImageInputSchema(): z.ZodObject<
  Properties<SetUserImageInput>
> {
  return z.object({
    userImage: z.string().nullish(),
  });
}

export function SetUsernameInputSchema(): z.ZodObject<
  Properties<SetUsernameInput>
> {
  return z.object({
    username: z.string(),
  });
}
