import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  author: {
    name: "Powerhouse Inc.",
    website: "https://www.powerhouse.inc",
  },
  description:
    "A builder account contains a builder profile information as well as managed spaces with linked packages.",
  extension: "phvba",
  id: "powerhouse/builder-team",
  name: "BuilderTeam",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "",
          id: "84f613e9-80e1-4ee5-bf56-b916e1780845",
          name: "profile",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "edbdc847-a0d0-40cb-a7cb-c057039e05da",
              name: "SET_LOGO",
              reducer: "",
              schema:
                'input SetLogoInput {\n  "Add your inputs here"\n  logo: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "6e0cb4ac-7e9a-4bd7-9310-556a171e2ec0",
              name: "SET_TEAM_NAME",
              reducer: "",
              schema:
                'input SetTeamNameInput {\n  "Add your inputs here"\n  name: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "41bc16d9-0d52-4329-b6ca-2d9378c167fb",
              name: "SET_SLUG",
              reducer: "",
              schema:
                'input SetSlugInput {\n  "Add your inputs here"\n  slug: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "a4ca6f24-1f77-48dc-a8c4-8d9782aaf05f",
              name: "SET_DESCRIPTION",
              reducer: "",
              schema:
                'input SetDescriptionInput {\n  "Add your inputs here"\n  description: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "6389d9b4-2738-4831-9cdb-4ac6f8c32c5f",
              name: "SET_SOCIALS",
              reducer: "",
              schema:
                'input SetSocialsInput {\n  "Add your inputs here"\n  xProfile: String\n  github: String\n  website: String\n  \n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "46f730e9-506a-4e3e-b9af-d5715882e0b9",
          name: "member",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "029cb62f-d647-427b-9334-64d96e5eb407",
              name: "ADD_MEMBER",
              reducer: "",
              schema:
                'input AddMemberInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "696fe1ed-4570-4e99-9c4a-34a21d909035",
              name: "UPDATE_MEMBER_INFO",
              reducer: "",
              schema:
                'input UpdateMemberInfoInput {\n  "Add your inputs here"\n  id: OID!\n  phid: PHID\n  ethAddress: String\n  name: String\n  profileImage: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "30ba9a40-a80c-4c4d-8190-5a67ff9dcf95",
              name: "REMOVE_MEMBER",
              reducer: "",
              schema:
                'input RemoveMemberInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "d3d7b51b-6ca4-4f16-a421-a744e81e7f42",
          name: "spaces",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "9c5d57ab-bf7d-43d9-bb6d-3d29a59ee70c",
              name: "ADD_SPACE",
              reducer: "",
              schema:
                'input AddSpaceInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "7a19ff1c-7d41-4d6c-9cdb-2a300a523cd0",
              name: "UPDATE_SPACE_INFO",
              reducer: "",
              schema:
                'input UpdateSpaceInfoInput {\n  "Add your inputs here"\n  id: OID!\n  title: String\n  description: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "2bea7ddb-ce86-46df-a76b-69d8283ff810",
              name: "REMOVE_SPACE",
              reducer: "",
              schema:
                'input RemoveSpaceInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "a42429b5-bf95-4948-b730-dd644bdae5cb",
          name: "packages",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "a9a26a27-0774-4858-8fc6-750fbf11648a",
              name: "ADD_PACKAGE",
              reducer: "",
              schema:
                'input AddPackageInput {\n  "Add your inputs here"\n  id: OID!\n  spaceId: OID!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "327caf73-0e96-47da-aa58-7d90b89c38b6",
              name: "UPDATE_PACKAGE_INFO",
              reducer: "",
              schema:
                'input UpdatePackageInfoInput {\n  "Add your inputs here"\n  id: OID!\n  spaceId: OID\n  phid: PHID\n  title: String\n  description: String\n  github: String\n  npm: String\n  vetraDriveUrl: URL\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "ff08908f-3754-4154-acdd-0f280129f07d",
              name: "REMOVE_PACKAGE",
              reducer: "",
              schema:
                'input RemovePackageInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"profile\\": {\\n    \\"logo\\": null,\\n    \\"name\\": \\"\\",\\n    \\"slug\\": \\"\\",\\n    \\"description\\": null,\\n    \\"socials\\": {\\n      \\"xProfile\\": null,\\n      \\"github\\": null,\\n      \\"website\\": null\\n    }\\n  },\\n  \\"members\\": [],\\n  \\"spaces\\": []\\n}"',
          schema:
            "type BuilderTeamState {\n  profile: VetraBuilderProfile!\n  members: [RenownProfileInfo!]!\n  spaces: [VetraBuilderSpace!]!\n}\n\ntype RenownProfileInfo { \n  id: OID!\n  phid: PHID\n  ethAddress: String\n  name: String\n  profileImage: String\n}\n\ntype VetraBuilderProfile {\n  logo: URL\n  name: String!\n  slug: String!\n  description: String\n  socials: VetraBuilderSocials!\n}\n\ntype VetraBuilderSocials {\n  xProfile: URL\n  github: URL \n  website: URL\n}\n\ntype VetraBuilderSpace {\n  id: OID!\n  title: String!\n  description: String\n  packages: [VetraPackageInfo!]!\n}\n\ntype VetraPackageInfo { \n  id: OID!\n  phid: PHID\n  title: String\n  description: String\n  github: String\n  npm: String\n  vetraDriveUrl: URL\n}",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
