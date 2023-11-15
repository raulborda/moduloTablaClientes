import { Button, Modal, Select, Spin, Table, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AlertOutlined, ReloadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import BtnExcel from "./BtnExcel";
import { filtrarClientes } from "../../utils/filtrarClientes";

const TablaInfo = ({ status, clientesInactivos }) => {
  const URLDOS = process.env.REACT_APP_URL;

  const {
    idUsu,
    infoClientes,
    setInfoclientes,
    searchValue,
    setSelectedCliente,
    setIsDrawerVisible,
    cliSelect,
    setCliSelect,
    setIsLoadingTR,
    setIsLoadingTP,
    isLoadingTI,
    setIsLoadingTI,
    activeTab,
    actualizarData,
    setActualizarData,
    etiquetasSelec,
    switchTables, 
    setSwitchTables
  } = useContext(GlobalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cliLead, setCliLead] = useState("");
  const [cliAct, setCliAct] = useState({});

  const [fVendedor, setFVendedor] = useState(); 
  const [fDivision, setFDivision] = useState(); 
  const [fTipo, setFTipo] = useState(); 
  const [fSector, setFSector] = useState();
  const [fTamano, setFTamano] = useState(); 

  const [currentPage, setCurrentPage] = useState(1);

  const [nombreGrupos, setNombreGrupos] = useState ();

  const [sortConfig, setSortConfig] = useState({
    column: null,
    order: "ascend",
  });

  const cargarTablaInfo = () => {
    console.log('switchTablesI', switchTables)
    
    if(switchTables){ //Reinicia todos los posibles filtros aplicados al cambiar entre tablas.
      setFVendedor(undefined);
      setFDivision(undefined);
      setFTipo(undefined);
      setFSector(undefined);
      setFTamano(undefined);
      setCurrentPage(1);
      setSwitchTables(false);
    }else{ //Si seguimos en la misma tabla, que mantenga filtros y pagina.
      setFVendedor(fVendedor);
      setFDivision(fDivision);
      setFTipo(fTipo);
      setFSector(fSector);
      setFTamano(fTamano);
    }

    setIsLoadingTI(true); // Establecer isLoadingTI en true antes de hacer la solicitud
    const data = new FormData();
    data.append("idU", idUsu);

    fetch(`${URLDOS}tablaInfo.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        if (Array.isArray(objetoData)) setInfoclientes(objetoData);
        setIsLoadingTI(false); // Establecer isLoadingTI en false después de recibir la respuesta
        setIsLoadingTP(true); // Establecer isLoadingTI en false el spin de tabla productivo
        setIsLoadingTR(true); // Establecer isLoadingTP en false el spin de tabla rubro
      });
    });
  };

  //Obtiene nombres de grupo1 y grupo2: http://10.0.0.153/duoc/modulos/getConf.php
    const getConf = async () => {
    const data = await fetch(`${URLDOS}getConf.php`);
    const jsonData = await data.json();
    setNombreGrupos(jsonData[0]);
  }

  useEffect(() => {
    if (activeTab === "1" && idUsu) {
      cargarTablaInfo();
      getConf();
    }
  }, [activeTab, idUsu, actualizarData]);

  const zonasUnicas = [
    ...new Set(
      infoClientes?.map((c) => c.gruuno_desc).filter((value) => value !== null)
    ),
  ];
  const centrosUnicos = [
    ...new Set(
      infoClientes?.map((c) => c.grudos_desc).filter((value) => value !== null)
    ),
  ];
  const tiposUnicos = [
    ...new Set(
      infoClientes?.map((c) => c.tip_desc).filter((value) => value !== null)
    ),
  ];
  const actividadesUnicas = [
    ...new Set(
      infoClientes?.map((c) => c.sec_desc).filter((value) => value !== null)
    ),
  ];
  const tamanosUnicos = [
    ...new Set(
      infoClientes?.map((c) => c.tam_desc).filter((value) => value !== null)
    ),
  ];

  const zonaFilters = zonasUnicas.map((zona) => ({ text: zona, value: zona }));
  const centroFilters = centrosUnicos.map((centro) => ({
    text: centro,
    value: centro,
  }));
  const tipoFilters = tiposUnicos.map((tipo) => ({ text: tipo, value: tipo }));
  const actividadFilters = actividadesUnicas.map((act) => ({
    text: act,
    value: act,
  }));
  const tamanoFilters = tamanosUnicos.map((tam) => ({ text: tam, value: tam }));


  const columns = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      className: "col-cuenta-ancho", //Puesto como style en .css porque de lo contrario afecta negativamente a la hora de exportar como archivo .xlsx, ya que pasa el width como parametro oculto a la hora de generar el xlxs y abrirlo (solo en Excel).
      sorter: (a, b) => parseInt(a.cuenta) - parseInt(b.cuenta), // Agregar esta propiedad para habilitar el ordenamiento
    },
    {
      title: "CLIENTE",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <div
          style={{
            color: "#00b33c",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          {text}
        </div>
      ),
      className: "col-cliente-ancho", //Puesto como style en .css porque de lo contrario afecta negativamente a la hora de exportar como archivo .xlsx, ya que pasa el width como parametro oculto a la hora de generar el xlxs y abrirlo (solo en Excel).
      sorter: (a, b) => a.clientes?.localeCompare(b.clientes) || 0,
    },
    {
      title: nombreGrupos ? nombreGrupos.grupo1.toUpperCase() : "-",
      dataIndex: "zonas",
      key: "zonas",
      align: "center",
      filters: zonaFilters,
      onFilter: (value, record) => record.zonas === value,
      defaultFilteredValue : fVendedor,
    },
    {
      title: nombreGrupos ? nombreGrupos.grupo2.toUpperCase() : "-",
      dataIndex: "centro",
      key: "centro",
      align: "center",
      filters: centroFilters,
      onFilter: (value, record) => record.centro === value,
      defaultFilteredValue : fDivision,
    },
    {
      title: "TIPO",
      dataIndex: "tipo",
      key: "tipo",
      align: "center",
      filters: tipoFilters,
      onFilter: (value, record) => record.tipo === value,
      defaultFilteredValue : fTipo,
    },
    {
      title: "SECTOR",
      dataIndex: "actividad",
      key: "actividad",
      align: "center",
      filters: actividadFilters,
      onFilter: (value, record) => record.actividad === value,
      defaultFilteredValue : fSector,
    },
    {
      title: "TAMAÑO",
      dataIndex: "tamaño",
      key: "tamaño",
      align: "center",
      filters: tamanoFilters,
      onFilter: (value, record) => record.tamaño === value,
      defaultFilteredValue : fTamano,
    },
    // {
    //   title: "EMAIL",
    //   dataIndex: "email",
    //   key: "email",
    //   align: "center",
    // },
    {
      title: "TELEFONO",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
  ];

  const handleCliente = (record) => {
    setSelectedCliente(record);
    setIsDrawerVisible(true);
    setCliSelect(parseInt(record.key));
  };

  const handleActualizarLead = () => {
    const data = new FormData();
    data.append("lead", Number(cliLead.cli_id));
    data.append("idCli", Number(cliAct));
    fetch(`${URLDOS}tablaClientes_actualizarLeadCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        notification.open({
          message: "LEAD CONVERTIDO",
          description: "DATOS ACTUALIZADOS CORRECTAMENTE",
          duration: 3,
          placement: "bottomRight",
          icon: <AlertOutlined style={{ color: "#52c41a" }} />,
          style: {
            borderRadius: "4px",
            backgroundColor: "#f6ffed",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        });
      });
    });

    setIsModalVisible(false);
    setActualizarData(!actualizarData);
  };

  localStorage.setItem("cliSelect", cliSelect);

  const filterData = (data) => {
    if (!infoClientes || searchValue === "") {
      return data;
    }
    return data.filter((item) => {
      return (
        item.clientes &&
        (item.clientes.toUpperCase().includes(searchValue.toUpperCase()) ||
          item.cuenta?.toString().includes(searchValue))
      );
    });
  };

  const data = filterData(
    filtrarClientes(infoClientes, status, clientesInactivos, etiquetasSelec, fVendedor, fDivision, fTipo, fSector, fTamano)?.map((c, index) => ({
      key: c.cli_id,
      cuenta:
        c.cli_idsistema === "0" ? (
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className="selected_tag"
                style={{ background: "#56b43c", display: "inline-block" }}
              >
                <span className="etq_name">{"LEAD".toUpperCase()}</span>
              </div>
              <ReloadOutlined
                style={{
                  color: "#56b43c",
                  fontSize: "small",
                  padding: "0px",
                  marginLeft: "5px",
                }}
                onClick={() => (setIsModalVisible(true), setCliLead(c))}
              />
            </div>
          </>
        ) : (
          c.cli_idsistema
        ),
      clientes: c.cli_nombre,
      zonas: c.gruuno_desc,
      centro: c.grudos_desc,
      tipo: c.tip_desc,
      actividad: c.sec_desc,
      tamaño: c.tam_desc,
      email: c.cli_email1,
      telefono: c.cli_telefono1,
    }))
  );

  const clientesOptions = infoClientes
    ? infoClientes
        .filter((cliente) => cliente.cli_idsistema != 0)
        .map((cliente) => (
          <Option key={cliente.cli_id} value={cliente.cli_id}>
            {cliente.cli_nombre}
          </Option>
        ))
    : null;
          //console.log('data', data)
  return (
    <>
      <BtnExcel columns={columns} dataSource={data} saveAsName={"tablaInfo"} />
      {isLoadingTI ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          pagination={{ showSizeChanger: false, defaultCurrent: currentPage }}
          onRow={(record) => ({
            onClick: (event) => {
              if (event.target.tagName !== "DIV") {
                // Verificar si el clic no se hizo en el elemento <span> del nombre del cliente
                return;
              }
              handleCliente(record);
            },
          })}
          onChange={(pagination, filter, sorter, currentTable) => {

            setFVendedor(filter?.zonas)
            setFDivision(filter?.centro)
            setFTipo(filter?.tipo)
            setFSector(filter?.actividad)
            setFTamano(filter?.tamaño)
            setCurrentPage(pagination.current)

          }}
        />
      )}

      {isModalVisible ? (
        <Modal
          title="CONVERTIR LEAD A CLIENTE"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleActualizarLead()}
            >
              Actualizar
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              className="selected_tag"
              style={{ background: "#56b43c", display: "inline-block" }}
            >
              <span className="etq_name" style={{ fontWeight: "bold" }}>
                LEAD
              </span>
            </div>

            <span style={{ marginLeft: "5px" }}>{cliLead.cli_nombre}</span>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                marginBottom: "5px",
              }}
            >
              Seleccione Cliente:
            </label>
            <Select
              style={{ minWidth: "250px" }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option &&
                option.children &&
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(option) => setCliAct(option)}
            >
              {clientesOptions}
            </Select>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default TablaInfo;
