import { Parcel } from "./parcel.model";

export const getAllParcel = async () => {
    const user = await Parcel.find({});

    const totalParcel = await Parcel.countDocuments();

    return {
        totalParcel: totalParcel,
        data: user
    }
}