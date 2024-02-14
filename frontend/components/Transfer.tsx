import React from "react"
import { useWallet, useTransfer } from "@connect2ic/react"

const Transfer = () => {

  const [wallet] = useWallet()
  const [transfer] = useTransfer({
    to: "95453774623922ced700fc4d2dbe5aead6819ba2cee26cdd12df7429e7db0c29",
    amount: Number(0.01),
  })

  const onPurchase = async () => {
    const { height } = await transfer()
  }

  return (
    <div className="example">
      {wallet ? (
        <>
          <p>Buy me beer</p>
          <button className="connect-button" onClick={onPurchase}>Purchase</button>
        </>
      ) : (
        <p className="example-disabled">Connect with a wallet to access</p>
      )}
    </div>
  )
}

export { Transfer }
