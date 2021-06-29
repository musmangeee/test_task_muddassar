/* eslint-disable prettier/prettier */
export const formFieldsBasicLayout = {
  outlined: true,
  clearable: true,
  dense: false,
  class: "px-2",
  col: {
    cols: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
}

export const isValidateSocialMediaUrl = (url) => {
  if (
    /^(https?:\/\/)?((w{3}\.)?)twitter.com.*/i.test(url) ||
    /^(https?:\/\/)?((w{3}\.)?)facebook.com.*/i.test(url) ||
    /^(https?:\/\/)?((w{3}\.)?)instagram.com.*/i.test(url) ||
    /^(https?:\/\/)?((w{3}\.)?)linkedin.com.*/i.test(url) ||
    /^(https?:\/\/)?((w{3}\.)?)google.com.*/i.test(url)
  ) {
    return true
  }
  return false
}

export const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

export const timeHoursListAm = [
  "12am",
  "11am",
  "10am",
  "09am",
  "08am",
  "07am",
  "06am",
  "05am",
  "04am",
  "03am",
  "02am",
  "01am",
]
export const timeHoursListPm = [
  "12pm",
  "11pm",
  "10pm",
  "09pm",
  "08pm",
  "07pm",
  "06pm",
  "05pm",
  "04pm",
  "03pm",
  "02pm",
  "01pm",
]

export const changeInputValueToDecimalPoints = ({
  data,
  newVal,
  value,
  obj,
}) => {
  if (value && makeDecimalPointFloat(value) != value.toString())
    return (data[obj.key] = makeDecimalPointFloat(value))
  return value
}

export const makeDecimalPointFloat = (value) => {
  let newVal = 0
  if (value) {
    // console.log(Number(value.toString().replace(/[^0-9\.]/g, "")));
    newVal = Number.parseFloat(value).toFixed(2)
  }
  return newVal
}

export const changeInputFormatToCurrency = ({ data, newVal, value, obj }) => {
  if (value && formatAsCurrency(value) != value.toString())
    return (data[obj.key] = formatAsCurrency(value))
  return value
}

export const formatAsCurrency = (value) => {
  let newVal = 0
  if (value) {
    // console.log(Number(value.toString().replace(/[^0-9\.]/g, "")));
    newVal = Number.parseInt(value.toString().replace(/[^0-9\.]/g, ""))
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }
  return newVal
}

export const timeHoursList = () => {
  return [...timeHoursListAm, ...timeHoursListPm]
}

export const pluck = (key, arr) => {
  return arr.map((o) => o[key])
}

export const array_sum = (arr) => {
  return arr.reduce((total, num) => {
    return Number.parseFloat(total) + Number.parseFloat(num)
  }, 0)
}

export const dataType64toFile = (dataurl, filename = "NewFile") => {
  //Convert base64 to file
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let newFile = new File([u8arr], filename, {
    type: mime,
  })
  return newFile
}

export const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      )
    })
  } else {
    const value = data == null ? "" : data

    formData.append(parentKey, value)
  }
}

export const jsonToFormData = (data) => {
  const formData = new FormData()

  buildFormData(formData, data)

  return formData
}

export const isJson = (str) => {
  if (typeof str !== "string") return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    return type === "[object Object]" || type === "[object Array]"
  } catch (err) {
    return false
  }
}

export const webUrl = () => {
  if (window.location.origin.includes("localhost"))
    return "http://localhost:8000"
  return window.location.origin
  // https:https://dogtreatsoffer.com/
}

export const attachmentBase = () => {
  return webUrl() + "/amazon-share-experience/"
}

export const reportDownloadBase = () => {
  return webUrl() + "/amazon-share-experience/"
}

export const baseUrl = () => {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:8000/api"
    : "https://dogtreatsoffer.com/amazon-share-experience/backend/public/api"
}

export const imageBase = () => {
  return webUrl() + "/amazon-share-experience/"
}
