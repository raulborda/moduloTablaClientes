import { ConfigProvider } from "antd";
import "./App.css";
import "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import TablaCli from "./components/tabla/Tabla";
import { useState } from "react";

function App() {

  const [infoClientes, setInfoclientes] = useState([]);


  return (
    <>
      <GlobalContext.Provider
        value:{{
          infoClientes, setInfoclientes,
        }}
      >
        <ConfigProvider
          locale={esES}
          theme={{
            token: {
              colorPrimary: "#56b43c",
            },
          }}
        >
          <TablaCli />
        </ConfigProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
