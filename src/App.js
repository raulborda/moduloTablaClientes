import { ConfigProvider } from "antd";
import "./App.css";
import GlobalContext from "./components/context/GlobalContext"
import Tabla from "./components/tabla/Tabla";
import esES from "antd/lib/locale/es_ES";

function App() {
  return (
    <>
    <GlobalContext.Provider>
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            colorPrimary: "#56b43c",
          },
        }}
      >
        <Tabla />
      </ConfigProvider>
    </GlobalContext.Provider>
    </>
  );
}

export default App;
