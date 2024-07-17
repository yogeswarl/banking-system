"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)


const DoughnutChart = ({accounts}:  DoughnutChartProps) => {
  const accountNames = accounts.map((account: any) => account.name)
  const accountBalances = accounts.map((account: any) => account.currentBalance)
  const data = {
    datasets: [
      {
        label: "Banks",
        data: accountBalances,
        backgroundColor: ["#0747B6",'#2265D8','#2F91FA']
      }
    ],
    labels: accountNames
  }
  return <Doughnut data={data} options={
    {
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      },
    }
  } />
}

export default DoughnutChart