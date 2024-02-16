import React from "react"
// import logo from "./assets/dfinity.svg"
import soon_gif from "./assets/coming_soon_gif.mp4"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
import * as counter from "../src/declarations/counter"
/*
 * Some examples to get you started
 */
import { Counter } from "./components/Counter"
import { Transfer } from "./components/Transfer"
import { Profile } from "./components/Profile"


function App() {
  return (
    <div className="App">
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <header className="App-header">
        <video src={soon_gif} className="App-logo" autoPlay loop muted></video>
        <p className="slogan">
          Coming Soon
        </p>
        <p className="twitter">by <a href="https://twitter.com/itscryptotheo">@itscryptotheo</a></p>
      </header>

      {/* <p className="examples-title">
        Examples
      </p> */}
      <div className="examples">
        <Counter />
        <Profile />
        <Transfer />
      </div>
    </div>
  )
}

const client = createClient({
  canisters: {
    counter,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
