fetch("datos.json")
  .then(res => res.json())
  .then(data => {

    const departamentos = document.querySelectorAll("path");
    const lista = document.getElementById("lista");

    // 🔥 CONTADORES
    const totalClientes = document.getElementById("totalClientes");
    const totalDepartamentos = document.getElementById("totalDepartamentos");
    const totalCiudades = document.getElementById("totalCiudades");

    // 🔥 INPUT BUSQUEDA
    const buscador = document.getElementById("buscador");

    // =========================
    // 📊 CALCULAR TOTALES
    // =========================
    const departamentosUnicos = new Set();
    const ciudadesUnicas = new Set();

    data.forEach(cliente => {
      departamentosUnicos.add(cliente.Departamento.toLowerCase().trim());
      ciudadesUnicas.add(cliente.Ciudad.toLowerCase().trim());
    });

    totalClientes.textContent = data.length;
    totalDepartamentos.textContent = departamentosUnicos.size;
    totalCiudades.textContent = ciudadesUnicas.size;

    // =========================
    // 🗺️ CLICK EN MAPA (TU LÓGICA ORIGINAL)
    // =========================
    departamentos.forEach(dep => {

      dep.addEventListener("click", () => {

        const nombre = dep.id.toLowerCase().trim();

        lista.innerHTML = "";

        const filtrados = data.filter(cliente =>
          cliente.Departamento.toLowerCase().trim() === nombre
        );

        mostrarLista(filtrados);

      });

    });

    // =========================
    // 🔍 BUSCADOR
    // =========================
    buscador.addEventListener("keyup", e => {

      const valor = e.target.value.toLowerCase().trim();

      const filtrados = data.filter(cliente =>
        cliente.Ciudad.toLowerCase().includes(valor) ||
        cliente.Empresa.toLowerCase().includes(valor)
      );

      mostrarLista(filtrados);

    });

    // =========================
    // 🧠 FUNCIÓN PARA MOSTRAR LISTA
    // =========================
    function mostrarLista(arr) {

      lista.innerHTML = "";

      if (arr.length > 0) {

        arr.forEach(cliente => {

          const li = document.createElement("li");
          li.textContent = `${cliente.Empresa} - ${cliente.Ciudad}`;
          lista.appendChild(li);

        });

      } else {
        lista.innerHTML = "<li>No hay resultados</li>";
      }

    }

  });