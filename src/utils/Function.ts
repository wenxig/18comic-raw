import md5 from "md5"
import { t } from "i18next"
import CryptoJS from "crypto-js"
import type { PullStatus } from "react-pull-to-refreshify"

// 分割陣列
export const chunkArray = <T>(arr: T[], size: number) => {
  const result = []
  for (let i = 0; i < arr?.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
// 隨機item & index
export function getRandomItems<T>(arr: T[], count = 1) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { items: [], indexes: <any[]>[] }
  }

  const maxCount = Math.min(count, arr.length)
  const result = []
  const indexes = new Set()

  while (result.length < maxCount) {
    const index = Math.floor(Math.random() * arr.length)
    if (!indexes.has(index)) {
      indexes.add(index)
      result.push(arr[index])
    }
  }

  return { items: result, indexes: Array.from(indexes) }
}

// 計算幾天前
export const getDateDiffFromNow = (time: number) => {
  const now = Date.now()
  const updated = time * 1000
  const diffMs = now - updated
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return diffDays
}

// yyyy/mm/dd 上午/下午 hh:mm:ss
export const getTaipeiTimeString = () => {
  const now = new Date()
  const formatted = now.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  return formatted
}

// HH:MM
export const getCurrentTime = () => {
  let now = new Date()
  let hours = now.getHours().toString().padStart(2, "0")
  let minutes = now.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}
// HH:MM:SS
export const getToday = () => {
  let now = new Date()
  let hours = now.getHours().toString().padStart(2, "0")
  let minutes = now.getMinutes().toString().padStart(2, "0")
  let seconds = now.getSeconds().toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const getWeekInfo = (weekDayItems: any) => {
  const rawIndex = new Date().getDay()
  const todayIndex = rawIndex === 0 ? 6 : rawIndex - 1
  const weekDays = weekDayItems
  return {
    today: weekDays[todayIndex],
    todayIndex: todayIndex + 1,
    allDays: weekDays,
  }
}

export const getMarkColor = (type: 'fanbox' | 'fantia' | 'gumroad' | 'patreon' | 'subscribestar') => {
  switch (type) {
    case "fanbox":
      return { backgroundColor: "#5abee8" }
    case "fantia":
      return { backgroundColor: "#3c7620" }
    case "gumroad":
      return { backgroundColor: "#fc92e9" }
    case "patreon":
      return { backgroundColor: "#c23f2b" }
    case "subscribestar":
      return { backgroundColor: "#56b8ac" }
    default:
      return { backgroundColor: "#3c7620" }
  }
}

export const renderText = (pullStatus: PullStatus) => {
  switch (pullStatus) {
    case "pulling":
      return t("renderText.pulling")

    case "canRelease":
      return t("renderText.canRelease")

    case "refreshing":
      return t("renderText.refreshing")

    case "complete":
      return t("renderText.complete")

    default:
      return ""
  }
}

let CommonUtil = {
  fomatFloat: (src: number, pos: number) => {
    let unit_str = ""
    if (src < 1000) {
      return src
    }
    src = src / 1000
    unit_str = "K"
    if (src > 100) {
      src = src / 100
      unit_str = "M"
    }

    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos) + unit_str
  },

}

const key = CryptoJS.enc.Utf8.parse(md5("diosfjckwpqpdfjkvnqQjsik"))

export const decryptData = (encryptedText: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      mode: CryptoJS.mode.ECB,
    })
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  } catch (err) {
    console.log("解密失敗:", err)
    return null
  }
}

//(圖片先設了display:none)
//還原被切的圖 並畫到它後面的canvas
export function scramble_image(img: HTMLImageElement, aid: string, scramble_id: string, page: string) {
  //GIF和舊漫沒切不用還原 直接改顯示
  if (img.src.indexOf(".gif") > 0 || parseInt(aid) < parseInt(scramble_id)) {
    if (img.style.display === "none") {
      img.style.display = "block"
    }
    return
  }
  var num = get_num(window.btoa(aid), window.btoa(page))
  onImageLoaded(img, num.toString())
}

function onImageLoaded(img: HTMLImageElement, num: string) {
  var canvas
  canvas = document.createElement("canvas")
  img.after(canvas)

  var ctx = canvas.getContext("2d")
  var s_w = img.width
  var w = img.naturalWidth
  var h = img.naturalHeight
  canvas.width = w
  canvas.height = h

  if (s_w > (<any>img.parentNode)?.offsetWidth || s_w == 0) {
    s_w = (<any>img.parentNode)?.offsetWidth
  }
  canvas.style.width = s_w + "px"
  canvas.style.display = "block"

  let num2 = parseInt(num)
  var remainder = Number(h % num2)
  var copyW = w

  for (var i = 0; i < num2; i++) {
    var copyH = Math.floor(h / num2)
    var py = copyH * i
    var y = h - copyH * (i + 1) - remainder

    if (i == 0) {
      copyH = copyH + remainder
    } else {
      py = py + remainder
    }

    ctx?.drawImage(img, 0, y, copyW, copyH, 0, py, copyW, copyH)
  }
}

function get_num(aid: string, page: string) {
  // aid = window.atob(aid)
  // page = window.atob(page)

  var num = 10
  var key = aid + page
  key = md5(key)
  key = key.substr(-1)
  var key2 = key.charCodeAt(0)

  if (parseInt(aid) >= parseInt(window.atob("MjY4ODUw")) && parseInt(aid) <= parseInt(window.atob("NDIxOTI1"))) {
    key2 = key2 % 10
  } else if (parseInt(aid) >= parseInt(window.atob("NDIxOTI2"))) {
    key2 = key2 % 8
  }

  switch (key2) {
    case 0:
      num = 2
      break
    case 1:
      num = 4
      break
    case 2:
      num = 6
      break
    case 3:
      num = 8
      break
    case 4:
      num = 10
      break
    case 5:
      num = 12
      break
    case 6:
      num = 14
      break
    case 7:
      num = 16
      break
    case 8:
      num = 18
      break
    case 9:
      num = 20
      break
  }

  return num
}

export default CommonUtil
