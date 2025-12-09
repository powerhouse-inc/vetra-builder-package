import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse Inc.",
    website: "https://www.powerhouse.inc",
  },
  description:
    "A builder account contains a builder profile information as well as managed spaces with linked packages.",
  extension: "phvba",
  id: "powerhouse/vetra/builder-account",
  name: "BuilderAccount",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "",
          id: "956b252d-242d-4a65-a05a-9c7fc0e6f0ec",
          name: "profile",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "1da0a31b-fcab-4a65-829b-8c510fcbdb80",
              name: "SET_LOGO",
              reducer: "",
              schema:
                'input SetLogoInput {\n  "Add your inputs here"\n  logoUrl: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "12cc5fb2-e471-459c-88b2-2120a3f1d799",
              name: "SET_PROFILE_NAME",
              reducer: "",
              schema:
                'input SetProfileNameInput {\n  "Add your inputs here"\n  name: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "b60ad617-1812-4609-ad48-286d231b5be5",
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
              id: "3fb3ee10-982f-4236-81ec-ed9fc2883848",
              name: "SET_PROFILE_DESCRIPTION",
              reducer: "",
              schema:
                'input SetProfileDescriptionInput {\n  "Add your inputs here"\n  description: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "d35c76a4-6264-4c1c-9b49-406fdae985f4",
              name: "UPDATE_SOCIALS",
              reducer: "",
              schema:
                'input UpdateSocialsInput {\n  "Add your inputs here"\n  x: URL\n  github: URL\n  website: URL\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "a54d3cc2-df3a-4533-a2ec-f8f0749a07fe",
          name: "members",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "2be30ebb-09af-4aac-8341-2039451edda6",
              name: "ADD_MEMBER",
              reducer: "",
              schema:
                'input AddMemberInput {\n  "Add your inputs here"\n  ethAddress: EthereumAddress\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "23749f96-d8db-403e-9eca-fc94861493a4",
              name: "REMOVE_MEMBER",
              reducer: "",
              schema:
                'input RemoveMemberInput {\n  "Add your inputs here"\n  ethAddress: EthereumAddress\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "a51e6d2e-bf33-48ad-a96f-f58ea9c07d3f",
          name: "spaces",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "8d4ea31c-ca59-4d41-b434-faf0f8cdacb2",
              name: "ADD_SPACE",
              reducer: "",
              schema:
                'input AddSpaceInput {\n  "Add your inputs here"\n  title: String!\n  description: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [
                {
                  code: "SpaceNotFound",
                  description: "",
                  id: "35e9b8a9-dc0e-449f-bd08-b4a0592bfd32",
                  name: "SpaceNotFound",
                  template: "",
                },
              ],
              examples: [],
              id: "3126b54e-4b95-4cd4-8e41-09d02ac43f91",
              name: "DELETE_SPACE",
              reducer: "",
              schema:
                'input DeleteSpaceInput {\n  "Add your inputs here"\n  id: OID!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "bba5e947-f112-4f92-8a40-740f8d5aced9",
              name: "SET_SPACE_TITLE",
              reducer: "",
              schema:
                'input SetSpaceTitleInput {\n  "Add your inputs here"\n  id: OID!\n  newTitle: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "3793893f-ea2b-44e7-a68b-771fdc1f7b89",
              name: "SET_SPACE_DESCRIPTION",
              reducer: "",
              schema:
                'input SetSpaceDescriptionInput {\n  "Add your inputs here"\n  id: OID!\n  description: String!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "d4628931-8fad-4778-b445-c08663a6b3ae",
              name: "REORDER_SPACES",
              reducer: "",
              schema:
                'input ReorderSpacesInput {\n  "Add your inputs here"\n  ids: [OID!]!, insertAfter: OID\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "7b47d6b1-d0e9-40c6-a021-ed22b2b4dbc6",
          name: "packages",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "992b606d-c59b-466d-b30d-785cf7c77f7c",
              name: "ADD_PACKAGE",
              reducer: "",
              schema:
                'input AuthorInput {\n  name: String!\n  website: URL\n}\n\ninput AddPackageInput {\n  "Add your inputs here"\n  spaceId: OID!\n  name: String!\n  description: String\n  category: String\n  author: AuthorInput\n  keywords: [String!]\n  github: URL\n  npm: URL\n  vetraDriveUrl: URL\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "c457a69d-c570-43b6-bbb1-68aca95bc1c3",
              name: "SET_PACKAGE_DRIVE_ID",
              reducer: "",
              schema:
                'input SetPackageDriveIdInput {\n  "Add your inputs here"\n  packageId: OID!\n  driveId: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "cb82b50c-a33c-480a-8c29-1a7f95191bae",
              name: "UPDATE_PACKAGE",
              reducer: "",
              schema:
                'input UpdatePackageInput {\n  "Add your inputs here"\n  id: OID!\n  title: String\n  description: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "82821647-90f0-47bd-9fce-31f260727d46",
              name: "REORDER_PACKAGES",
              reducer: "",
              schema:
                'input ReorderPackagesInput {\n  "Add your inputs here"\n  spaceId: OID!\n  ids: [OID!]!\n  insertAfter: OID\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "578b4c06-cdb0-4df4-bdda-620430f592d4",
              name: "DELETE_PACKAGE",
              reducer: "",
              schema:
                'input DeletePackageInput {\n  "Add your inputs here"\n  id: OID!\n}',
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
            "type BuilderAccountState {\n  profile: VetraBuilderProfile!\n  members: [EthereumAddress!]!\n  spaces: [VetraBuilderSpace!]!\n}\n\ntype VetraBuilderProfile {\n  logo: URL\n  name: String!\n  slug: String!\n  description: String\n  socials: VetraBuilderSocials!\n}\n\ntype VetraBuilderSocials {\n  xProfile: URL\n  github: URL \n  website: URL\n}\n\ntype VetraBuilderSpace {\n  id: OID!\n  title: String!\n  description: String\n  packages: [VetraBuilderPackage!]!\n}\n\ntype VetraBuilderPackage {\n  id: OID!\n  name: String!\n  description: String\n  category: String\n  author: VetraBuilderPackageAuthor!\n  keywords: [VetraBuilderPackageKeyword!]!\n  github: URL\n  npm: URL\n  vetraDriveUrl: URL\n}\n\ntype VetraBuilderPackageAuthor {\n  name: String!\n  website: URL\n}\n\ntype VetraBuilderPackageKeyword {\n  id: OID!\n  label: String!\n}\n",
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
