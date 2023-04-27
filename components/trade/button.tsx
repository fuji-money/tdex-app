import { TradeButtonStatus } from 'lib/constants'

interface TradeButtonProps {
  loading: boolean
  onClick: () => void
  status: string
}

export default function TradeButton({
  loading,
  onClick,
  status,
}: TradeButtonProps) {
  const btnStyle = 'button is-primary is-medium is-fullwidth is-rounded'
  const disabled = status !== TradeButtonStatus.Trade
  return (
    <button
      className={btnStyle + (loading && ' is-loading')}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {status}
    </button>
  )
}
