import {AdultData, ChildData} from '@tandem/redux/slices/createChild.slice';
import {TermsInterface} from '@tandem/redux/slices/userData.slice';

export enum ServicePlansType {
  TRIAL = 'TRIAL',
  SUBSCRIPTION = 'SUBSCRIPTION',
  TOP_UP = 'TOP_UP',
  SPECIAL_TRIAL = 'SPECIAL_TRIAL',
}

export enum SubscriptionPlanStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PAST_DUE = 'PAST_DUE',
}

export interface UserDataResponse {
  firstName: string;
  lastName: string;
  userId: string;
  children?: ChildData[];
  adults?: AdultData[];
  termsAndConditions: boolean;
  allowNotifications: boolean;
  consentForm: TermsInterface;
  name: string;
  email: string;
  plan: {
    _id: string;
    currentSubscriptionCycle: string;
    status: SubscriptionPlanStatus;
    type: ServicePlansType;
    startDate: string;
    endDate: null | string;
    usageDetails: {
      totalCredits: number;
      usedCredits: number;
    };
  };
}
