import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Spin, Table } from "antd";

const TablaProduc = () => {
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
    isLoading,
    setIsLoading,
    activeTab,
  } = useContext(GlobalContext);


  useEffect(() => {
    if (idUsu) {
      setIsLoading(true); // Establecer isLoading en true antes de hacer la solicitud
      const data = new FormData();
      data.append("idU", idUsu);
      fetch(`${URLDOS}tablaProduct.php`, {
        method: "POST",
        body: data,
      }).then(function (response) {
        response.text().then((resp) => {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoclientes(objetoData);
          setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
        });
      });
    }
  }, [activeTab]);



  const columnsProductivo = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      width: "50px",
    },
    {
      title: "CLIENTE",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <span style={{ color: "#00b33c" }}>{text}</span>
      ),
    },
    {
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "right",
    },
    {
      title: "HAS. PROP.",
      dataIndex: "propias",
      key: "propias",
      align: "right",
    },
    {
      title: "HAS. ALQ.",
      dataIndex: "alquiladas",
      key: "alquiladas",
      align: "right",
    },
    {
      title: "COMPRA USD INS.",
      dataIndex: "usdInsumo",
      key: "usdInsumo",
      align: "right",
    },
    {
      title: "TT ENTREG.",
      dataIndex: "toneladasEntregadas",
      key: "toneladasEntregadas",
      align: "right",
    },
    {
      title: "COMPRA USD ESTIM.",
      dataIndex: "estimadoUSDInsumos",
      key: "estimadoUSD",
      align: "right",
    },
    {
      title: "TT ESTIM.",
      dataIndex: "estimadoToneladas",
      key: "estimadoToneladas",
      align: "right",
    },
    {
      title: "NEG. USD ABIERTO",
      dataIndex: "negUSDAbierto",
      key: "negUSDAbierto",
      align: "right",
    },
    {
      title: "TAREAS ABIERTAS",
      dataIndex: "tareasAbiertas",
      key: "tareasAbiertas",
      align: "right",
    },
  ];

  const handleCliente = (record) => {
    setSelectedCliente(record);
    setIsDrawerVisible(true);
    setCliSelect(parseInt(record.key));
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

  const numberFormatOptions = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const dataProductivo = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      propias: c.has_propias
        ? typeof c.has_propias === "string"
          ? parseInt(c.has_propias)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_propias
        : "-",
      alquiladas: c.has_alquiladas
        ? typeof c.has_alquiladas === "string"
          ? parseInt(c.has_alquiladas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_alquiladas
        : "-",
      hasTotales: c.has_totales
        ? typeof c.has_totales === "string"
          ? parseInt(c.has_totales)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_totales
        : "-",
      usdInsumo: c.usdEntregados
        ? typeof c.usdEntregados === "string"
          ? parseInt(c.usdEntregados)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.usdEntregados
        : "-",
      estimadoUSDInsumos: c.costoEstimado
        ? typeof c.costoEstimado === "string"
          ? parseInt(c.costoEstimado)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.costoEstimado
        : "-",
      toneladasEntregadas: c.toneladasEntregadas
        ? typeof c.toneladasEntregadas === "string"
          ? parseInt(c.toneladasEntregadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEntregadas
        : "-",
      estimadoToneladas: c.toneladasEstimadas
        ? typeof c.toneladasEstimadas === "string"
          ? parseInt(c.toneladasEstimadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEstimadas
        : "-",
      negUSDAbierto: c.suma_neg_valor
        ? typeof c.suma_neg_valor === "string"
          ? parseInt(c.suma_neg_valor)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.suma_neg_valor
        : "-",
      tareasAbiertas: c.cantidad_tareas_pendientes
        ? typeof c.cantidad_tareas_pendientes === "string"
          ? parseInt(c.cantidad_tareas_pendientes).toFixed(0)
          : c.cantidad_tareas_pendientes
        : "-",
    }))
  );

  return (
    <>
      {isLoading ? (
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
          dataSource={dataProductivo}
          columns={columnsProductivo}
          size="middle"
          onRow={(record) => ({
            onClick: () => handleCliente(record),
          })}
        />
      )}
    </>
  );
};

export default TablaProduc;
