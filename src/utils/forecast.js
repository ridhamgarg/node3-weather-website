const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=6ff60bc7ec63c889a918cecd927463f2&query=37.8267,-122.4233'

// request({url:url,json:true},(error,response)=>{
//    // console.log(response.body.current)
//    if(error){
//         console.log('Enable to connect to weather service')
//    }else if(response.body.error){
//        console.log('Unable to find location')

//    }
//    else{
//     console.log(response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature + ' degrees out. It feels like '+response.body.current.feelslike+ ' degrees out.' )
//    }
    
// })

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6ff60bc7ec63c889a918cecd927463f2&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        
        if(error){
            callback('Unable to connect to weather server',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature + ' degrees out. It feels like '+body.current.feelslike+ ' degrees out.')
        
        }
    })
}

module.exports = forecast