"use client"; // Ensure this is a client component

import Chart from 'chart.js/auto';
// import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import React, { useRef, useEffect } from 'react';

interface PieChartProps {
    name: string; // Add a prop to identify the chart
    data: number[]; // Specify the type for data
    labels: string[]
}

const PieChart: React.FC<PieChartProps> = ({ name, data, labels }) => {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null); // Ref to store the chart instance

    useEffect(() => {
        const ctx = canvas.current;

        // Check if ctx is not null
        if (ctx) {
            ctx.style.cursor = 'pointer';
            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create a new chart instance
            chartRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels, // Update labels as needed
                    datasets: [
                        {
                            label: name,
                            data: data,
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(0,0,0,1)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: 'black', // Change the color of the legend text
                                font: {
                                    weight: 'bold', // Change the font weight
                                    size: 12, // Change the font size
                                },
                            },
                        },
                        tooltip: { // Disable tooltips here
                            enabled: false,
                        },
                        title: {
                            display: false,
                            text: `${name}`, // Use name in title
                        },
                    },
                    cutout: '0%', // This will create a full pie chart
                    onHover: (event) => {
                        const chart = chartRef.current;
                        if (chart) {
                            const canvas = chart.canvas; // Access the canvas directly
                            const nativeEvent = event.native as MouseEvent; // Type assertion
                            const chartElement = chart.getElementsAtEventForMode(nativeEvent, 'nearest', { intersect: true }, false);
                            if (chartElement.length) {
                                canvas.style.cursor = 'pointer'; // Change cursor to pointer when hovering over a slice
                            } else {
                                canvas.style.cursor = 'default'; // Reset cursor when not hovering over a slice
                            }
                        }
                    },
                    
                },
            });

            // Add click event listener to the canvas
            const handleClick = (event: MouseEvent) => {
                const activePoints = chartRef.current?.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
                if (activePoints && activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const value = chartRef.current?.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                    const label = chartRef.current?.data.labels?.[firstPoint.index]; // Use optional chaining here
                    if (label) {
                        console.log(`You clicked on ${label}: ${value}`);
                    }
                }
            };

            ctx.addEventListener('click', handleClick); // Accessing ctx directly

            // Cleanup function to destroy the chart and remove the event listener on component unmount
            return () => {
                chartRef.current?.destroy();
                ctx.removeEventListener('click', handleClick);
            };
        }
    }, [data, name, labels]); // Recreate the chart if data or name changes

    return (
        <div className='h-[250px] w-[250px] mt-5'>
            <canvas ref={canvas}></canvas>
        </div>
    );
}

export default PieChart;