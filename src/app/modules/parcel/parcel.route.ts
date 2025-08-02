import { Router } from 'express';
import { createParcel, getMyParcels, cancelParcel, getAllParcels, updateParcelStatus, publicTracking, filterParcels } from './parcel.controller';
import { cehckAuth } from "../../middlewares/checkAuth";
import { Role } from '../user/user.interface';
import { deliveryUpdate } from '../delivery/deliveryUpdate';

export const parcelRouter = Router();

parcelRouter.post('/create', cehckAuth(Role.ADMIN, Role.SENDER), createParcel);

parcelRouter.get('/my', cehckAuth(Role.ADMIN, Role.SENDER), getMyParcels);

parcelRouter.patch('/cancel/:id', cehckAuth(Role.ADMIN, Role.SENDER, Role.SUPER_ADMIN), cancelParcel);

parcelRouter.get("/all-parcel", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), getAllParcels);

parcelRouter.patch("/status/:id", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), updateParcelStatus);

parcelRouter.post('/delivery/update', cehckAuth(Role.DELIVERY_BOY, Role.ADMIN, Role.SUPER_ADMIN), deliveryUpdate);

parcelRouter.get('/track/:trackingId', publicTracking);

parcelRouter.get('/filter-parcel', cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), filterParcels);



