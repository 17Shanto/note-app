declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongodbURL: string;
      PORT?: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
