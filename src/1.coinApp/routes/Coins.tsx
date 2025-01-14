import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchCoins } from '../api'
import { Helmet } from 'react-helmet'
import { useSetRecoilState } from 'recoil'
import { isDarkAtom } from '../recoil/theme/atoms'

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 15vh;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    right: 15px;
  }
`

const CoinList = styled.ul``

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

const Loader = styled.p`
  text-align: center;
  margin-top: 35vh;
`
const Thumbnail = styled.img`
  width: 35px;
  height: 35px;
`
const StyledLink = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
`

interface ICoin {
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
  idConverted: boolean
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom((prevState) => !prevState)
  const { isLoading, data: coins } = useQuery<ICoin[]>('allCoins', () => fetchCoins())
  /* coins?.forEach((coin) => {
      if (coin.idConverted) return
      coin.id = `${coin.symbol.toLowerCase()}-${coin.id}`
      coin.idConverted = true
    }) */
  /* const [coins, setCoins] = useState<ICoin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      const json = await response.json()
      setCoins(json.slice(0, 100))
      setLoading(false)
    })()
  }, [])*/

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins?.map((coin) => (
            <Coin key={coin.id}>
              {
                <StyledLink to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}>
                  <Thumbnail src={`https://cryptocurrencyliveprices.com/img/${coin.symbol.toLowerCase()}-${coin.id}.png`} />
                  {coin.name} &rarr;
                </StyledLink>
              }
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins
