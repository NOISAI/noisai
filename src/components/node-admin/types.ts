
export type NodeUser = {
  id: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
};

export type UserFormData = {
  email: string;
  role: "node_operator" | "node_viewer";
  status: "active" | "inactive";
};
