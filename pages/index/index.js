Page({
  data: {
    nowTemp: '15°',
    nowWeather: 'cloudy'
  },
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: 'GUANGZHOU'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
      }
    })
  }
})