import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import store from "./store"
import { GlobalConfigProvider } from "./GlobalContext"
import "react-lazy-load-image-component/src/effects/blur.css"
import "./i18n"
import ReactGA from "react-ga4"
console.log('root')
if (import.meta.env.NODE_ENV === "production") {
  ReactGA.initialize("G-69VXS5Z1FV")
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalConfigProvider>
        <App />
      </GlobalConfigProvider>
    </Provider>
  </BrowserRouter>
)
if ("serviceWorker" in navigator) {
  if (import.meta.env.NODE_ENV === "production") {
    // ✅ 正式環境才註冊 Service Worker
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => {
          console.log("✅ Service Worker registered:", reg)
        })
        .catch((err) => console.error("❌ Service Worker registration failed:", err))
    })
  } else {
    // 🧹 開發環境清除快取與已註冊 Service Worker
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
    caches.keys().then((names) => {
      for (let name of names) caches.delete(name)
    })
  }
}
