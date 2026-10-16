# -*- coding: utf-8 -*-
"""
Generador de Gráficos de Apoyo Técnico y Financiero
Proyecto: Solar as a Service (SaaS) - Pereira, Risaralda
Fuente de datos solares: Global Solar Atlas (World Bank / Solargis) API
"""

import matplotlib.pyplot as plt
import numpy as np
import os

# Configuración estética profesional con la paleta de colores del proyecto
# SolarAmber: #D97706, SolarDarkAmber: #B45309, SolarWarmSlate: #1E293B, SolarEarthyTeal: #0D9488
COLOR_AMBER = '#D97706'
COLOR_DARK_AMBER = '#B45309'
COLOR_SLATE = '#1E293B'
COLOR_TEAL = '#0D9488'
COLOR_LIGHT_BG = '#FFFBEB'
COLOR_GRAY = '#64748B'

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#CBD5E1'
plt.rcParams['axes.linewidth'] = 0.8

output_dir = r"c:\Users\Lenovo\Desktop\Juan\Proyecto_Solar_As_A_Service\assets"
os.makedirs(output_dir, exist_ok=True)

# ------------------------------------------------------------------------------
# 1. GRÁFICO: RECURSO SOLAR MENSUAL EN PEREIRA (DATOS EXACTOS GLOBAL SOLAR ATLAS)
# ------------------------------------------------------------------------------
meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
# Datos extraídos directamente de la API Global Solar Atlas para Lat 4.8133, Lon -75.6961
pvout_mensual = [132.3, 118.1, 125.5, 115.4, 116.0, 111.5, 123.1, 127.8, 123.8, 123.0, 118.5, 122.3]
ghi_mensual = [155.9, 142.0, 153.7, 143.5, 146.1, 141.5, 156.1, 160.3, 152.4, 148.1, 140.0, 143.2]

fig, ax1 = plt.subplots(figsize=(10, 5.2), dpi=200)
fig.patch.set_facecolor('#FFFFFF')
ax1.set_facecolor('#F8FAFC')

x = np.arange(len(meses))
width = 0.42

rects1 = ax1.bar(x - width/2, ghi_mensual, width, label='Irradiación Global Horizontal (GHI) [kWh/m²]', color=COLOR_AMBER, alpha=0.9, edgecolor=COLOR_DARK_AMBER)
ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, pvout_mensual, width, label='Producción Fotovoltaica Específica (PVOUT) [kWh/kWp]', color=COLOR_TEAL, alpha=0.9, edgecolor='#0F766E')

ax1.set_ylabel('Irradiación GHI (kWh/m²/mes)', color=COLOR_DARK_AMBER, fontsize=11, fontweight='bold')
ax2.set_ylabel('Generación PVOUT (kWh/kWp/mes)', color=COLOR_TEAL, fontsize=11, fontweight='bold')
ax1.set_xticks(x)
ax1.set_xticklabels(meses, fontsize=10, fontweight='bold', color=COLOR_SLATE)
ax1.set_ylim(100, 185)
ax2.set_ylim(80, 150)
ax1.grid(axis='y', linestyle='--', alpha=0.5, color='#94A3B8')

plt.title('Potencial Solar Fotovoltaico Mensual en Pereira (Risaralda)\nFuente: Global Solar Atlas / Solargis (Lat: 4.8133°, Lon: -75.6961°)', fontsize=12, fontweight='bold', color=COLOR_SLATE, pad=15)

lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper center', bbox_to_anchor=(0.5, -0.14), ncol=2, frameon=True, facecolor=COLOR_LIGHT_BG)

# Cuadro resumen técnico
textstr = 'Totales Anuales Certificados:\n• GHI Anual: 1.782,9 kWh/m²\n• PVOUT Anual: 1.457,4 kWh/kWp\n• Inclinación Óptima: 6° al Sur\n• Temperatura Media: 17,5 °C'
props = dict(boxstyle='round,pad=0.5', facecolor=COLOR_LIGHT_BG, edgecolor=COLOR_DARK_AMBER, alpha=0.95)
ax1.text(0.02, 0.95, textstr, transform=ax1.transAxes, fontsize=8.5, verticalalignment='top', bbox=props, color=COLOR_SLATE)

plt.tight_layout()
fig1_path = os.path.join(output_dir, 'mapa_recurso_solar_pereira.png')
plt.savefig(fig1_path, bbox_inches='tight')
plt.close()
print(f"Grafico 1 guardado en: {fig1_path}")

# ------------------------------------------------------------------------------
# 2. GRÁFICO: CURVA DE GENERACIÓN SOLAR VS DEMANDA COMERCIAL TÍPICA
# ------------------------------------------------------------------------------
horas = np.linspace(0, 24, 288) # resolución de 5 minutos
# Curva de campana solar de 6:00 a 18:30 con pico a las 12:30 de 12 kW
pico_solar = 12.0 # kW para planta de 15 kWp (PR ~ 0.80)
solar_gen = np.maximum(0, pico_solar * np.sin(np.pi * (horas - 6.0) / 12.5) * (horas >= 6.0) * (horas <= 18.5))

# Demanda típica de un comercio con frío (minimercado / panadería) en Pereira
# Carga base de frío de 3.5 kW, sube a 8.5 kW durante horario comercial de 7:30 a 20:00
demanda = 3.5 + 5.0 / (1 + np.exp(-1.5 * (horas - 7.5))) - 5.0 / (1 + np.exp(-1.5 * (horas - 20.0)))
# Pequeña variación estocástica suave
demanda += 0.3 * np.sin(horas * 2)

autoconsumo = np.minimum(solar_gen, demanda)
inyeccion_red = np.maximum(0, solar_gen - demanda)
importacion_red = np.maximum(0, demanda - solar_gen)

fig, ax = plt.subplots(figsize=(10, 5), dpi=200)
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

ax.plot(horas, demanda, label='Demanda Eléctrica del Comercio (kW)', color=COLOR_SLATE, linewidth=2.5)
ax.plot(horas, solar_gen, label='Generación Solar Planta 15 kWp (kW)', color=COLOR_AMBER, linewidth=2.5, linestyle='--')

ax.fill_between(horas, 0, autoconsumo, color=COLOR_TEAL, alpha=0.45, label='Autoconsumo Solar Directo (Ahorro Suscripción SaaS)')
ax.fill_between(horas, autoconsumo, solar_gen, color='#FBBF24', alpha=0.5, label='Excedentes Inyectados Red (CREG 174 Tipo 1 - 1:1)')
ax.fill_between(horas, autoconsumo, demanda, color='#CBD5E1', alpha=0.35, label='Consumo Residual Red EEP (Noche y Madrugada)')

ax.set_xlim(0, 24)
ax.set_ylim(0, 14)
ax.set_xlabel('Hora del Día (Formato 24h)', fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_ylabel('Potencia Instantánea (kW)', fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_xticks(np.arange(0, 25, 2))
ax.grid(True, linestyle='--', alpha=0.5, color='#94A3B8')

plt.title('Acoplamiento Energético: Generación Solar vs. Curva de Carga Comercial (Pereira)\nDemostración de Autoconsumo Diurno y Redundancia con Red EEP', fontsize=12, fontweight='bold', color=COLOR_SLATE, pad=15)
ax.legend(loc='upper right', frameon=True, facecolor=COLOR_LIGHT_BG, fontsize=9)

plt.tight_layout()
fig2_path = os.path.join(output_dir, 'curva_generacion_vs_demanda.png')
plt.savefig(fig2_path, bbox_inches='tight')
plt.close()
print(f"Grafico 2 guardado en: {fig2_path}")

# ------------------------------------------------------------------------------
# 3. GRÁFICO: COMPARATIVA DE FACTURACIÓN Y AHORRO REAL (DUAL BILLING)
# ------------------------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8.5, 5.4), dpi=200)
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

categorias = ['Sin Solar\n(100% EEP)', 'Con Solar SaaS\n(Facturación Dual CREG 174)']
# Factura 100% EEP: Energía 2.200 kWh x $980 = $2.156.000 + Cargos Fijos (Aseo $85k + Alumbrado $45k = $130.000) = $2.286.000 COP
# Factura Con Solar SaaS: Residual EEP (330.4 kWh x $980) $323.831 + Cuota Fija SaaS $1.250.000 + Cargos Fijos $130.000 = $1.703.831 COP
# Ahorro neto en el bolsillo: $582.169 COP/mes (25.47% consolidado de la factura total)

bar_width = 0.45
x_pos = np.arange(len(categorias))

# Componentes Sin Solar
p1 = ax.bar(x_pos[0], 2156, bar_width, label='Energía Activa EEP ($980/kWh)', color='#EF4444', edgecolor='#B91C1C')
p2 = ax.bar(x_pos[0], 130, bar_width, bottom=2156, label='Cargos Municipales (Aseo Atesa + Alumbrado)', color='#64748B', edgecolor='#334155')

# Componentes Con Solar SaaS
p3 = ax.bar(x_pos[1], 1250, bar_width, label='Cuota Fija Suscripción SaaS (15 kWp)', color=COLOR_TEAL, edgecolor='#0F766E')
p4 = ax.bar(x_pos[1], 323.8, bar_width, bottom=1250, label='Energía Neta EEP (CREG 174 compensada)', color='#F59E0B', edgecolor='#D97706')
p5 = ax.bar(x_pos[1], 130, bar_width, bottom=1250+323.8, color='#64748B', edgecolor='#334155')

ax.set_ylabel('Gasto Mensual Consolidado (Miles de COP)', fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_xticks(x_pos)
ax.set_xticklabels(categorias, fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_ylim(0, 2700)
ax.grid(axis='y', linestyle='--', alpha=0.5, color='#94A3B8')

# Etiquetas de valores totales sobre las barras
ax.text(x_pos[0], 2286 + 45, '$2.286.000 COP', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#B91C1C')
ax.text(x_pos[1], 1703.8 + 45, '$1.703.831 COP', ha='center', va='bottom', fontsize=11, fontweight='bold', color=COLOR_TEAL)

# Flecha indicadora de ahorro
ax.annotate('Ahorro Neto Real en Bolsillo:\n-$582.169 COP/mes (25.47% Total)\n(Factura neta EEP baja a solo $324k)',
            xy=(x_pos[1], 1780), xytext=(0.42, 2350),
            arrowprops=dict(facecolor=COLOR_TEAL, shrink=0.08, width=2, headwidth=8),
            bbox=dict(boxstyle='round,pad=0.5', facecolor=COLOR_LIGHT_BG, edgecolor=COLOR_TEAL, lw=1.5),
            fontsize=9.5, fontweight='bold', color=COLOR_TEAL)

plt.title('Comparativa de Facturación Mensual: Antes vs. Con Solar as a Service\nDesglose Transparente con Compensación 1:1 CREG 174 (Comercio Típico Pereira)', fontsize=11, fontweight='bold', color=COLOR_SLATE, pad=15)
ax.legend(loc='lower center', bbox_to_anchor=(0.5, -0.28), ncol=2, frameon=True, facecolor=COLOR_LIGHT_BG, fontsize=8.5)

plt.tight_layout()
fig3_path = os.path.join(output_dir, 'desglose_ahorro_factura_dual.png')
plt.savefig(fig3_path, bbox_inches='tight')
plt.close()
print(f"Grafico 3 guardado en: {fig3_path}")

# ------------------------------------------------------------------------------
# 4. GRÁFICO: FLUJO DE CAJA ACUMULADO Y PERÍODO DE RECUPERACIÓN (PAYBACK)
# ------------------------------------------------------------------------------
anios = np.arange(0, 11)
# Portafolio 20 clientes (300 kWp), Equity inicial = $306.81M COP
flujos_netos = np.array([-306.81, 105.27, 116.64, 128.57, 141.11, 154.27, 132.30, 146.81, 319.97, 16.80, 17.64])
flujo_acumulado = np.cumsum(flujos_netos)

fig, ax = plt.subplots(figsize=(10, 5.4), dpi=200)
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

# Barras de flujo anual
colores_barras = [COLOR_AMBER if f >= 0 else '#EF4444' for f in flujos_netos]
ax.bar(anios, flujos_netos, color=colores_barras, width=0.45, alpha=0.75, label='Flujo Neto Libre Anual (M$ COP)', edgecolor=COLOR_SLATE)

# Línea de flujo acumulado
ax.plot(anios, flujo_acumulado, color=COLOR_TEAL, linewidth=3, marker='o', markersize=7, label='Flujo Acumulado (Payback Equity: 2.66 años / ~32 meses)')
ax.axhline(0, color=COLOR_SLATE, linestyle='-', linewidth=1.2, alpha=0.7)

# Línea vertical en el payback (Año 2.66)
ax.axvline(2.66, color='#DC2626', linestyle=':', linewidth=2, label='Punto de Equilibrio (Payback: Año 2.66 / Mes 32)')

ax.set_xlabel('Año de Operación del Portafolio', fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_ylabel('Millones de Pesos Colombianos (M$ COP)', fontsize=11, fontweight='bold', color=COLOR_SLATE)
ax.set_xticks(anios)
ax.grid(True, linestyle='--', alpha=0.5, color='#94A3B8')

# Anotación en Año 8 (Transferencia de activo)
ax.annotate('Año 8: Fin de Deuda Bancaria ($0)\nFlujo Neto: +$320M COP\nTransferencia 100% al Cliente (Mes 96)',
            xy=(8, flujos_netos[8]), xytext=(5.6, 380),
            arrowprops=dict(facecolor=COLOR_DARK_AMBER, shrink=0.08, width=1.5, headwidth=6),
            bbox=dict(boxstyle='round,pad=0.4', facecolor=COLOR_LIGHT_BG, edgecolor=COLOR_DARK_AMBER),
            fontsize=8.5, color=COLOR_SLATE)

# Cuadro resumen financiero
textstr = 'Métricas Clave del Portafolio:\n• VPN (13.5%): +$380.27 M COP\n• TIR Equity: 39.29%\n• Payback Equity: 2.66 años (~32 meses)\n• DSCR Año 1: 1.53x'
props = dict(boxstyle='round,pad=0.5', facecolor=COLOR_LIGHT_BG, edgecolor=COLOR_TEAL, alpha=0.95)
ax.text(0.02, 0.95, textstr, transform=ax.transAxes, fontsize=9, verticalalignment='top', bbox=props, color=COLOR_SLATE, fontweight='bold')

plt.title('Proyección Financiera Consolidada a 10 Años (Portafolio 20 Clientes / 300 kWp)\nEvolución de Caja Libre, Amortización y Transferencia de Activo en Año 8', fontsize=12, fontweight='bold', color=COLOR_SLATE, pad=15)
ax.legend(loc='lower right', frameon=True, facecolor=COLOR_LIGHT_BG, fontsize=9)

plt.tight_layout()
fig4_path = os.path.join(output_dir, 'flujo_caja_payback_10anios.png')
plt.savefig(fig4_path, bbox_inches='tight')
plt.close()
print(f"Grafico 4 guardado en: {fig4_path}")
print("Todos los gráficos actualizados y regenerados exitosamente.")

