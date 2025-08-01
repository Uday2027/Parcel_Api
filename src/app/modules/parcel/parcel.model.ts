
import mongoose, { Schema } from 'mongoose';
import { IParcel, IStatusLog } from './parcel.interface';

const statusLogSchema = new Schema<IStatusLog>({
  status: { type: String, enum: ['Requested', 'Approved', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'], required: true },
  note: { type: String },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
  timestamp: { type: Date, default: Date.now },
  location: { type: String },
});

const parcelSchema = new Schema<IParcel>({
  trackingId: { type: String, unique: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, }, // e.g., "Document", "Box"
  weight: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  fee: { type: Number, required: true },
  estimatedDeliveryDate: { type: Date },
  isFlagged: { type: Boolean, default: false },
  isHeld: { type: Boolean, default: false },
  statusLogs: [statusLogSchema],
}, {
  timestamps: true
});


parcelSchema.pre('save', function (next) {
  if (!this.trackingId) {
    const date = new Date();
    const formatted = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    this.trackingId = `TRK-${formatted}-${Math.floor(Math.random() * 1000000)}`;
  }
  next();
});

export const Parcel = mongoose.model<IParcel>('Parcel', parcelSchema);
