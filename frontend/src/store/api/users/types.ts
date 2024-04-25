export interface IAddUserRequest {
  email: string;
  hash: string;
  salt: string;
  surname: string;
  name: string;
  lastname: string;
}

export interface IEditUsersRequest {
  id?: string;
  email?: string;
  hash?: string;
  salt?: string;
  surname?: string;
  name?: string;
  lastname?: string;
}

export interface IGetUsersRequest {
  page: number;
  limit: number;
}

export interface IGetCertainUsersRequest {
  id: string;
}

export interface IDeleteUsersRequest {
  id: string;
}