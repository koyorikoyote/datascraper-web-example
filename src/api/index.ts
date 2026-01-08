import { authApi } from "./auth";
import { userApi } from "./user";
import { userRoleApi } from "./user_role";
import { keywordApi } from "./keyword";
import { serpApi } from "./serp";
import { hubspotApi } from "./hubspot";
import { batchHistoryApi } from "./batch_history";
import { contactTemplateApi } from "./contact_template";
import { scoreSettingApi } from "./score_setting";
import { dashboardApi } from "./dashboard";
import { sqsApi } from "./sqs";
import { clientApi } from "./client";

const api = {
  auth: authApi,
  user: userApi,
  userRole: userRoleApi,
  keyword: keywordApi,
  serp: serpApi,
  hubspot: hubspotApi,
  batchHistory: batchHistoryApi,
  contactTemplate: contactTemplateApi,
  scoreSetting: scoreSettingApi,
  dashboard: dashboardApi,
  sqs: sqsApi,
  client: clientApi
};

export default api;