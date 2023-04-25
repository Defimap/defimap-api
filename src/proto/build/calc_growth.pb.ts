/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "calc_growth";

export interface Growth {
  date: string;
  startDayInvestment: number;
  endDayInvestment: number;
}

export interface GetCalcIndexGrowthRequest {
  token: string;
  initialInvestment: number;
  startDate: string;
  endDate: string;
}

export interface GetCalcIndexGrowthResponse {
  growths: Growth[];
}

export interface GetCalcCategoryGrowthRequest {
  category: string;
  initialInvestment: number;
  startDate: string;
  endDate: string;
}

export interface GetCalcCategoryGrowthResponse {
  growths: Growth[];
  totalStrategy: number;
}

export interface GetCalcStrategyGrowthRequest {
  strategy: string;
  initialInvestment: number;
  startDate: string;
  endDate: string;
}

export interface GetCalcStrategyGrowthResponse {
  growths: Growth[];
}

export const CALC_GROWTH_PACKAGE_NAME = "calc_growth";

export interface CalcGrowthServiceClient {
  getCalcIndexGrowth(request: GetCalcIndexGrowthRequest): Observable<GetCalcIndexGrowthResponse>;

  getCalcCategoryGrowth(request: GetCalcCategoryGrowthRequest): Observable<GetCalcCategoryGrowthResponse>;

  getCalcStrategyGrowth(request: GetCalcStrategyGrowthRequest): Observable<GetCalcStrategyGrowthResponse>;
}

export interface CalcGrowthServiceController {
  getCalcIndexGrowth(
    request: GetCalcIndexGrowthRequest,
  ): Promise<GetCalcIndexGrowthResponse> | Observable<GetCalcIndexGrowthResponse> | GetCalcIndexGrowthResponse;

  getCalcCategoryGrowth(
    request: GetCalcCategoryGrowthRequest,
  ): Promise<GetCalcCategoryGrowthResponse> | Observable<GetCalcCategoryGrowthResponse> | GetCalcCategoryGrowthResponse;

  getCalcStrategyGrowth(
    request: GetCalcStrategyGrowthRequest,
  ): Promise<GetCalcStrategyGrowthResponse> | Observable<GetCalcStrategyGrowthResponse> | GetCalcStrategyGrowthResponse;
}

export function CalcGrowthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getCalcIndexGrowth", "getCalcCategoryGrowth", "getCalcStrategyGrowth"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CalcGrowthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CalcGrowthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CALC_GROWTH_SERVICE_NAME = "CalcGrowthService";
