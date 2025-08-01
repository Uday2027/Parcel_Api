import { Router } from 'express';
import { createParcel, getMyParcels, cancelParcel, getAllParcels, updateParcelStatus, deliveryUpdate, publicTracking, filterParcels } from './parcel.controller';
import { cehckAuth } from "../../middlewares/checkAuth";
import { Role } from '../user/user.interface';

export const parcelRouter = Router();

parcelRouter.post('/create', cehckAuth(Role.ADMIN, Role.USER), createParcel);
parcelRouter.get('/my', cehckAuth(Role.ADMIN, Role.USER), getMyParcels);
parcelRouter.patch('/cancel/:id', cehckAuth(Role.ADMIN, Role.USER, Role.SUPER_ADMIN), cancelParcel);
parcelRouter.get("/all-parcel", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), getAllParcels);
parcelRouter.patch("/status/:id", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), updateParcelStatus);
parcelRouter.post('/delivery/update', cehckAuth(Role.DELIVERY_BOY), deliveryUpdate);
parcelRouter.get('/track/:trackingId', publicTracking);
parcelRouter.get('/', cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), filterParcels);



// router.post("/register", validateRequest(createUSerZodSchema), userControllers.createUser);
// router.get("/all-users", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUsers);
// router.patch("/:id", cehckAuth(...Object.values(Role)), userControllers.updateUser);