const { ME_USER_NAME_PLACEHOLDER } = require('apify-shared/consts');
const { APIFY_API_ENDPOINTS } = require('./consts');

// This method can return any truthy value to indicate the credentials are valid.
const testAuth = async (z) => {
    const response = await z.request(`${APIFY_API_ENDPOINTS.users}/${ME_USER_NAME_PLACEHOLDER}`);

    if (response.status !== 200) {
        throw new Error('The API Token you supplied is invalid');
    }

    return response.json;
};

module.exports = {
    type: 'custom',
    fields: [
        {
            key: 'token',
            label: 'API token',
            required: true,
            type: 'string',
            helpText: 'You can find your API token at the bottom of your '
                + '**[Apify account](https://my.apify.com/account#/integrations)** page.',
        },
    ],
    // The test method allows Zapier to verify that the credentials a user provides are valid.
    test: testAuth,
    // This label will be shown after user connect his account.
    connectionLabel: (z, bundle) => {
        return bundle.inputData.username || bundle.inputData.email;
    },
};