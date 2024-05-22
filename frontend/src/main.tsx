import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "store/store";

import { App } from "./App";
import "./index.scss";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#fc8507', // изменено на ваш новый цвет
        borderRadius: 12,
        colorInfo: '#fc8507',

        // Alias Token
        colorBgContainer: '#f7f7f7',
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
  </Provider>
);
