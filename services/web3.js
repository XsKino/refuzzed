// import

const connect = async () => {
  const provider = window?.phantom?.solana
  const { solana } = window

  if (!provider?.isPhantom || !solana?.isPhantom) {
    throw new Error("Phantom is not installed")
  }

  let phantom = provider?.isPhantom ? provider : solana

  return await phantom.connect()
}

export default { connect }
