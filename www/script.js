// ===============================
// ESTADO GLOBAL
// ===============================

let cuentas =
    JSON.parse(
        localStorage.getItem(
            "finanzas"
        )
    ) || {};

let cuentaActual = null;

let tipoMovimientoActual = null;


// ===============================
// ELEMENTOS DEL DOM
// ===============================

// Sidebar
const sidebar =
    document.getElementById(
        "sidebar"
    );

const overlay =
    document.getElementById(
        "overlay"
    );

const listaCuentas =
    document.getElementById(
        "listaCuentas"
    );

// Cuenta actual
const cuentaActualTexto =
    document.getElementById(
        "cuentaActual"
    );

// Resumen
const balanceActual =
    document.getElementById(
        "balanceActual"
    );

const pendienteReponer =
    document.getElementById(
        "pendienteReponer"
    );

const balanceObjetivo =
    document.getElementById(
        "balanceObjetivo"
    );

// Movimientos
const listaMovimientos =
    document.getElementById(
        "listaMovimientos"
    );

// Modal movimiento
const modalMovimiento =
    document.getElementById(
        "modalMovimiento"
    );

const tituloModal =
    document.getElementById(
        "tituloModal"
    );

const montoMovimiento =
    document.getElementById(
        "montoMovimiento"
    );

const descripcionMovimiento =
    document.getElementById(
        "descripcionMovimiento"
    );

const fechaMovimiento =
    document.getElementById(
        "fechaMovimiento"
    );

// Modal cuenta
const modalCuenta =
    document.getElementById(
        "modalCuenta"
    );

const nombreCuenta =
    document.getElementById(
        "nombreCuenta"
    );


// ===============================
// GUARDAR DATOS
// ===============================

function guardarDatos() {

    localStorage.setItem(
        "finanzas",
        JSON.stringify(
            cuentas
        )
    );
}


// ===============================
// CARGAR DATOS INICIALES
// ===============================

function inicializar() {

    // Fecha de hoy por defecto
    fechaMovimiento.value =
        new Date()
        .toISOString()
        .split("T")[0];


    // Seleccionar primera cuenta
    const nombres =
        Object.keys(
            cuentas
        );

    if (
        nombres.length > 0
    ) {

        cuentaActual =
            nombres[0];
    }

    renderizarCuentas();

    renderizarCuenta();
}


// ===============================
// ABRIR/CERRAR SIDEBAR
// ===============================

document
.getElementById(
    "abrirMenu"
)
.addEventListener(
    "click",
    () => {

        sidebar
        .classList
        .add(
            "active"
        );

        overlay
        .classList
        .remove(
            "hidden"
        );
    }
);


document
.getElementById(
    "cerrarMenu"
)
.addEventListener(
    "click",
    cerrarSidebar
);


overlay
.addEventListener(
    "click",
    cerrarSidebar
);


function cerrarSidebar() {

    sidebar
    .classList
    .remove(
        "active"
    );

    overlay
    .classList
    .add(
        "hidden"
    );
}


// ===============================
// INICIAR APP
// ===============================

inicializar();

// ===============================
// RENDERIZAR CUENTAS
// ===============================

function renderizarCuentas() {

    listaCuentas.innerHTML = "";

    const nombres =
        Object.keys(
            cuentas
        );

    if (
        nombres.length === 0
    ) {

        cuentaActual = null;

        cuentaActualTexto.textContent =
            "Sin cuentas";

        return;
    }

    // Si la cuenta actual no existe,
    // seleccionar la primera

    if (
        !cuentaActual ||
        !cuentas[cuentaActual]
    ) {

        cuentaActual =
            nombres[0];
    }

    nombres.forEach(
        nombre => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "cuenta-item";

            if (
                nombre ===
                cuentaActual
            ) {

                div.classList.add(
                    "active"
                );
            }

            div.textContent =
                nombre;

            div.addEventListener(
                "click",
                () => {

                    cuentaActual =
                        nombre;

                    renderizarCuentas();

                    renderizarCuenta();

                    cerrarSidebar();
                }
            );

            listaCuentas.appendChild(
                div
            );
        }
    );

    cuentaActualTexto.textContent =
        cuentaActual;
}


// ===============================
// CREAR CUENTA
// ===============================

document
.getElementById(
    "nuevaCuentaBtn"
)
.addEventListener(
    "click",
    () => {

        nombreCuenta.value = "";

        modalCuenta.classList.remove(
            "hidden"
        );
    }
);


document
.getElementById(
    "guardarCuenta"
)
.addEventListener(
    "click",
    () => {

        const nombre =
            nombreCuenta
            .value
            .trim();

        if (
            nombre === ""
        ) {

            alert(
                "Ingrese un nombre"
            );

            return;
        }

        if (
            cuentas[nombre]
        ) {

            alert(
                "La cuenta ya existe"
            );

            return;
        }

        cuentas[nombre] = [];

        cuentaActual =
            nombre;

        guardarDatos();

        modalCuenta.classList.add(
            "hidden"
        );

        renderizarCuentas();

        renderizarCuenta();
    }
);


document
.getElementById(
    "cancelarCuenta"
)
.addEventListener(
    "click",
    () => {

        modalCuenta.classList.add(
            "hidden"
        );
    }
);


// ===============================
// RENOMBRAR CUENTA
// ===============================

document
.getElementById(
    "renombrarCuentaBtn"
)
.addEventListener(
    "click",
    () => {

        if (
            !cuentaActual
        ) {

            alert(
                "No hay cuenta seleccionada"
            );

            return;
        }

        const nuevoNombre =
            prompt(
                "Nuevo nombre:",
                cuentaActual
            );

        if (
            !nuevoNombre ||
            nuevoNombre.trim() === ""
        ) {

            return;
        }

        if (
            cuentas[
                nuevoNombre
            ]
        ) {

            alert(
                "Ya existe una cuenta con ese nombre"
            );

            return;
        }

        cuentas[
            nuevoNombre
        ] =
        cuentas[
            cuentaActual
        ];

        delete cuentas[
            cuentaActual
        ];

        cuentaActual =
            nuevoNombre;

        guardarDatos();

        renderizarCuentas();

        renderizarCuenta();
    }
);


// ===============================
// ELIMINAR CUENTA
// ===============================

document
.getElementById(
    "eliminarCuentaBtn"
)
.addEventListener(
    "click",
    () => {

        if (
            !cuentaActual
        ) {

            alert(
                "No hay cuenta seleccionada"
            );

            return;
        }

        const confirmar =
            confirm(
                `¿Eliminar "${cuentaActual}"?`
            );

        if (
            !confirmar
        ) {

            return;
        }

        delete cuentas[
            cuentaActual
        ];

        const restantes =
            Object.keys(
                cuentas
            );

        cuentaActual =
            restantes[0] ||
            null;

        guardarDatos();

        renderizarCuentas();

        renderizarCuenta();

        cerrarSidebar();
    }
);

// ===============================
// ABRIR MODAL DE MOVIMIENTO
// ===============================

document
.querySelectorAll(
    ".accion"
)
.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                if (
                    !cuentaActual
                ) {

                    alert(
                        "Primero crea una cuenta"
                    );

                    return;
                }

                tipoMovimientoActual =
                    boton.dataset.tipo;

                tituloModal.textContent =
                    tipoMovimientoActual;

                montoMovimiento.value = "";

                descripcionMovimiento.value = "";

                fechaMovimiento.value =
                    new Date()
                    .toISOString()
                    .split(
                        "T"
                    )[0];

                modalMovimiento
                .classList
                .remove(
                    "hidden"
                );
            }
        );
    }
);


// ===============================
// CERRAR MODAL
// ===============================

document
.getElementById(
    "cancelarMovimiento"
)
.addEventListener(
    "click",
    () => {

        modalMovimiento
        .classList
        .add(
            "hidden"
        );
    }
);


// ===============================
// GUARDAR MOVIMIENTO
// ===============================

document
.getElementById(
    "guardarMovimiento"
)
.addEventListener(
    "click",
    () => {

        if (
            !cuentaActual
        ) {

            return;
        }

        const monto =
            parseFloat(
                montoMovimiento
                .value
            );

        if (
            isNaN(
                monto
            ) ||
            monto <= 0
        ) {

            alert(
                "Ingrese un monto válido"
            );

            return;
        }

        const descripcion =
            descripcionMovimiento
            .value
            .trim();

        const fecha =
            fechaMovimiento
            .value;


        cuentas[
            cuentaActual
        ].push({

            id:
                Date.now(),

            fecha,

            tipo:
                tipoMovimientoActual,

            descripcion,

            monto
        });


        guardarDatos();

        modalMovimiento
        .classList
        .add(
            "hidden"
        );

        renderizarCuenta();
    }
);


// ===============================
// ELIMINAR MOVIMIENTO
// ===============================

function eliminarMovimiento(
    id
) {

    const confirmar =
        confirm(
            "¿Eliminar movimiento?"
        );

    if (
        !confirmar
    ) {

        return;
    }

    cuentas[
        cuentaActual
    ] =
    cuentas[
        cuentaActual
    ].filter(
        mov =>

        mov.id !== id
    );

    guardarDatos();

    renderizarCuenta();
}


// ===============================
// CALCULAR RESUMEN
// ===============================

function calcularResumen() {

    if (
        !cuentaActual
    ) {

        return {

            balance: 0,

            pendiente: 0,

            objetivo: 0
        };
    }

    let balance = 0;

    let pendiente = 0;


    cuentas[
        cuentaActual
    ].forEach(
        mov => {

            switch (
                mov.tipo
            ) {

                case "Ingreso":

                    balance +=
                        mov.monto;

                    break;


                case "Gasto":

                    balance -=
                        mov.monto;

                    break;


                case "Retiro Temporal":

                    balance -=
                        mov.monto;

                    pendiente +=
                        mov.monto;

                    break;


                case "Reposición del Retiro":

                    balance +=
                        mov.monto;

                    pendiente -=
                        mov.monto;

                    break;
            }
        }
    );


    if (
        pendiente < 0
    ) {

        pendiente = 0;
    }


    return {

        balance,

        pendiente,

        objetivo:
            balance +
            pendiente
    };
}

// ===============================
// RENDERIZAR CUENTA
// ===============================

function renderizarCuenta() {

    if (!cuentaActual) {

        cuentaActualTexto.textContent =
            "Sin cuentas";

        listaMovimientos.innerHTML =

            `
            <div class="movimiento-card">

                <div class="mov-info">

                    <div class="mov-tipo">

                        No hay cuentas

                    </div>

                    <div class="mov-desc">

                        Crea una cuenta para comenzar

                    </div>

                </div>

            </div>
            `;

        balanceActual.textContent =
            "$0.00";

        pendienteReponer.textContent =
            "$0.00";

        balanceObjetivo.textContent =
            "$0.00";

        return;
    }


    cuentaActualTexto.textContent =
        cuentaActual;


    // ===============================
    // RESUMEN
    // ===============================

    const resumen =
        calcularResumen();


    balanceActual.textContent =

        `$${resumen.balance.toFixed(2)}`;


    pendienteReponer.textContent =

        `$${resumen.pendiente.toFixed(2)}`;


    balanceObjetivo.textContent =

        `$${resumen.objetivo.toFixed(2)}`;


    // ===============================
    // MOVIMIENTOS
    // ===============================

    listaMovimientos.innerHTML =
        "";


    const movimientos =

        [...cuentas[cuentaActual]];


    if (
        movimientos.length === 0
    ) {

        listaMovimientos.innerHTML =

            `
            <div class="movimiento-card">

                <div class="mov-info">

                    <div class="mov-tipo">

                        Sin movimientos

                    </div>

                    <div class="mov-desc">

                        Agrega tu primer movimiento

                    </div>

                </div>

            </div>
            `;

        return;
    }


    movimientos
        .sort(

            (a, b) =>

                new Date(b.fecha)

                -

                new Date(a.fecha)

        )
        .forEach(
            mov => {

                let emoji = "";

                let signo = "";

                let clase = "";


                switch (
                    mov.tipo
                ) {

                    case "Ingreso":

                        emoji =
                            "🟢";

                        signo =
                            "+";

                        clase =
                            "ingreso";

                        break;


                    case "Gasto":

                        emoji =
                            "🔴";

                        signo =
                            "-";

                        clase =
                            "gasto";

                        break;


                    case
                    "Retiro Temporal":

                        emoji =
                            "🔵";

                        signo =
                            "-";

                        clase =
                            "retiro";

                        break;


                    case
                    "Reposición del Retiro":

                        emoji =
                            "🟣";

                        signo =
                            "+";

                        clase =
                            "reposicion";

                        break;
                }


                listaMovimientos
                .innerHTML +=

                    `
                    <div class="movimiento-card">

                        <div class="mov-info">

                            <div class="mov-fecha">

                                ${mov.fecha}

                            </div>

                            <div class="mov-tipo">

                                ${emoji}
                                ${mov.tipo}

                            </div>

                            <div class="mov-desc">

                                ${
                                    mov.descripcion ||
                                    "Sin descripción"
                                }

                            </div>

                        </div>

                        <div class="mov-actions">

                            <div class="mov-monto ${clase}">

                                ${signo}$${mov.monto.toFixed(2)}

                            </div>

                            <button

                                onclick="eliminarMovimiento(${mov.id})"

                            >

                                🗑️

                            </button>

                        </div>

                    </div>
                    `;
            }
        );
}

// ===============================
// RESPALDO JSON
// ===============================

function exportarRespaldo() {

    const datos = {

        version: 1,

        fechaExportacion:
            new Date()
            .toISOString(),

        cuentas
    };

    const blob = new Blob(
        [
            JSON.stringify(
                datos,
                null,
                2
            )
        ],
        {
            type:
                "application/json"
        }
    );

    const url =
        URL.createObjectURL(
            blob
        );

    const enlace =
        document.createElement(
            "a"
        );

    enlace.href = url;

    enlace.download =

        `finanzas_backup_${
            new Date()
            .toISOString()
            .split("T")[0]
        }.json`;

    enlace.click();

    URL.revokeObjectURL(
        url
    );
}


// ===============================
// IMPORTAR RESPALDO JSON
// ===============================

function importarRespaldo(
    archivo
) {

    if (
        !archivo
    ) {

        return;
    }

    const lector =
        new FileReader();

    lector.onload =
        function(
            evento
        ) {

        try {

            const datos =
                JSON.parse(
                    evento
                    .target
                    .result
                );

            if (
                !datos.cuentas
            ) {

                throw new Error();
            }

            const confirmar =
                confirm(

                    "Esto reemplazará todos los datos actuales. ¿Continuar?"

                );

            if (
                !confirmar
            ) {

                return;
            }

            cuentas =
                datos.cuentas;

            const nombres =
                Object.keys(
                    cuentas
                );

            cuentaActual =
                nombres[0] ||
                null;

            guardarDatos();

            renderizarCuentas();

            renderizarCuenta();

            alert(
                "Respaldo restaurado correctamente"
            );

        } catch {

            alert(
                "Archivo inválido"
            );
        }
    };

    lector.readAsText(
        archivo
    );
}


// ===============================
// BOTONES DE RESPALDO
// ===============================

// Crear botones si no existen


const exportarBtn =
    document.createElement(
        "button"
    );

exportarBtn.className =
    "menu-btn";

exportarBtn.textContent =
    "💾 Respaldar datos";

exportarBtn.addEventListener(
    "click",
    exportarRespaldo
);


const importarBtn =
    document.createElement(
        "button"
    );

importarBtn.className =
    "menu-btn";

importarBtn.textContent =
    "📂 Restaurar datos";


const inputArchivo =
    document.createElement(
        "input"
    );

inputArchivo.type =
    "file";

inputArchivo.accept =
    ".json";

inputArchivo.style.display =
    "none";

inputArchivo.addEventListener(
    "change",
    e => {

        importarRespaldo(
            e.target.files[0]
        );

        e.target.value = "";
    }
);


importarBtn.addEventListener(
    "click",
    () => {

        inputArchivo.click();
    }
);


sidebar.appendChild(
    exportarBtn
);

sidebar.appendChild(
    importarBtn
);

sidebar.appendChild(
    inputArchivo
);


// ===============================
// CERRAR MODALES AL TOCAR AFUERA
// ===============================

modalMovimiento.addEventListener(
    "click",
    e => {

        if (
            e.target ===
            modalMovimiento
        ) {

            modalMovimiento
            .classList
            .add(
                "hidden"
            );
        }
    }
);


modalCuenta.addEventListener(
    "click",
    e => {

        if (
            e.target ===
            modalCuenta
        ) {

            modalCuenta
            .classList
            .add(
                "hidden"
            );
        }
    }
);


// ===============================
// CERRAR SIDEBAR CON ESC
// ===============================

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key ===
            "Escape"
        ) {

            cerrarSidebar();

            modalMovimiento
            .classList
            .add(
                "hidden"
            );

            modalCuenta
            .classList
            .add(
                "hidden"
            );
        }
    }
);


// ===============================
// MIGRACIONES FUTURAS
// ===============================

// Si más adelante cambias
// localStorage por SQLite,
// solo tendrás que modificar:
//
// guardarDatos()
//
// y
//
// inicializar()


console.log(
    "Finanzas Minimalistas iniciada"
);