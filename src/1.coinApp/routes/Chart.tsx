import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api'
import ApexChart from 'react-apexcharts'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../recoil/theme/atoms'

interface IHistoryData {
  priceUsd: string
  time: Date
}
interface IChartProps {
  coinId: string
}
const Chart = ({ coinId }: IChartProps) => {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading: isHistoryLoading, data: historyData } = useQuery<IHistoryData[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId, 'h1') /* {
    refetchInterval: 10000
  } */
  )
  console.log(historyData)
  return (
    <div>
      {isHistoryLoading ? (
        'Loading Chart'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: historyData?.map((history) => parseFloat(history.priceUsd)) ?? []
            }
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light'
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false
              }
            },
            xaxis: {
              labels: {
                show: false
              },
              axisTicks: {
                show: false
              },
              axisBorder: {
                show: false
              },
              type: 'datetime',
              categories: historyData?.map((data) => data.time)
            },
            yaxis: {
              show: false
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`
              }
            },
            grid: {
              show: false
            },
            stroke: {
              curve: 'smooth',
              width: 3
            }
          }}
        />
      )}
    </div>
  )
}

export default Chart
