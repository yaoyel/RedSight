export interface IResult {
    IsSuccess: boolean;
    Data?: Object;
    ExceptionMessage?: string;
    Page?: number;
    PageSize?: number;
    PageCount?: number;
}
