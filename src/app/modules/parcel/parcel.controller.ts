import { NextFunction, Request, Response } from 'express';
import { Parcel } from './parcel.model';
import { IStatusLog } from './parcel.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getAllParcel } from './parcel.service';
import Status from "http-status-codes"
import mongoose from 'mongoose';

const calculateFee = (weight: number): number => {
  const ratePerKg = 50; //lets say
  return weight * ratePerKg;
};

export const createParcel = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  const { receiver, phone, weight, type, pickupAddress, deliveryAddress, estimatedDeliveryDate } = req.body;
  const sender = req.user?.userId;

  const fee = calculateFee(weight); 

  
    const newParcel = await Parcel.create({
      sender,
      receiver,
      phone,
      type,
      weight,
      pickupAddress,
      deliveryAddress,
      estimatedDeliveryDate,
      fee, 
      statusLogs: [
        {
          status: 'Requested',
          updatedBy: sender,
          location: pickupAddress
        } as IStatusLog,
      ],
    });

    sendResponse(res, {
      success: true,
      Status: Status.CREATED,
      message: "Parcel Created Succesfully ˗ˏˋ ★ ˎˊ˗",
      data: newParcel

  })
});


export const getMyParcels = catchAsync(async (req: Request, res: Response, next:NextFunction)=> {
  const userId = req.user?.userId;
 
    const parcels = await Parcel.find({ sender: userId });
    sendResponse(res, {
      success: true,
      Status: Status.OK,
      message: "Your Parcel Fetched Successfully ˗ˏˋ ★ ˎˊ˗",
      data: parcels

  })
    
}) ;


export const cancelParcel = (async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const parcelId = req.params.id;

  try {
    const parcel = await Parcel.findById(parcelId);

    if (!parcel || parcel.sender.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized or Parcel not found' });
    }

    const lastStatus = parcel.statusLogs[parcel.statusLogs.length - 1]?.status;

    if (['Dispatched', 'Delivered'].includes(lastStatus)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel after dispatch' });
    }

    parcel.statusLogs.push({
      status: 'Cancelled',
      updatedBy: new mongoose.Types.ObjectId(userId),
      timestamp: new Date(),
    });

    await parcel.save();

    return res.json({ success: true, message: 'Parcel cancelled successfully' });

  } catch (err) {
    console.error('Cancel error:', err);
    return res.status(500).json({ success: false, message: 'Cancellation failed', error: err });
  }
});

export const getAllParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await getAllParcel();

  sendResponse(res, {
    success: true,
    Status: Status.OK,
    message: "All Parcels Retrived!",
    data: users.data

  })
});


export const updateParcelStatus = async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const userId = req.user?._id;
  const { status, note, location } = req.body;

  try {
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    note
    parcel.statusLogs.push({
      status,
      updatedBy: userId,
      note,
      location,
      timestamp: new Date(),
    });

    await parcel.save();

    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};


export const publicTracking = async (req: Request, res: Response) => {
  const { trackingId } = req.params;
  const parcel = await Parcel.findOne({ trackingId });

  if (!parcel) return res.status(404).json({ message: 'Tracking ID not found' });

  res.json({
    trackingId: parcel.trackingId,
    currentStatus: parcel.statusLogs.slice(-1)[0]?.status,
    history: parcel.statusLogs,
  });
};


export const filterParcels = async (req: Request, res: Response) => {
  const { status, from, to } = req.body;

  const query: any = {};

  if (status) {
    query['statusLogs.status'] = status;
  }

  if (from || to) {
    query['createdAt'] = {};
    if (from) query['createdAt'].$gte = new Date(from);
    if (to) query['createdAt'].$lte = new Date(to);
  }

  try {
    const parcels = await Parcel.find(query);
    res.status(200).json({ success: true, parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while filtering parcels", error });
  }
};


