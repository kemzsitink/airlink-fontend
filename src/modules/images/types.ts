export interface Image {
  id: number;
  name: string;
  author?: string;
  authorName?: string;
  description?: string;
  startup: string;
  dockerImages: { [key: string]: string }[];
  variables: ImageVariable[];
  createdAt: string;
}

export interface ImageVariable {
  name: string;
  env: string;
  env_variable?: string;
  description?: string;
  value: string;
  default_value?: string;
  field_type?: "text" | "number";
  rules?: string;
}

export interface StoreImage {
  slug: string;
  name: string;
  author: string;
  description: string;
  tags: string[];
  installed: boolean;
}


