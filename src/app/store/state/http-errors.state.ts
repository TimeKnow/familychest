export interface HttpErrorsState {
  errorMessage: string;
  errorStatusCode: number;
}

export const initialHttpErrorsState: HttpErrorsState = {
  errorMessage: '',
  errorStatusCode: 0
};
