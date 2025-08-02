"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterParcels = exports.publicTracking = exports.updateParcelStatus = exports.getAllParcels = exports.cancelParcel = exports.getMyParcels = exports.createParcel = void 0;
const parcel_model_1 = require("./parcel.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const parcel_service_1 = require("./parcel.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const mongoose_1 = __importDefault(require("mongoose"));
const calculateFee = (weight) => {
    const ratePerKg = 50; //lets say
    return weight * ratePerKg;
};
exports.createParcel = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { receiver, weight, type, pickupAddress, deliveryAddress, estimatedDeliveryDate } = req.body;
    const sender = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const fee = calculateFee(weight);
    const newParcel = yield parcel_model_1.Parcel.create({
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
            },
        ],
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.CREATED,
        message: "Parcel Created Succesfully ˗ˏˋ ★ ˎˊ˗",
        data: newParcel
    });
}));
exports.getMyParcels = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const parcels = yield parcel_model_1.Parcel.find({ sender: userId });
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.OK,
        message: "Your Parcel Fetched Successfully ˗ˏˋ ★ ˎˊ˗",
        data: parcels
    });
}));
exports.cancelParcel = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.user);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(req.params);
    const parcelId = req.params.id;
    try {
        const parcel = yield parcel_model_1.Parcel.findById(parcelId);
        if (!parcel || parcel.sender.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized or Parcel not found' });
        }
        const lastStatus = (_b = parcel.statusLogs[parcel.statusLogs.length - 1]) === null || _b === void 0 ? void 0 : _b.status;
        if (['Dispatched', 'Delivered'].includes(lastStatus)) {
            return res.status(400).json({ success: false, message: 'Cannot cancel after dispatch' });
        }
        parcel.statusLogs.push({
            status: 'Cancelled',
            updatedBy: new mongoose_1.default.Types.ObjectId(userId),
            timestamp: new Date(),
        });
        yield parcel.save();
        return res.json({ success: true, message: 'Parcel cancelled successfully' });
    }
    catch (err) {
        console.error('Cancel error:', err);
        return res.status(500).json({ success: false, message: 'Cancellation failed', error: err });
    }
}));
exports.getAllParcels = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, parcel_service_1.getAllParcel)();
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.OK,
        message: "All Parcels Retrived!",
        data: users.data
    });
}));
const updateParcelStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcelId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { status, note, location } = req.body;
    try {
        const parcel = yield parcel_model_1.Parcel.findById(parcelId);
        if (!parcel)
            return res.status(404).json({ message: 'Parcel not found' });
        parcel.statusLogs.push({
            status,
            updatedBy: userId,
            note,
            location,
            timestamp: new Date(),
        });
        yield parcel.save();
        res.json({ success: true, message: 'Status updated' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status' });
    }
});
exports.updateParcelStatus = updateParcelStatus;
const publicTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { trackingId } = req.params;
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId });
    if (!parcel)
        return res.status(404).json({ message: 'Tracking ID not found' });
    res.json({
        trackingId: parcel.trackingId,
        currentStatus: (_a = parcel.statusLogs.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.status,
        history: parcel.statusLogs,
    });
});
exports.publicTracking = publicTracking;
const filterParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, from, to } = req.query;
    const query = {};
    if (status)
        query['statusLogs.status'] = status;
    if (from || to) {
        query['createdAt'] = {};
        if (from)
            query['createdAt'].$gte = new Date(from);
        if (to)
            query['createdAt'].$lte = new Date(to);
    }
    const parcels = yield parcel_model_1.Parcel.find(query);
    res.json({ success: true, parcels });
});
exports.filterParcels = filterParcels;
