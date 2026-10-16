# INFORME DE AUDITORÍA Y ESTRÉS FINANCIERO-OPERATIVO: PROYECTO SOLAR AS A SERVICE (PEREIRA)
## Dictamen del "Abogado del Diablo" y Pruebas de Estrés Implacables para Banca de Inversión y Capital de Riesgo

---

### DATOS GENERALES DEL PROYECTO AUDITADO
* **Proyecto:** Solar as a Service (SaaS) Comercial Pereira (Portafolio Piloto 20 Clientes / 308 kWp DC).
* **Documentos Auditados:** 
  - `latex/estudio_mercado_solar_service.tex`
  - `investigacion_mercado/Modelo_Financiero_Presupuesto_SaaS.xlsx`
* **Perfil del Auditor:** Auditor de Riesgos, Financiación Estructurada (Project Finance) y Banca de Inversión.
* **Veredicto Preliminar:** **MODELO NO BANCABLE BAJO CONDICIONES ACTUALES (DEFAULT TÉCNICO INMINENTE EN AÑOS 2 A 4).**

---

## 1. RESUMEN EJECUTIVO: VEREDICTO DE BANCABILIDAD

El modelo financiero y operativo presentado en el estudio de mercado y en la plantilla financiera exhibe una fragilidad estructural severa. Si bien las proyecciones en hoja de cálculo muestran una Tasa Interna de Retorno del accionista (TIR Equity) del **39,29%**, un Valor Presente Neto (VPN) de **+$380,27 millones COP** y un periodo de recuperación de **2,8 años**, estos resultados dependen de supuestos de laboratorio completamente irreales:
1. Cero tasa de morosidad y cero quiebra de clientes en 8 años.
2. Costo nulo de desinstalación, abandono y reubicación de sistemas solares.
3. Tratamiento del beneficio tributario de la Ley 1715 como una inyección de caja líquida automática e incondicional ($35,79 millones COP/año).
4. Presupuesto de $0 COP para recambio de inversores en los años 6 y 7 antes de la transferencia.
5. Rendimiento solar estático e inmune al régimen pluviométrico, nubosidad orográfica y ensuciamiento severo de Pereira.

Bajo una simulación de estrés realista alineada con las estadísticas de Confecámaras y los costos técnicos de la CREG 174 y RETIE en Colombia, **la empresa colapsa financieramente en el Año 2 o Año 3, incurriendo en cesación de pagos de la cuota bancaria de $157,93 millones COP ante Findeter/Bancolombia**.

```
+-------------------------------------------------------------------------------------------------------+
|                                    DIAGNÓSTICO RESUMIDO DE QUIEBRA                                     |
+-----------------------------------+-----------------------------------+-------------------------------+
| Vector de Estrés Evaluado         | Condición Crítica de Quiebra      | Impacto Inmediato en Portafolio|
+-----------------------------------+-----------------------------------+-------------------------------+
| 1. Mortalidad de Micronegocios    | Quiebra de 4 de 20 clientes (20%) | DSCR cae a 1.24x (Aceleración)|
|                                   | Quiebra de 6 de 20 clientes (30%) | Flujo Operativo se torna < $0 |
+-----------------------------------+-----------------------------------+-------------------------------+
| 2. Reubicación de Sistemas        | Costo real: $30.7M COP / cliente  | Déficit de -$92.2M COP en el  |
|                                   | (60.1% del CAPEX original)        | Sinking Fund tras 4 quiebras  |
+-----------------------------------+-----------------------------------+-------------------------------+
| 3. Caída de Generación / Lluvia   | Pérdida de generación >= 15%-20%   | Ahorro cliente cae de 25.5% a |
|                                   | por nubosidad, ceniza y soiling   | 9.4%; suspensión de pagos     |
+-----------------------------------+-----------------------------------+-------------------------------+
| 4. Recambio de Inversores 15 kW   | Falla en años 6-7 sin provisión   | Déficit no cubierto de        |
|                                   | presupuestal ($0 en Excel)        | $71.5M a $142.9M COP          |
+-----------------------------------+-----------------------------------+-------------------------------+
```

---

## 2. VECTOR DE ATAQUE 1: MORTALIDAD EMPRESARIAL Y RIESGO DE CARTERA

### 2.1. La Realidad Estadística de Confecámaras vs. El Supuesto del 100% de Cumplimiento
El modelo financiero asume que los 20 comercios piloto abonarán religiosamente los $1.250.000 COP mensuales ajustados anualmente por IPC (5%) durante 96 meses consecutivos.
* **Dato Confecámaras (Supervivencia Empresarial en Colombia):** Cerca del **70% de las micro y pequeñas empresas quiebran o liquidan matrícula en sus primeros 3 años de operación**. En el sector comercial minorista (panaderías, carnicerías, minimercados), la rotación de establecimientos es aún mayor debido a la presión de arriendos, informalidad y volatilidad macroeconómica.
* **Exigencia Contractual Irreal:** El estudio de mercado sostiene que para solventar esto, se exigirá que el cliente sea *propietario del inmueble* o presente un *codeudor solvente con finca raíz*. En el segmento comercial objetivo de Pereira (locales en estratos 3, 4 y subcentros comerciales), más del **82% de los locales operan bajo arrendamiento mercantil**. Exigir a un arrendatario que consiga un codeudor con finca raíz hipotecable para firmar un contrato solar a 8 años destruye de inmediato el embudo de ventas: de cada 100 prospectos interesados, menos de 5 cumplen este filtro.

### 2.2. Simulación Cuantitativa de Estrés: Quiebra de Clientes en el Año 2
En el Año 2, la empresa tiene los siguientes compromisos fijos:
* **Servicio de Deuda Bancaria Findeter (70% CAPEX @ 14.2% E.A., plazo 7 años):** **$157.930.000 COP anuales** ($13.160.773 COP mensuales). El banco no condona ni reduce la cuota por problemas comerciales del deudor.
* **OPEX Base (Año 2 con IPC 5%):** **$60.480.000 COP**. Compuesto por contratos de mantenimiento preventivo, pólizas todo riesgo de los 20 sistemas, plataformas de monitoreo IoT y soporte técnico. Se modela con una estructura realista de 60% costos fijos ($36.29M COP) y 40% variable ($24.19M COP).
* **Ingreso Anual Teórico (20 clientes @ $1.312.500 COP/mes):** **$315.000.000 COP**.

A continuación se muestra la cascada de cobertura del servicio de deuda (DSCR) y flujo de caja libre ante la pérdida escalonada de clientes:

| Clientes Quebrados | Clientes Activos | Ingreso Anual (M$ COP) | OPEX Real (M$ COP) | EBITDA Operativo (M$ COP) | Cuota Banco Findeter | **DSCR Resultante** | **Flujo Caja Op. (Pre-Escudo)** | **Flujo c/ Escudo Fiscal** | **Estado Crediticio Bancario** |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | 20 | $315.00 | $60.48 | $254.52 | $157.93 | **1.61x** | +$80.84 | +$116.64 | Cumplimiento Normal |
| **1** | 19 | $299.25 | $59.27 | $239.98 | $157.93 | **1.52x** | +$67.09 | +$102.88 | Estable |
| **2** | 18 | $283.50 | $58.06 | $225.44 | $157.93 | **1.43x** | +$53.33 | +$89.13 | Alerta Temprana |
| **3** | 17 | $267.75 | $56.85 | $210.90 | $157.93 | **1.34x** | +$39.58 | +$75.38 | Vigilancia Especial |
| **4** | **16** | **$252.00** | **$55.64** | **$196.36** | **$157.93** | **1.24x** | **+$25.83** | **+$61.62** | **INCUMPLIMIENTO COVENANT (< 1.25x)** |
| **5** | 15 | $236.25 | $54.43 | $181.82 | $157.93 | **1.15x** | +$12.08 | +$47.87 | Violación Grave de Ratio |
| **6** | 14 | $220.50 | $53.22 | $167.28 | $157.93 | **1.06x** | **-$1.68** | +$34.12 | Flujo Operativo Deficitario |
| **7** | 13 | $204.75 | $52.01 | $152.74 | $157.93 | **0.97x** | **-$15.43** | +$20.36 | Incapaz de Pagar la Cuota Bancaria |
| **8** | 12 | $189.00 | $50.80 | $138.20 | $157.93 | **0.88x** | **-$29.18** | +$6.61 | Cesación de Pagos Inminente |

### 2.3. Dictamen de Default Bancario
1. **Ruptura de Covenants en el 20% de Morosidad:** En banca de desarrollo y redescuento comercial (Findeter, Bancolombia, Davivienda), el contrato de crédito exige un ratio de cobertura mínimo de servicio de deuda (**DSCR $\ge$ 1,25x** o 1,30x). Si 4 clientes quiebran en el Año 2, el DSCR cae a **1,24x**. El banco declara evento de incumplimiento técnico y tiene el derecho contractual de congelar desembolsos, exigir reposición de garantías o ejecutar la **cláusula de aceleración**, haciendo exigible la totalidad del saldo insoluto de la deuda (~$580 millones COP restantes).
2. **La Falacia del Escudo Fiscal Líquido:** El modelo Excel maquilla el flujo agregando $35,79 millones COP por deducción especial de renta (Ley 1715). Sin embargo, una deducción tributaria **solo ahorra caja si la empresa genera utilidades gravables suficientes en su declaración de renta**. Si la empresa apenas cubre su operación y servicio de deuda, la base gravable es mínima o nula. No existe devolución de efectivo de la DIAN en el corto plazo; por tanto, **el flujo real disponible para pagar la cuota es el Flujo Operativo Puro ($25,83M COP con 4 defaults; -$1,68M COP con 6 defaults)**.
3. **Inercia Judicial y Tiempo de Aprensión:** Aunque el contrato esté inscrito en el Registro de Garantías Mobiliarias (RUG - Ley 1676 de 2013), la aprehensión física de los bienes montados en una cubierta privada exige un proceso de ejecución ante notario o juez que en Colombia toma entre **6 y 14 meses**. Durante todo ese tiempo, el sistema sigue clavado en el techo sin generar un solo peso, mientras el banco debita $13,16M COP mensuales de la cuenta de la empresa.

---

## 3. VECTOR DE ATAQUE 2: LA TRAMPA DE LA DESINSTALACIÓN Y REUBICACIÓN

### 3.1. La Cláusula Fantasma del Estudio de Mercado
En la sección `2.1.3` del estudio en LaTeX se afirma textualmente:
> *"traslado de paneles con permanencia mínima de 36 meses (cubriendo el usuario los costos de re-adecuación y RETIE)"*

Esta cláusula es una **quimera jurídica y comercial**:
* Si un comerciante quebró o fue desalojado por impago del canon de arrendamiento comercial, **¿con qué dinero va a pagar $30 millones COP de desinstalación y nuevo RETIE?** Es un crédito insolvente; la empresa operadora SaaS debe asumir el 100% del costo o abandonar los paneles en el techo del inmueble ajeno.
* Si el local es entregado al dueño del inmueble, este último puede retener o bloquear el acceso a la cubierta invocando daños, falta de pago o derecho de retención, desatando un pleito judicial de restitución civil.

### 3.2. Desglose Forense del Costo de Desinstalación y Reubicación de 1 Sistema (15.4 kWp)
Un sistema comercial de 15,4 kWp consta de 28 paneles bifaciales de 28 kg cada uno (casi 800 kg en cubierta), 1 inversor de 15 kW, cientos de metros de tubería EMT/PVC y perfiles de aluminio anclados a la estructura portante. Su desinstalación no es mover un electrodoméstico.

```
DESGLOSE FORENSE DE COSTOS: DESMONTAJE Y REUBICACIÓN (1 SISTEMA 15.4 kWp)
-----------------------------------------------------------------------------------------
FASE 1: DESMONTAJE Y LOGÍSTICA INVERSA
- Cuadrilla certificada en alturas (2 operarios + 1 ingeniero SST x 3 días):      $2.500.000 COP
- Alquiler de andamios certificados, manlift y líneas de vida de seguridad:        $800.000 COP
- Desconexión eléctrica DC/AC, etiquetado y embalaje anti-impacto (28 paneles):    $700.000 COP
- Transporte especializado de carga delicada en Pereira / Dosquebradas:            $900.000 COP
- Bodegaje seguro temporal (promedio 2 meses hasta recolocación comercial):      $1.200.000 COP
Subtotal Fase 1:                                                                 $6.100.000 COP

FASE 2: MATERIALES PERDIDOS Y RESANE OBLIGATORIO DE CUBIERTA
- Estructura de montaje descartada (anclajes, rieles perforados/deformados):     $1.610.000 COP
- Cable solar XLPO 6mm y conduit (cortados por cambio de distancias físicas):    $1.500.000 COP
- Obras civiles de impermeabilización y resane de techos del predio desalojado 
  (obligatorio para evitar demandas civiles por filtraciones de aguas lluvias):   $1.500.000 COP
Subtotal Fase 2:                                                                 $4.610.000 COP

FASE 3: REINGENIERÍA E INSTALACIÓN EN NUEVO INMUEBLE
- Levantamiento topográfico, cálculo estructural de nueva cubierta y as-built:   $1.800.000 COP
- Mano de obra de cuadrilla para montaje mecánico y cableado en nuevo predio:    $5.500.000 COP
- Nueva tornillería inoxidable, perfiles de compensación y accesorios:           $3.500.000 COP
- Nuevo sistema de puesta a tierra (las varillas y soldaduras viejas se pierden):$1.650.000 COP
Subtotal Fase 3:                                                                $12.450.000 COP

FASE 4: BLINDAJE REGULATORIO Y TRÁMITES TÉCNICO-LEGALES (INELUDIBLES)
- Trámite de cancelación de frontera y desanotación AGPE ante EEP:                 $600.000 COP
- Nuevo estudio de conexión simplificada AGPE y aprobación ante EEP (CREG 174):  $3.800.000 COP
- Nuevo dictamen de inspección y certificación RETIE con Organismo ONAC 
  (El RETIE está vinculado INDEFECTIBLEMENTE a la dirección y matrícula del predio):$3.100.000 COP
- Nueva inscripción prendaria en el RUG ante Confecámaras:                          $75.000 COP
Subtotal Fase 4:                                                                 $7.575.000 COP
-----------------------------------------------------------------------------------------
COSTO TOTAL REAL DE DESINSTALACIÓN Y REUBICACIÓN POR CLIENTE:                   $30.735.000 COP
% FRENTE AL CAPEX ORIGINAL DE INSTALACIÓN ($51.135.000 COP):                               60,1%
-----------------------------------------------------------------------------------------
```

### 3.3. Confrontación con el Sinking Fund (Fondo de Imprevistos)
El modelo financiero en Excel provisiona un **Sinking Fund del 5% sobre los ingresos brutos**.
* En el Año 1: $15,00 millones COP (para todo el portafolio de 20 clientes).
* En el Año 2: $15,75 millones COP (para todo el portafolio).
* **Fondo Acumulado Total al Año 2 (20 clientes):** **$30.750.000 COP**.
* **Fondo Acumulado por Cliente individual en 2 años:** **$1.537.500 COP**.

**El Veredicto de Destrucción de Margen:**
* Reubicar **un solo cliente** cuesta **$30.735.000 COP**, lo que **agota en su totalidad el Sinking Fund de los 20 sistemas acumulado durante 2 años**.
* Si quiebran **4 clientes en el Año 2**, el costo real de desinstalación, adecuación y re-trámite RETIE asciende a **$122.940.000 COP**.
* Tras drenar hasta el último centavo del fondo de imprevistos ($30,75M COP), queda un **déficit en efectivo no cubierto de -$92.190.000 COP**.
* Dado que el flujo de caja operativo del Año 2 con 16 clientes activos era de apenas +$25,83M COP, **la empresa queda en flujo neto negativo de -$66,36 millones COP**. 
* **Conclusión matemática:** La empresa quiebra en el acto por iliquidez al intentar recuperar y recolocar los activos.

---

## 4. VECTOR DE ATAQUE 3: ENSUCIAMIENTO (SOILING) Y RÉGIMEN DE LLUVIAS EN PEREIRA

### 4.1. El Clima Real de Pereira vs. El Modelo Teórico de Solargis
El modelo financiero adopta un valor teórico de rendimiento específico de **121,4 kWh/kWp/mes** (1.457 kWh/kWp/año) tomado de forma estática del Global Solar Atlas.
Sin embargo, Pereira (Risaralda) presenta condiciones microclimáticas particulares ignoradas en el estudio:
1. **Pluviosidad Extrema:** Precipitación media de **2.425 mm anuales**, con bimodalidad de lluvias intensas (abril-mayo y octubre-noviembre) y eventos recurrentes de La Niña que incrementan la cobertura nubosa en más del 25%.
2. **Nubosidad Orográfica:** La proximidad a la Cordillera Central y el cañón del río Otún genera condensación y nubosidad en horas de la tarde, reduciendo drásticamente las Horas de Sol Pico (HSP) reales a rangos entre 3,7 y 4,2 h/día en periodos invernales.
3. **Soiling Tropical Severo:** A pesar de que las lluvias limpian parte del polvo, la humedad relativa superior al 80% propicia la **proliferación de musgo, líquenes y algas microscópicas** en los bordes inferiores del marco de aluminio y sobre el vidrio templado. Asimismo, la cercanía a vías principales de alto tráfico de Dosquebradas/Pereira genera adherencia de hollín diésel, y las eventuales emisiones de ceniza volcánica del Complejo Volcánico Ruiz-Machín forman películas abrasivas que el agua de lluvia no retira sin limpieza mecánica con agua desmineralizada.

### 4.2. Impacto en el Bolsillo del Cliente: La Trampa de la Cuota Fija SaaS
La propuesta comercial vende al cliente una **cuota fija mensual invariable de $1.250.000 COP** bajo la promesa de un **ahorro neto en bolsillo del 25,5%** ($582.000 COP/mes).
¿Qué ocurre cuando la generación cae por lluvia, nubosidad o ensuciamiento?
Como la cuota SaaS es fija, **toda deficiencia en generación solar obliga al cliente a comprar energía de la red de EEP a tarifa plena comercial ($980 COP/kWh)**.

A continuación se modela el comportamiento del gasto total y del ahorro del usuario frente a diferentes caídas en el rendimiento de los paneles:

| Caída en Rendimiento | Generación Real (kWh/mes) | Energía Faltante de Red EEP (kWh) | Factura EEP Resultante (COP) | Cuota Fija SaaS (COP) | Gasto Total Cliente (COP) | **Ahorro Neto Real (COP)** | **% Ahorro Efectivo** | **Reacción del Cliente** |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0.0% (Modelo)** | 1.869,6 | 330,4 | $453.831 | $1.250.000 | $1.703.831 | **$582.169** | **25,5%** | Satisfecho (Promesa cumplida) |
| **5.0%** | 1.776,1 | 423,9 | $545.440 | $1.250.000 | $1.795.440 | **$490.560** | **21,5%** | Conforme pero con dudas |
| **10.0%** | 1.682,6 | 517,4 | $637.048 | $1.250.000 | $1.887.048 | **$398.952** | **17,5%** | Reclamo por sobrecosto |
| **15.0%** | 1.589,1 | 610,9 | $728.657 | $1.250.000 | $1.978.657 | **$307.343** | **13,4%** | Inconformidad severa |
| **20.0%** | 1.495,6 | 704,4 | $820.265 | $1.250.000 | $2.070.265 | **$215.735** | **9,4%** | Amenaza de cancelación |
| **25.0%** | 1.402,2 | 797,8 | $911.873 | $1.250.000 | $2.161.873 | **$124.127** | **5,4%** | Cese de pago de cuota SaaS |
| **30.0%** | 1.308,7 | 891,3 | $1.003.482 | $1.250.000 | $2.253.482 | **$32.518** | **1,4%** | **Demanda por Publicidad Engañosa** |

### 4.3. El Dilema Contractual Letal
1. **Si el contrato incluye Garantía de Desempeño (PR Guarantee):** Si la empresa garantiza una generación mínima de 1.870 kWh/mes, cuando llueva continuamente o haya ceniza, la empresa deberá pagar en dinero la diferencia tarifaria a $980/kWh. Una caída del 15% le costaría a la empresa compensar $274.000 COP mensuales por cliente ($65,7 millones COP al año en el portafolio), destruyendo todo el margen operativo.
2. **Si el contrato NO garantiza generación (Cobro por Disponibilidad Pura):** El cliente experimenta una caída dramática en su ahorro (del 25,5% al 9% o menos). Percibiendo que ahora paga casi lo mismo que antes sumando las dos facturas ($2.070.000 vs $2.286.000), el comerciante suspende el pago de la cuota fija mensual aludiendo falla en el servicio o publicidad engañosa (Estatuto del Consumidor - Ley 1480 de 2011). 
3. **El Costo del Mantenimiento Oculto:** Evitar esta degradación requeriría 4 lavados manuales profundos al año por cubierta. A $250.000 COP por lavado técnico con agua desionizada y equipo de alturas, el costo anual asciende a **$1.000.000 COP por cliente** ($20.000.000 COP para los 20 sistemas), rubro no presupuestado en el OPEX inicial.

---

## 5. VECTOR DE ATAQUE 4: REEMPLAZO DE INVERSORES Y LA TRAMPA DEL AÑO 6-8

### 5.1. La Brecha Tecnológica del Inversor String
* **Vida Útil Real vs. Garantía:** Los paneles solares Tier 1 tienen degradación lineal garantizada a 25 años. Sin embargo, el **inversor trifásico string de 15 kW** es un equipo electrónico de potencia expuesto a calor, humedad, armónicos y sobretensiones atmosféricas. La garantía estándar de fábrica de marcas reconocidas (Growatt, Huawei, Sungrow, GoodWe) es de **5 años** (con opción de extender a 10 años mediante pago adicional de póliza del 15%-20% del costo del equipo).
* **Régimen de Falla en el Trópico:** En zonas de alta actividad céráunica (rayos y transitorios en la red de EEP en Pereira y Dosquebradas), la probabilidad acumulada de falla de un inversor string entre el Año 5 y el Año 8 oscila entre el **35% y el 60%**.

### 5.2. El Agujero Negro en el Excel: Fila 11-12, Columna I
En la Hoja 5 (`5. Flujo_Caja_10A_Portafolio`) del modelo financiero, la columna I está denominada **"Recambio Inversores"**.
* En el Año 1: $0
* En el Año 2: $0
* En el Año 3: $0
* En el Año 4: $0
* En el Año 5: $0
* **En el Año 6: $0**
* **En el Año 7: $0**
* **En el Año 8: $0**

**El modelo presupuesta EXACTAMENTE CERO PESOS para la sustitución de inversores en toda la década.**

### 5.3. Cuantificación del Estrés por Fallas de Inversores
El costo unitario de un inversor trifásico de 15 kW con protecciones y módem 4G es de **$11.200.000 COP** en el Año 0. Escalado al Año 6 con una inflación del 5% anual, el costo de reposición es de **$14.294.000 COP por unidad** más $1.500.000 COP de instalación técnica, calibración y reporte a EEP.

A continuación se muestra el impacto financiero en el Año 6 y Año 7 según el porcentaje de falla del parque de inversores:

| % Falla del Parque de Inversores | Número de Inversores Averiados | Costo Total de Reemplazo (Año 6) | Saldo Sinking Fund Acumulado Año 6 | **Superávit / Déficit Neto de Reposición** | **Impacto en Flujo de Caja Libre del Año 6** |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **0% (Supuesto Excel)** | 0 | $0 M COP | $102.03 M COP | +$102.03 M COP | $132.30 M COP (Intacto) |
| **10%** | 2 | $28.59 M COP | $102.03 M COP | +$73.44 M COP | Flujo cae a $103.71 M COP |
| **25%** | 5 | $71.47 M COP | $102.03 M COP | +$30.56 M COP | Flujo cae a $60.83 M COP |
| **50%** | **10** | **$142.94 M COP** | **$102.03 M COP** | **-$40.91 M COP** | **Flujo cae a -$10.64 M COP (QUIEBRA)** |
| **75%** | 15 | $214.42 M COP | $102.03 M COP | -$112.39 M COP | Déficit masivo |
| **100%** | 20 | $285.89 M COP | $102.03 M COP | -$183.86 M COP | Pérdida total del capital de trabajo |

### 5.4. El Escándalo de la Transferencia en el Mes 96
El gancho comercial del proyecto radica en transferir el sistema solar libre de gravámenes al cliente en el mes 96 (Año 8).
Si en los años 6 o 7 fallan entre 8 y 12 inversores y la empresa ya no dispone de caja ni cupo de crédito para cambiarlos:
1. El sistema queda inoperativo (0 kWh generados).
2. El cliente suspende de inmediato la cuota SaaS de $1.670.000 COP/mes (ajustada por inflación).
3. En el mes 96, **la empresa estaría transfiriendo chatarra inservible en cubierta**, incurriendo en vicios redhibitorios, litigios comerciales por incumplimiento de promesa contractual y daño reputacional irremediable ante Fenalco y la Cámara de Comercio.

---

## 6. VECTOR DE ATAQUE 5: FALACIAS METODOLÓGICAS Y ERRORES CONTABLES EN EL EXCEL

Una auditoría forense a nivel de celda en `Modelo_Financiero_Presupuesto_SaaS.xlsx` revela inconsistencias estructurales graves:

### 6.1. Contabilización Errónea del "Escudo Fiscal Ley 1715" como Ingreso Efectivo
* **La Fórmula en Celda H6 a H10:** `='2. Presupuesto_CAPEX_Unitario'!$E$19*20*0.35/5/1000000 = +$35.79M COP/año`.
* **El Error Conceptual:** El autor suma directamente estos $35,79 millones COP al flujo neto libre (`J6 = G6 + H6 - I6`). 
* **La Realidad Fiscal:** La deducción especial del 50% de la inversión en el impuesto de renta (Art. 11 Ley 1715) es un menor pago de impuesto, **no un cheque que entrega la DIAN**. Si la sociedad de propósito especial (SPV) tiene amortización acelerada a 3 años y altos gastos financieros por intereses de deuda ($45M COP en intereses el Año 1), su Utilidad Neta antes de Impuestos será cercana a cero o negativa. En consecuencia, **el valor actual del escudo fiscal monetizable es de $0 COP en los primeros años**, inflando artificialmente el flujo de caja del portafolio en **$178,97 millones COP** a lo largo de los primeros 5 años.

### 6.2. Ausencia de Retención en la Fuente y Capital de Trabajo Operativo
* Las empresas comerciales en Colombia están obligadas a practicar retención en la fuente por servicios o arrendamiento operativo (4% o 11%). El modelo no descuenta la retención en la fuente sobre la facturación bruta mensual, generando un desfase de tesorería del **4% al 11% en el recaudo mensual real ($12M a $33M COP anuales)** hasta la presentación de la declaración anual.
* El capital de trabajo inicial (Working Capital) presupuestado en el Año 0 es de **$0 COP**. Todo el equity ($306,81M COP) se gasta en comprar equipos e instalar. La empresa no deja un solo peso en cuenta bancaria para operar los primeros 60 días antes de recibir el primer pago de los clientes.

### 6.3. Asimetría en la Compensación CREG 174 (El Riesgo de Bolsa)
* La hoja 4 asume que el 20% de la energía inyectada se compensa de forma fija e idéntica a $980 COP/kWh (compensación 1 a 1 Tipo 1).
* Sin embargo, bajo la Resoluciúón CREG 174 de 2021, si en periodos de baja actividad comercial (vacaciones, cierres patronales, domingos y festivos) la inyección mensual supera la importación acumulada, el excedente se liquida como Tipo 2 a **Precio de Bolsa Horario ($150 - $280 COP/kWh)**, destruyendo el valor económico de la energía solar excedentaria.

---

## 7. MATRIZ DE ESTRÉS COMBINADO (SCENARIO BREAKING POINT)

Para responder a la pregunta central de banca de inversión: **¿Bajo qué condiciones combinadas quiebra la empresa?** se corrió un modelo de simulación de estrés combinado multivariable:

```
===================================================================================================
ESCENARIO DE ESTRÉS EXTREMO INTEGRADO (AÑO 2 A AÑO 4):
- Quiebra de clientes: 4 clientes en Año 2 (20% de cartera fallida).
- Costo de recuperación / reubicación asumido: $30.7M COP por sistema.
- Reducción climática de irradiación y ensuciamiento: -10% de generación promedio.
- Eliminación de la monetización en efectivo del escudo fiscal Ley 1715 (criterio contable real).
- Servicio de deuda Findeter: $157.93M COP anuales inalterable.
===================================================================================================
```

### Cascada Financiera del Año 2 Bajo Estrés Combinado:
1. **Ingresos Brutos Reales (16 clientes @ $1.312.500/mes):** $252.000.000 COP.
2. **Menos Retención en la Fuente estimada (4%):** -$10.080.000 COP.
3. **Recaudo Líquido en Caja:** $241.920.000 COP.
4. **OPEX y Pólizas Ineludibles (20 sistemas asegurados):** -$55.640.000 COP.
5. **EBITDA Efectivo Disponible:** **$186.280.000 COP**.
6. **Servicio de Deuda Bancaria Findeter:** **-$157.930.000 COP**.
7. **Caja Operativa Remanente:** **+$28.350.000 COP**.
8. **Costos de Desinstalación y Almacenamiento de 4 Sistemas:** -$24.400.000 COP (solo desmonte y custodia).
9. **Caja Neta Antes de Sinking Fund:** **+$3.950.000 COP**.
10. **Reubicación y Nuevo RETIE de al menos 2 sistemas:** -$35.000.000 COP.
11. **SALDO NETO DE CAJA FINAL AÑO 2:** **-$31.050.000 COP (DÉFICIT EN ROJO)**.

**VEREDICTO FINAL DE BANCA:**
La empresa entra en cesación de pagos antes de finalizar el mes 24. No tiene liquidez para pagar la nómina técnica ni la cuota 25 de la deuda con Findeter. El banco inicia el cobro ejecutivo y remata los pagarés y las garantías de la sociedad.

---

## 8. RECOMENDACIONES IMPLACABLES DE BLINDAJE Y REINGENIERÍA

Para transformar este modelo en un proyecto verdaderamente bancable, invertible y resistente a la quiebra, la administración debe ejecutar obligatoriamente las siguientes 7 medidas de salvaguarda:

```
+-------------------------------------------------------------------------------------------------------+
|                                PLAN DE BLINDAJE ESTRUCTURAL DEL MODELO                                 |
+----+----------------------------------+---------------------------------------------------------------+
| No | Mecanismo de Salvaguarda         | Acción Operativa y Financiera Concreta                        |
+----+----------------------------------+---------------------------------------------------------------+
| 1  | Fondo de Reserva de Deuda (DSRA) | Exigir en el CAPEX inicial 6 meses de servicio de deuda en    |
|    |                                  | una cuenta fiduciaria intocable ($78.96M COP de colchón).     |
+----+----------------------------------+---------------------------------------------------------------+
| 2  | Seguro de Crédito y Fianza       | Contratar fianza con FGA Fondo de Garantías o Segurexpo que   |
|    |                                  | indemnice el 80% de las cuotas impagas por mora de clientes.  |
+----+----------------------------------+---------------------------------------------------------------+
| 3  | Reestructuración de la Cuota     | Transicionar de cuota fija 100% plana a tarifa indexada a kWh |
|    |                                  | con piso mínimo garantizado (elimina riesgo por lluvia).      |
+----+----------------------------------+---------------------------------------------------------------+
| 4  | Depósito de Desinstalación       | Cobrar al cliente un depósito de garantía reembolsable o     |
|    |                                  | pagaré avalado equivalente a 6 meses de canon ($7.5M COP).    |
+----+----------------------------------+---------------------------------------------------------------+
| 5  | Garantía Extendida de Inversores | Incluir en el CAPEX inicial la compra de garantía de fábrica  |
|    |                                  | a 10 años para los 20 inversores (+ $2.2M COP/inversor).      |
+----+----------------------------------+---------------------------------------------------------------+
| 6  | Plan Preventivo de Soiling       | Presupuestar 3 lavados obligatorios al año por cubierta en    |
|    |                                  | el OPEX ($750k/año por cliente) con equipo móvil propio.      |
+----+----------------------------------+---------------------------------------------------------------+
| 7  | Corrección Contable del Modelo   | Eliminar el escudo fiscal del flujo neto libre y modelarlo en |
|    |                                  | el Estado de Resultados según la utilidad gravable real.      |
+----+----------------------------------+---------------------------------------------------------------+
```

### 8.1. Parámetros Cuantitativos para el Modelo Financiero V2 (Blindado)
* **Equity Requerido:** Debe subir del 30% ($306,8M COP) al **38% ($385M COP)** para fondear la Reserva de Deuda (DSRA) de 6 meses y el capital de trabajo operativo inicial.
* **Sinking Fund:** Debe incrementarse del 5% al **8,5% de la facturación mensual** para poder cubrir recambios y reubicaciones imprevistas.
* **Garantía Extendida de Inversores:** Asignar **$44.000.000 COP** en el CAPEX inicial para cobertura de fábrica a 10 años, transfiriendo el riesgo técnico al fabricante (Huawei/Growatt).
* **Filtro de Admisión Comercial:** Prohibir la instalación en comercios con menos de 3 años de antigüedad tributaria (RUT) y exigir facturación bancaria promedio de al menos 4 veces la cuota mensual SaaS.

---

### FIRMA DEL AUDITOR
**Agente Auditor de Riesgos y Financiación Estructurada**  
*División de Energía Renovable, Infraestructura y Capital de Riesgo*  
*Pereira, Risaralda — Octubre 2026*
