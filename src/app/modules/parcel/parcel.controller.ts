import { NextFunction, Request, Response } from 'express';
import { Parcel } from './parcel.model';
import { IStatusLog } from './parcel.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getAllParcel } from './parcel.service';
import Status from "http-status-codes"
import mongoose from 'mongoose';

// Fee calculation helper
const calculateFee = (weight: number): number => {
  const ratePerKg = 50; //lets say
  return weight * ratePerKg;
};

export const createParcel = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  const { receiver, weight, type, pickupAddress, deliveryAddress, estimatedDeliveryDate } = req.body;
  const sender = req.user?.userId;

  const fee = calculateFee(weight); // Calculate fee

  
    const newParcel = await Parcel.create({
      sender,
      receiver,
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
  // try {
    const parcels = await Parcel.find({ sender: userId });
    sendResponse(res, {
      success: true,
      Status: Status.OK,
      message: "Your Parcel Fetched Successfully ˗ˏˋ ★ ˎˊ˗",
      data: parcels

  })
    // res.json({ success: true, data: parcels });
  // } catch (err) {
  //   res.status(500).json({ success: false, message: 'Failed to fetch parcels' });
  // }
}) ;


export const cancelParcel = (async (req: Request, res: Response) => {
  console.log(req.user);
  const userId = req.user?.userId;
  console.log(req.params);
  const parcelId = req.params.id;

  try {
    const parcel = await Parcel.findById(parcelId);

    // Check if parcel exists and belongs to the sender
    if (!parcel || parcel.sender.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized or Parcel not found' });
    }

    // Get latest status from statusLogs
    const lastStatus = parcel.statusLogs[parcel.statusLogs.length - 1]?.status;

    // Prevent canceling dispatched or delivered parcels
    if (['Dispatched', 'Delivered'].includes(lastStatus)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel after dispatch' });
    }

    // Push cancellation status log
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

    // Append to status log
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


export const deliveryUpdate = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user || user.role !== 'DELIVERY_BOY') {
    return res.status(403).json({ message: 'Only delivery personnel can update status' });
  }

  const { parcelId, stage } = req.body;
  const status = stage === 'Pickup' ? 'Dispatched' : stage === 'Dropoff' ? 'Delivered' : null;
  if (!status) return res.status(400).json({ message: 'Invalid delivery stage' });

  const parcel = await Parcel.findById(parcelId);
  if (!parcel) return res.status(404).json({ message: 'Parcel not found' });

  parcel.statusLogs.push({ status, updatedBy: user._id, timestamp: new Date() });
  await parcel.save();

  res.status(200).json({ success: true, message: `Parcel marked as ${status}` });
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
  const { status, from, to } = req.query;

  const query: any = {};
  if (status) query['statusLogs.status'] = status;
  if (from || to) {
    query['createdAt'] = {};
    if (from) query['createdAt'].$gte = new Date(from as string);
    if (to) query['createdAt'].$lte = new Date(to as string);
  }

  const parcels = await Parcel.find(query);
  res.json({ success: true, parcels });
};

