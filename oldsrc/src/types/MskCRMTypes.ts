export interface ResponseCRM {
  code: string;
  details: Details;
  message: string;
  status: string;
  error?: boolean;
}

export interface Details {
  Modified_Time: string;
  Modified_By: ModifiedBy;
  Created_Time: string;
  id: string;
  Created_By: CreatedBy;
}

export interface ModifiedBy {
  name: string;
  id: string;
}

export interface CreatedBy {
  name: string;
  id: string;
}
