const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'../public')))
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'ridham'
    })
})

app.get('/about',(req,res)=>{
res.render('about',{
    title:'About me',name:'ridham'
})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"Weather is the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy.[1] Most weather phenomena occur in the lowest level of the atmosphere, the troposphere,[2][3] just below the stratosphere. Weather refers to day-to-day temperature and precipitation activity, whereas climate is the term for the averaging of atmospheric conditions over longer periods of time.[4] When used without qualification, weather is generally understood to mean the weather of Earth. Weather is driven by air pressure, temperature and moisture differences between one place and another. These differences can occur due to the sun's angle at any particular spot, which varies with latitude. The strong temperature contrast between polar and tropical air gives rise to the largest scale atmospheric circulations: the Hadley Cell, the Ferrel Cell, the Polar Cell, and the jet stream. Weather systems in the mid-latitudes, such as extratropical cyclones, are caused by instabilities of the jet stream flow. Because the Earth's axis is tilted relative to its orbital plane, sunlight is incident at different angles at different times of the year. On Earth's surface, temperatures usually range ±40 °C (−40 °F to 100 °F) annually. Over thousands of years, changes in Earth's orbit can affect the amount and distribution of solar energy received by the Earth, thus influencing long-term climate and global climate change.Surface temperature differences in turn cause pressure differences. Higher altitudes are cooler than lower altitudes, as most atmospheric heating is due to contact with the Earth's surface while radiative losses to space are mostly constant. Weather forecasting is the application of science and technology to predict the state of the atmosphere for a future time and a given location. The Earth's weather system is a chaotic system; as a result, small changes to one part of the system can grow to have large effects on the system as a whole. Human attempts to control the weather have occurred throughout history, and there is evidence that human activities such as agriculture and industry have modified weather patterns. Studying how the weather works on other planets has been helpful in understanding how weather works on Earth. A famous landmark in the Solar System, Jupiter's Great Red Spot, is an anticyclonic storm known to have existed for at least 300 years. However, weather is not limited to planetary bodies. A star's corona is constantly being lost to space, creating what is essentially a very thin atmosphere throughout the Solar System. The movement of mass ejected from the Sun is known as the solar wind.",
        name:'ridham'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
            forecast:forecastData,
            location,
            address:req.query.address
            })
        })
        
    })
   

})

app.get('/products',(req,res)=>{

    if(!req.query.search){

       return res.send({
            error:'You must provide search'
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.send('help article not found',
    res.render('404'),{
        title:404,
        name:'Andrew',
        errorMessage:'Article not found'
    }
    )
})

app.get('*',(req,res)=>{
    res.render('404'),{
        title:404,
        name:'Andrew',
        errorMessage:'Page not found'
    }
})

app.listen(3000,()=>{
    console.log('Server on port 3000')
})

