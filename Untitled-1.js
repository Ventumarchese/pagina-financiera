// Función para mostrar resultados
function mostrarResultado(resultado, selector) {
    document.querySelector(selector).textContent = resultado.toFixed(2);
}

// Función de validación
function validarCampo(idCampo, idError, tipo = 'number') {
    const campo = document.getElementById(idCampo);
    const mensajeError = document.getElementById(idError);
    let valor = campo.value.trim();

    if (tipo === 'number' && (isNaN(valor) || valor === "" || valor <= 0)) {
        campo.classList.add('error');
        mensajeError.textContent = 'Por favor, ingrese un valor numérico válido.';
        mensajeError.style.display = 'block';
        return false;
    } else if (tipo === 'text' && valor === "") {
        campo.classList.add('error');
        mensajeError.textContent = 'Este campo no puede estar vacío.';
        mensajeError.style.display = 'block';
        return false;
    } else {
        campo.classList.remove('error');
        mensajeError.style.display = 'none';
        return true;
    }
}

// Función para sugerir estrategias financieras y de marketing
function sugerirEstrategias() {
    let van = parseFloat(document.getElementById('resultado-van').textContent);
    let tir = parseFloat(document.getElementById('resultado-tir').textContent);

    let sugerencias = "";

    // Estrategias basadas en el VAN y la TIR
    if (van > 0 && tir > 10) {
        sugerencias += `<p><strong>Estrategia a Largo Plazo:</strong> 
        Se recomienda reinvertir en crecimiento y expansión. Considerar una estrategia de marketing digital agresiva, incluyendo campañas en redes sociales y contenido SEO optimizado. Libros recomendados: 'The Lean Startup' de Eric Ries.</p>`;
    } else if (van > 0 && tir <= 10) {
        sugerencias += `<p><strong>Estrategia a Mediano Plazo:</strong> 
        Estabilización y mantenimiento del proyecto. Focalizar esfuerzos en estrategias de marketing tradicional, como relaciones públicas y publicidad impresa. Libros recomendados: 'Contagious: How to Build Word of Mouth' de Jonah Berger.</p>`;
    } else if (van <= 0 && tir < 10) {
        sugerencias += `<p><strong>Estrategia a Corto Plazo:</strong> 
        Reevaluar el proyecto para mejorar el rendimiento. Considera una estrategia de marketing de bajo costo como email marketing o promociones locales. Libros recomendados: 'Guerilla Marketing' de Jay Conrad Levinson.</p>`;
    } else {
        sugerencias += `<p><strong>Estrategia General:</strong> 
        Mantener una política conservadora y revisar las proyecciones financieras antes de realizar cualquier inversión mayor. Prioriza el marketing de nicho y busca colaboración con influencers locales o micro-influencers.</p>`;
    }

    document.getElementById('sugerencias-estrategias').innerHTML = sugerencias;
}

// Función para cálculo de VAN y TIR y sugerir estrategias
function calcularVAN(capital, flujosDeCaja, tasa) {
    let van = -capital;
    for (let i = 0; i < flujosDeCaja.length; i++) {
        van += flujosDeCaja[i] / Math.pow(1 + tasa, i + 1);
    }
    return van;
}

function calcularTIR(capital, flujosDeCaja) {
    let tasa = 0.1;
    let epsilon = 0.0001;
    let iteracionesMaximas = 1000;
    let van;

    for (let iteracion = 0; iteracion < iteracionesMaximas; iteracion++) {
        van = calcularVAN(capital, flujosDeCaja, tasa);
        if (Math.abs(van) < epsilon) return tasa * 100; 
        tasa += epsilon;
    }
    return null;
}

document.getElementById('calcular-van-tir').addEventListener('click', function() {
    if (validarFormularioVanTir()) {
        let capital = parseFloat(document.getElementById('capital-van-tir').value);
        let tasa = parseFloat(document.getElementById('tasa-van-tir').value) / 100;
        let flujosDeCaja = document.getElementById('flujos-de-caja-van-tir').value.split(',').map(Number);

        let van = calcularVAN(capital, flujosDeCaja, tasa);
        let tir = calcularTIR(capital, flujosDeCaja);

        mostrarResultado(van, '#resultado-van');
        mostrarResultado(tir, '#resultado-tir');

        // Sugerir estrategias basadas en los resultados
        sugerirEstrategias();
    }
});

// Función para generar y descargar el informe en PDF
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Resultados del Análisis Financiero", 10, 10);
    doc.text(`VAN: ${document.getElementById('resultado-van').textContent}`, 10, 20);
    doc.text(`TIR: ${document.getElementById('resultado-tir').textContent}`, 10, 30);
    doc.save("informe-financiero.pdf");
}

document.getElementById('descargar-pdf').addEventListener('click', descargarPDF);

// Función para generar y descargar los datos en Excel
function descargarExcel() {
    let datos = [
        ["Resultado", "Valor"],
        ["VAN", document.getElementById('resultado-van').textContent],
        ["TIR", document.getElementById('resultado-tir').textContent]
    ];

    let ws = XLSX.utils.aoa_to_sheet(datos);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Informe");

    XLSX.writeFile(wb, "informe-financiero.xlsx");
}

document.getElementById('descargar-excel').addEventListener('click', descargarExcel);

// Generación de gráficos con Chart.js
function generarGraficoResultados() {
    var ctx = document.getElementById('grafico-resultados').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['VAN', 'TIR'],
            datasets: [{
                label: 'Resultados',
                data: [parseFloat(document.getElementById('resultado-van').textContent), parseFloat(document.getElementById('resultado-tir').textContent)],
                backgroundColor: ['#003366', '#0059b3']
            }]
        }
    });
}

document.getElementById('generar-grafico').addEventListener('click', generarGraficoResultados);

// Seguridad Avanzada: 2FA básico
function generarCodigo2FA() {
    let codigo = Math.floor(100000 + Math.random() * 900000); // 6 dígitos aleatorios
    alert("Tu código de autenticación es: " + codigo);
    return codigo;
}

document.getElementById('activar-2fa').addEventListener('click', generarCodigo2FA);

// Guardar proyectos
function guardarProyecto() {
    let nombreProyecto = prompt("Introduce el nombre del proyecto:");
    let capital = document.getElementById('capital-van-tir').value;
    let tasa = document.getElementById('tasa-van-tir').value;
    let flujosDeCaja = document.getElementById('flujos-de-caja-van-tir').value;

    let proyecto = {
        nombre: nombreProyecto,
        capital: capital,
        tasa: tasa,
        flujosDeCaja: flujosDeCaja
    };

    let proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectosGuardados.push(proyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectosGuardados));

    alert("Proyecto guardado con éxito.");
}

function mostrarProyectosGuardados() {
    let proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    let listaProyectos = document.getElementById('lista-proyectos');
    listaProyectos.innerHTML = "";

    proyectosGuardados.forEach(proyecto => {
        let item = document.createElement('li');
        item.textContent = `${proyecto.nombre} - Capital: ${proyecto.capital}`;
        listaProyectos.appendChild(item);
    });
}

document.getElementById('guardar-proyecto').addEventListener('click', guardarProyecto);
document.getElementById('mostrar-proyectos').addEventListener('click', mostrarProyectosGuardados);
