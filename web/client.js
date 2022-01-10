// client.js
import sanityClient from '@sanity/client'

const sanityConfig = {
    // Find your project ID and dataset in `sanity.json` in your studio project
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
    apiVersion: '2021-03-25',
    // see https://www.sanity.io/docs/api-versioning for how versioning works
}

export default sanityClient(sanityConfig);