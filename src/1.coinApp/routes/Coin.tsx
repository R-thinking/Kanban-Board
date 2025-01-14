import { Switch, Route, useLocation, useParams, Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Price from './Price'
import Chart from './Chart'
import { useQuery } from 'react-query'
import { fetchCoinInfo } from '../api'

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

const Loader = styled.p`
  text-align: center;
  margin-top: 35vh;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p`
  margin: 20px 0px;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`
const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
    padding: 7px 0;
  }
`

interface RouteParams {
  coinId: string
}

interface RouteState {
  name: string
}

interface IInfoData {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
}

function Coin() {
  const { coinId } = useParams<RouteParams>()
  const { state } = useLocation<RouteState>()
  const chartMatch = useRouteMatch('/:coinId/chart')
  const priceMatch = useRouteMatch('/:coinId/price')

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () => fetchCoinInfo(coinId))
  // const { isLoading: metaLoading, data: metaData } = useQuery(['metadata', coinId], () => fetchCoinMetadata(coinId))

  const loading = infoLoading
  /* const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState<InfoData>()
  const [priceInfo, setPriceInfo] = useState<PriceData>()
  useEffect(() => {
    ;(async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
      setInfo(infoData)
      setPriceInfo(priceData)
      setLoading(false)
    })()
  }, []) */

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Source:</span>
              <span>{`$${Number(infoData?.priceUsd).toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>
          <Description>Description</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{Number(infoData?.supply).toFixed(3)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{Number(infoData?.maxSupply).toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinID/price`}>
              <Price />
            </Route>
            <Route path={`/:coinID/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default Coin
