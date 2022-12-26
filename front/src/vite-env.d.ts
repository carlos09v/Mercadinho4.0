/// <reference types="vite/client" />

/* IntelliSense for TypeScript */
interface ImportMetaEnv {
    readonly VITE_XRAPID_API_KEY: string
    readonly VITE_XRAPID_API_HOST_SENDGRID: string
    readonly VITE_XRAPID_API_HOST_BARCODELOOKUP: string
    readonly VITE_XRAPID_API_HOST_BARCODES: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
