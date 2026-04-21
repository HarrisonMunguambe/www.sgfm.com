<template>
  <div class="sgfm-glass rounded-2xl p-5 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ chart.title }}</h3>
      <span
        class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
      >
        {{ chart.type }}
      </span>
    </div>
    <VueApexCharts
      :type="chart.type"
      :height="240"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ComputedRef } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { InsightChart as InsightChartType } from '@/services/mockData'

const props = defineProps<{ chart: InsightChartType }>()

const theme = inject('theme') as
  | {
      isDarkMode: ComputedRef<boolean>
      toggleTheme: () => void
    }
  | undefined

const isDark = computed(() => theme?.isDarkMode.value ?? false)

const SGFM_PALETTE = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

const chartOptions = computed(() => {
  const labelColor = isDark.value ? '#cbd5e1' : '#475569'
  const gridColor = isDark.value ? 'rgba(148,163,184,0.15)' : 'rgba(148,163,184,0.25)'

  const base = {
    chart: {
      type: props.chart.type,
      toolbar: { show: false },
      fontFamily: 'inherit',
      foreColor: labelColor,
      sparkline: { enabled: false },
      background: 'transparent',
      animations: { enabled: true, speed: 500 },
    },
    colors: SGFM_PALETTE,
    theme: { mode: (isDark.value ? 'dark' : 'light') as 'dark' | 'light' },
    dataLabels: { enabled: false },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 3,
      padding: { left: 8, right: 8 },
    },
    xaxis: {
      categories: props.chart.categories ?? [],
      labels: { style: { colors: labelColor, fontSize: '11px' } },
      axisBorder: { color: gridColor },
      axisTicks: { color: gridColor },
    },
    yaxis: {
      labels: {
        style: { colors: labelColor, fontSize: '11px' },
        formatter: (v: number) => formatValue(v),
      },
    },
    tooltip: {
      theme: isDark.value ? 'dark' : 'light',
      y: { formatter: (v: number) => formatValue(v) },
    },
    legend: {
      labels: { colors: labelColor },
      markers: { size: 6 },
    },
    stroke: { curve: 'smooth', width: props.chart.type === 'area' || props.chart.type === 'line' ? 3 : 0 },
    fill:
      props.chart.type === 'area'
        ? {
            type: 'gradient',
            gradient: { opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] },
          }
        : { opacity: 1 },
    plotOptions:
      props.chart.type === 'bar'
        ? {
            bar: {
              borderRadius: 6,
              columnWidth: '45%',
            },
          }
        : {},
  }

  if (props.chart.type === 'donut') {
    return {
      ...base,
      labels: props.chart.categories ?? [],
      legend: {
        position: 'bottom' as const,
        labels: { colors: labelColor },
      },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              name: { color: labelColor, fontSize: '12px' },
              value: {
                color: isDark.value ? '#f8fafc' : '#0f172a',
                fontSize: '20px',
                fontWeight: 700,
                formatter: (v: string) => `${v}${props.chart.suffix ?? ''}`,
              },
              total: {
                show: true,
                label: 'Total',
                color: labelColor,
                fontSize: '11px',
                formatter: (w: { globals: { seriesTotals: number[] } }) => {
                  const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                  return `${total}${props.chart.suffix ?? ''}`
                },
              },
            },
          },
        },
      },
    }
  }

  return base
})

const chartSeries = computed(() => {
  if (props.chart.type === 'donut') {
    return props.chart.series[0]?.data ?? []
  }
  return props.chart.series
})

function formatValue(v: number) {
  const suffix = props.chart.suffix ?? ''
  if (Math.abs(v) >= 1000) {
    return (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k' + suffix
  }
  return (Number.isInteger(v) ? v.toString() : v.toFixed(1)) + suffix
}
</script>
