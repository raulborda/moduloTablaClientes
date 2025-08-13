import { ConfigProvider } from "antd";
import "./App.css";
import { GlobalContext } from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import TablasCli from "./components/tabla/TablasCli";
import { useState } from "react";

function App() {
  const [infoClientes, setInfoclientes] = useState([]);

  const idU = localStorage.getItem("usuario");
  // const idU = 1;
  const [idUsu, setUsu] = useState(idU);

  const [searchValue, setSearchValue] = useState("");
  const [isLoadingTI, setIsLoadingTI] = useState(true);
  const [isLoadingTP, setIsLoadingTP] = useState(true);
  const [isLoadingTR, setIsLoadingTR] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cliSelect, setCliSelect] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isDrawerVisibleForm, setIsDrawerVisibleForm] = useState(false);
  const [actualizarData, setActualizarData] = useState(false);
  const [etiquetasSistema, setEtiquetasSistema] = useState([]);
  const [etiquetasSelec, setEtiquetasSelec] = useState([]);
  const [switchTables, setSwitchTables] = useState(false);
 
  return (
    <GlobalContext.Provider
      value={{
        infoClientes,
        setInfoclientes,
        idUsu,
        setUsu,
        searchValue,
        setSearchValue,
        isLoadingTR,
        setIsLoadingTR,
        isLoadingTP,
        setIsLoadingTP,
        isLoadingTI,
        setIsLoadingTI,
        selectedCliente,
        setSelectedCliente,
        isDrawerVisible,
        setIsDrawerVisible,
        cliSelect,
        setCliSelect,
        activeTab,
        setActiveTab,
        isDrawerVisibleForm,
        setIsDrawerVisibleForm,
        actualizarData,
        setActualizarData,
        etiquetasSistema,
        setEtiquetasSistema,
        etiquetasSelec,
        setEtiquetasSelec,
        switchTables, 
        setSwitchTables
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
