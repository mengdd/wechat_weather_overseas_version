const weatherMap = {
  'sunny': 'sunny',
  'cloudy': 'cloudy',
  'overcast': 'overcast',
  'lightrain': 'light rain',
  'heavyrain': 'heavy rain',
  'snow': 'snow'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: '', 
    nowWeatherBackground: '',
    hourlyWeather: []
  },
  onPullDownRefresh(){
    console.log("refresh executed!")
    this.getNow(() => {
      wx.stopPullDownRefresh()
    });
  },
  onLoad() {
    this.getNow();
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: 'shanghai'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
        //set forecast
        let forecast = result.forecast
        let hourlyWeather = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 8; i += 1) {
          hourlyWeather.push({
            time: (i * 3 + nowHour) % 24 + ":00",
            iconPath: '/images/' + forecast[i].weather + '-icon.png',
            temp: forecast[i].temp + '°'
          })
        }
        hourlyWeather[0].time = 'Now'
        this.setData({
          hourlyWeather: hourlyWeather
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})