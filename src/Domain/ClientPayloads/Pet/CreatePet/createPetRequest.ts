export interface CreatePetRequest {
  owner_id: string,
  name: string;
  behaviour: string;
  info_about?: string;
}