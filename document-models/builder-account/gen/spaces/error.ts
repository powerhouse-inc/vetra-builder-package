export type ErrorCode = "SpaceNotFound";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class SpaceNotFound extends Error implements ReducerError {
  errorCode = "SpaceNotFound" as ErrorCode;
  constructor(message = "SpaceNotFound") {
    super(message);
  }
}

export const errors = {
  DeleteSpace: {
    SpaceNotFound,
  },
};
