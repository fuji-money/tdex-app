import { Coin } from 'lib/types'
import Modal, { ModalIds } from './modal'
import Image from 'next/image'
import { closeModal } from 'lib/utils'
import { supportedAssets } from 'lib/assets'
import { WalletContext } from 'providers/wallet'
import { useContext } from 'react'
import { TradeContext } from 'providers/trade'

interface AssetListModalProps {
  setDestAsset: (arg0: Coin) => void
  setFromAsset: (arg0: Coin) => void
  side: string
}

const AssetListModal = ({
  setDestAsset,
  setFromAsset,
  side,
}: AssetListModalProps) => {
  const { connected, network } = useContext(WalletContext)
  const { markets } = useContext(TradeContext)

  const handleClose = () => {
    closeModal(ModalIds.AssetList)
  }

  const handleClick = (a: Coin) => {
    closeModal(ModalIds.AssetList)
    if (side === 'dest') setDestAsset(a)
    if (side === 'from') setFromAsset(a)
  }

  const assetsOnMarkets = new Set()
  markets.map((market) => {
    assetsOnMarkets.add(market.baseAsset)
    assetsOnMarkets.add(market.quoteAsset)
  })

  const listOfAssets = supportedAssets(network).filter((asset) =>
    assetsOnMarkets.has(asset.assetHash),
  )

  return (
    <Modal id={ModalIds.AssetList}>
      <button
        className="delete is-danger is-large"
        aria-label="close"
        onClick={handleClose}
      />
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <h1 className="title has-text-white">Select an asset</h1>
          {!connected && <p>Connect wallet to see available assets</p>}
          {connected &&
            listOfAssets.map((a, i) => (
              <div
                className="is-flex is-align-items-center my-4 is-clickable"
                onClick={() => handleClick(a)}
                key={i}
              >
                <Image src={a.iconSrc} alt="coin logo" height={32} width={32} />
                <p className="subtitle has-text-white ml-4">{a.name}</p>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  )
}

export default AssetListModal
