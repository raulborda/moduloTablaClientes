import { ConfigProvider } from "antd";
import "./App.css";
import {GlobalContext} from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import TablasCli from "./components/tabla/Tablas";
import { useState } from "react";

function App() {

  const [infoClientes, setInfoclientes] = useState([]);

   //const idU = localStorage.getItem("usuario");
  //const idU = 8;
  const [idUsu, setUsu] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cliSelect, setCliSelect] = useState(null);
  const [activeTab, setActiveTab] = useState("1");


  return ( 
      <GlobalContext.Provider
        value={{
          infoClientes, setInfoclientes,
          idUsu, setUsu,
          searchValue, setSearchValue,
          isLoading, setIsLoading,
          selectedCliente, setSelectedCliente,
          isDrawerVisible, setIsDrawerVisible,
          cliSelect, setCliSelect,
          activeTab, setActiveTab
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
          <TablasCli />
        </ConfigProvider>
      </GlobalContext.Provider>
 
  );
}

export default App;
