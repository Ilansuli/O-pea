import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const ChartCmp: React.FC = () => {
    const lineChartRef = useRef(null);


    useEffect(() => {
        const chart = createChart(lineChartRef.current, {
            width: 600,
            height: 300,
        });
        const lineSeries = chart.addLineSeries();

        lineSeries.setData([
            { time: '2019-01-11', value: 80.01 },
            { time: '2019-02-12', value: 96.63 },
            { time: '2019-03-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-05-15', value: 74.43 },
            { time: '2019-06-16', value: 80.01 },
            { time: '2019-07-17', value: 90.05 },
        ]);

        return () => {
            // todo: remove chart on unmount
            chart.remove();
        };
    }, []);

    return <div ref={lineChartRef} ></div>


}

export default ChartCmp;
