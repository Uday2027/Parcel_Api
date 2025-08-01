// import { Types } from 'mongoose';

// export type ParcelStatus = 'Requested' | 'Approved' | 'Dispatched' | 'In Transit' | 'Delivered' | 'Cancelled' | 'Blocked';

// export interface IStatusLog {
//   status: ParcelStatus;
//   timestamp?: Date;
//   updatedBy: string;
//   note?: string;
// }

// export interface IParcel {
//   _id?: Types.ObjectId;
//   trackingId?: string;
//   sender: Types.ObjectId;
//   receiver: Types.ObjectId;
//   weight: number;
//   fee?: number;
//   status: ParcelStatus;
//   statusLogs: IStatusLog[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }



import { Types } from 'mongoose';

export type ParcelStatus =
  | 'Requested'
  | 'Approved'
  | 'Dispatched'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled';

export interface IStatusLog {
  status: ParcelStatus;
  note?: string;
  updatedBy: Types.ObjectId; // User reference
  timestamp?: Date;
  location?: string;
}

export interface IParcel {
  _id?: Types.ObjectId;
  trackingId?: string;
  sender: Types.ObjectId; // User reference
  receiver: Types.ObjectId; // User reference
  type: string; // e.g., "Box", "Document"
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  fee: number;
  estimatedDeliveryDate?: Date;
  isFlagged?: boolean;
  isHeld?: boolean;
  statusLogs: IStatusLog[];
  createdAt?: Date;
  updatedAt?: Date;
}
