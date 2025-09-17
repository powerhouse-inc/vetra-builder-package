import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
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
              id: "c4775084-5f1d-43a8-bd95-044bd42c804e",
              name: "SET_SOCIALS",
              reducer: "",
              schema:
                'input SetSocialsInput {\n  "Add your inputs here"\n  x: URL\n  github: URL\n  website: URL\n}',
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
              name: "REMOVE_SPACE",
              reducer: "",
              schema:
                'input RemoveSpaceInput {\n  "Add your inputs here"\n  slug: String\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [
                {
                  code: "SpaceNotFound",
                  description: "",
                  id: "3582390a-3ea5-4338-831b-f707f74859e2",
                  name: "SpaceNotFound",
                  template: "",
                },
              ],
              examples: [],
              id: "25be2594-f730-4514-acc6-06773ebb45e1",
              name: "ADD_PACKAGE_TO_SPACE",
              reducer: "",
              schema:
                'input AddPackageToSpaceInput {\n  "Add your inputs here"\n  spaceSlug: String!\n  package: PHID!\n}',
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [
                {
                  code: "SpaceNotFound",
                  description: "",
                  id: "3fa9ff35-b54e-43ae-b068-2da51af29ee0",
                  name: "SpaceNotFound",
                  template: "",
                },
              ],
              examples: [],
              id: "d262e457-746d-4447-8af4-8356e11a1873",
              name: "REMOVE_PACKAGE_FROM_SPACE",
              reducer: "",
              schema:
                'input RemovePackageFromSpaceInput {\n  "Add your inputs here"\n  spaceSlug: String!\n  package: PHID!\n}',
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
            "type BuilderAccountState {\n  profile: VetraBuilderProfile!\n  members: [EthereumAddress!]!\n  spaces: [VetraBuilderSpace!]!\n}\n\ntype VetraBuilderProfile {\n  logo: URL\n  name: String!\n  slug: String!\n  description: String\n  socials: VetraBuilderSocials!\n}\n\ntype VetraBuilderSocials {\n  xProfile: URL\n  github: URL \n  website: URL\n}\n\ntype VetraBuilderSpace {\n  title: String!\n  description: String\n  packages: [PHID!]!\n}\n",
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
