import DeviceUUID from "device-uuid";

export default (context, inject) => {
  console.log('Device UUID:', new DeviceUUID.DeviceUUID().get())
  inject("DeviceUUID", DeviceUUID);
};
