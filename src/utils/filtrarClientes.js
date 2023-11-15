export const filtrarClientes = (infoClientes, status, clientesInactivos, etiquetasSelec, fVendedor, fDivision, fTipo, fSector, fTamano) => {
  let array = [];

  array = infoClientes?.filter((cliente) => {

    if (etiquetasSelec.length > 0) {

      const etiquetaCliente = cliente.etiqueta
        ? cliente.etiqueta.split(",")
        : [];
      const intersec = etiquetaCliente.filter((etq) =>
        etiquetasSelec.includes(etq.trim())
      );

      if (intersec.length === 0) {
        return false;
      }
    }
    return true;
  });

  //Aplica filtros de tabla en en el filtrado general.
  if (fVendedor) {
    
    array = array.filter((cliente) => {
      
      return fVendedor.includes(cliente.gruuno_desc)
    });

  };

  if (fDivision) {

    array = array.filter((cliente) => {
      return fDivision.includes(cliente.grudos_desc)
    });
  };

  if (fTipo) {

    array = array.filter((cliente) => {
      return fTipo.includes(cliente.tip_desc)
    });
  }; 

  if (fSector) {

    array = array.filter((cliente) => {
      return fSector.includes(cliente.sec_desc)
    });
  };

  if (fTamano) {

    array = array.filter((cliente) => {
      return fTamano.includes(cliente.tam_desc)
    });
  }; 



  if (status === "0") { //solo se mete si seleccionamos el filtro Clientes sin actividad
    let clientesInactivosIds = clientesInactivos.map(
      (element) => element.cli_id
    );

    array = array.filter((element) =>
      clientesInactivosIds.includes(element.cli_id)
    );
  }

  return array;
};
