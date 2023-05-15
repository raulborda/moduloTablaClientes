import { ConfigProvider } from "antd";
import "./App.css";
import {GlobalContext} from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import TablaCli from "./components/tabla/Tabla";
import { useState } from "react";

function App() {

  const [infoClientes, setInfoclientes] = useState([]);

   //const idU = localStorage.getItem("usuario");
  //const idU = 8;
  const [idUsu, setUsu] = useState(1);


  return ( 
      <GlobalContext.Provider
        value={{
          infoClientes, setInfoclientes,
          idUsu, setUsu,
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
 
  );
}

export default App;
