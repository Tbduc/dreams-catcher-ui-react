const CurrentTimeService = () => {

    const now = new Date()
    const nowObjectMillis = now.getTime()
    localStorage.setItem("timeShow", nowObjectMillis)
}

export default CurrentTimeService