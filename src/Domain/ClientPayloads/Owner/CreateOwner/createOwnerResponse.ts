import { DefaultResponse } from "../../defaultResponse";

export interface CreateOwnerResponse extends DefaultResponse<any>{
  email: string;
  name: string;

}