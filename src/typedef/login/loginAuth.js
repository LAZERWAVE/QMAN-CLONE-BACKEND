export const LoginAuth = `
    type LoginAuth {
        accessToken: String!        # Ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXR...
        accessTokenMessier: String! # Ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGk...
        expires: String!            # Ex: 2021-05-25T21:46:18.8045909+07:00
        type: TypeAuth!             # Ex: ASSISTANT / OFFICER
    }
`;

export const LoginInput = `
    input LoginInput {
        username: String! # Ex: RX19-2
        password: String! # Ex: XXX
    }
`;

