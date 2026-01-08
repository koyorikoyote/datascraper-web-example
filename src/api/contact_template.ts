import axios from "@/lib/api";
import type { ContactTemplateCreate, ContactTemplateUpdate } from "@/interfaces";

export const contactTemplateApi = {
  // Create ContactTemplate
  create: (payload: ContactTemplateCreate) =>
    axios.post("/contact-templates/", payload, { withCredentials: true }),

  // List ContactTemplates
  list: () =>
    axios.get("/contact-templates/", { withCredentials: true }),

  // Read ContactTemplate
  read: (contactTemplateId: number) =>
    axios.get(`/contact-templates/${contactTemplateId}/`, { withCredentials: true }),

  // Update ContactTemplate
  update: (contactTemplateId: number, payload: ContactTemplateUpdate) =>
    axios.put(`/contact-templates/${contactTemplateId}/`, payload, { withCredentials: true }),

  // Delete ContactTemplate
  delete: (contactTemplateId: number) =>
    axios.delete(`/contact-templates/${contactTemplateId}/`, { withCredentials: true }),
};