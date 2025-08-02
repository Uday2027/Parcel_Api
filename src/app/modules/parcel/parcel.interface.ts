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
  updatedBy?: Types.ObjectId; 
  timestamp?: Date;
  location?: string;
}

export interface IParcel {
  _id?: Types.ObjectId;
  trackingId?: string;
  sender: Types.ObjectId; 
  receiver: Types.ObjectId; 
  type: string; 
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
