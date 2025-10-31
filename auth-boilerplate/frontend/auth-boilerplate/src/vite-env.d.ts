/// <reference types="vite/client" />

declare module "*.jpg?format=webp" {
  const src: string;
  export default src;
}