import { isValidateSocialMediaUrl } from "./functions"

export const minLen =
  (l, msg = null) =>
  (v) =>
    v == null || (v && v.length >= l) || (msg ? msg : `min. ${l} Characters.`)
export const maxLen =
  (l, msg = null) =>
  (v) =>
    v == null || (v && v.length <= l) || (msg ? msg : `max. ${l} Characters.`)
export const validEmail =
  (msg = null) =>
  (v) =>
    v == null || (v && /.+@.+\..+/.test(v)) || (msg ? msg : `Invalid Email.`)
export const required =
  (msg = "Field is required.") =>
  (v) =>
    (!!v && v != null && v != "" && v != " ") || msg
export const onlyNumbers =
  (msg = "Only Numbers are Valid.") =>
  (v) =>
    /^[0-9]*$/.test(v) || v.includes(",") || msg
export const numberWith2DecimalPoints =
  (msg = "Only 2 decimals.") =>
  (v) =>
    v == null || /^\d+(\.\d{1,2})?$/.test(Number.parseFloat(v)) || msg
export const validUsername = (msg) => (v) =>
  /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(v) || msg
export const validUsername1 = (msg) => (v) =>
  /^(?=[a-z_\d]*[a-z])[a-z_\d]{6,}$/.test(v) || msg
export const validUsername2 = (msg) => (v) =>
  /^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9](?<![-?\d+\.?\d*$]{6,}.*)$/.test(v) ||
  msg
export const validUrl =
  (msg = "Must be a valid url.") =>
  (v) =>
    v == null ||
    /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
      v
    ) ||
    msg
export const validSocialUrl =
  (msg = "Must be a valid social media url.") =>
  (v) =>
    v == null || isValidateSocialMediaUrl(v) || msg
