import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    LineChart,
    BarChart,
    PieChart,
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    // GraphChart,
    // GaugeChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    // CandlestickChart,
    // EffectScatterChart,
    // LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
    // GridSimpleComponent,
    GridComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    // CalendarComponent,
    // GraphicComponent,
    ToolboxComponent,
    TooltipComponent,
    // AxisPointerComponent,
    // BrushComponent,
    TitleComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    LegendComponent,
    // LegendScrollComponent,
    // LegendPlainComponent,
    DataZoomComponent,
    // DataZoomInsideComponent,
    // DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
    // DatasetComponent,
    // TitleComponentOption,
    // TooltipComponentOption,
    // LegendComponentOption
} from 'echarts/components';
import {
    CanvasRenderer,
    // CanvasRenderer,
    SVGRenderer,
} from 'echarts/renderers';
import { Box } from '@mui/material';
import { EChartsProps } from '../types/echarts';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { EChartsOption } from "echarts";


const chartTypes = {
    LineChart,
    BarChart,
    PieChart,
}

const langTW = {
    toolbox: {
        brush: {
            title: {
                rect: '矩形選取',
                polygon: '套索選取',
                lineX: '橫向選取',
                lineY: '縱向選取',
                keep: '保持選取',
                clear: '清除選取'
            }
        },
        dataView: {
            title: '資料視圖',
            lang: ['資料視圖', '關閉', '重新整理']
        },
        dataZoom: {
            title: {
                zoom: '區域縮放',
                back: '縮放還原'
            }
        },
        magicType: {
            title: {
                line: '切換為折線圖',
                bar: '切換為長條圖',
                stack: '切換為堆疊',
                tiled: '切換為平鋪'
            }
        },
        restore: {
            title: '還原'
        },
        saveAsImage: {
            title: '儲存為圖片',
            lang: ['右鍵另存為圖片']
        }
    },
    series: {
        typeNames: {
            pie: '圓餅圖',
            bar: '柱狀圖',
            line: '折線圖',
            scatter: '散點圖',
            effectScatter: '漣漪散點圖',
            radar: '雷達圖',
            tree: '樹圖',
            treemap: '矩形樹圖',
            boxplot: '箱型圖',
            candlestick: 'K線圖',
            k: 'K線圖',
            heatmap: '熱力圖',
            map: '地圖',
            parallel: '平行座標圖',
            lines: '線圖',
            graph: '關係圖',
            sankey: '桑基圖',
            funnel: '漏斗圖',
            gauge: '儀表盤',
            pictorialBar: '象形柱圖',
            themeRiver: '主題河流圖',
            sunburst: '旭日圖'
        }
    },
    aria: {
        general: {
            withTitle: '這是一個關於「{title}」的圖表。',
            withoutTitle: '這是一個圖表，'
        },
        series: {
            single: {
                prefix: '',
                withName: '圖表類型是{seriesType}，表示為{seriesName}。',
                withoutName: '圖表類型是{seriesType}。'
            },
            multiple: {
                prefix: '它包含 {seriesCount} 個系列。',
                withName: '第 {seriesId} 個系列是 {seriesType}，表示為 {seriesName}。',
                withoutName: '第 {seriesId} 個系列是 {seriesType}。'
            }
        },
        data: {
            allData: '其數據為——',
            partialData: '其中，前 {displayCnt} 項是——',
            withName: '{name}：{value}',
            withoutName: '{value}'
        }
    }

} as Parameters<typeof echarts.registerLocale>[1];;

const ECharts = ({ chartType, option, events, renderer = "canvas" }: EChartsProps) => {
    const { i18n } = useTranslation();
    const chartRef = useRef<ReactEChartsCore>(null);

    echarts.use(
        [TitleComponent, TooltipComponent, GridComponent, renderer === "svg" ? SVGRenderer : CanvasRenderer, ToolboxComponent, DataZoomComponent, LegendComponent]
    );
    echarts.registerLocale('zh', langTW);
    // 切換預設語系
    if (chartType === "BarLineChart") {
        echarts.use([LineChart, BarChart]);
    } else {
        echarts.use([chartTypes[chartType]]);
    }

    const chartEvents = {
        ...events
    };

    // const onChartReady = () => {
    //     if (!chartRef || !chartRef.current) return;
    //     const echartsInstance = chartRef.current.getEchartsInstance();
    //     setTimeout(() => {
    //         echartsInstance.resize();
    //     }, 100);
    // };

    const optionProps: EChartsOption = {
        ...option,
        grid: {
            left: '0px',
            right: '0px',
            bottom: '20px',
            containLabel: true,
            ...option.grid
        },
        toolbox: {
            right: "10%",
            feature: {
                saveAsImage: {
                    name: `${option.title && !Array.isArray(option.title) ? option.title.text : 'chart'}`,
                    type: 'png',
                    show: true,
                    ...(option.toolbox && !Array.isArray(option.toolbox) && option.toolbox.feature && option.toolbox.feature.saveAsImage
                        ? option.toolbox.feature.saveAsImage
                        : {})
                },
                ...(
                    option.toolbox && !Array.isArray(option.toolbox) && option.toolbox.feature
                        ? option.toolbox.feature
                        : {}
                )
            },
            ...option.toolbox
        },
        legend: {
            padding: [0, 0],
            bottom: '0',
            ...option.legend,
        },
    }

    const containerRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current?.getEchartsInstance();
        if (!chartInstance || !containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width === 0 || height === 0) return;
                chartInstance.resize({
                    width: width,
                    height: height
                });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Box ref={containerRef} sx={{ minWidth: 0, minHeight: 0, height: '100%', width: '100%' }}>
            <ReactEChartsCore
                ref={chartRef}
                echarts={echarts}
                option={optionProps}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                // onChartReady={onChartReady}
                onEvents={chartEvents}
                opts={{ locale: i18n.language === 'zh' ? 'zh' : 'en' }}
                style={{ height: '100%', width: '100%' }}
            />
        </Box>
    )
}

export default ECharts