export const filtrarClientes = (infoClientes, status, clientesInactivos, etiquetasSelec) => {
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

  if (status === "0") {
    let clientesInactivosIds = clientesInactivos.map(
      (element) => element.cli_id
    );

    array = array.filter((element) =>
      clientesInactivosIds.includes(element.cli_id)
    );
  }

  return array;
};
